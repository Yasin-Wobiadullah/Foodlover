import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  const secret = Deno.env.get('REVENUECAT_WEBHOOK_SECRET') ?? ''
  const rcApi = Deno.env.get('REVENUECAT_API_SECRET') ?? ''
  const auth = req.headers.get('authorization') ?? ''

  if (!secret || !(auth === secret || auth === `Bearer ${secret}`)) {
    return new Response('Invalid signature', { status: 401 })
  }

  let body: any
  try { body = await req.json() } catch { return new Response('Invalid JSON', { status: 400 }) }

  const app_user_id: string | undefined = body?.event?.app_user_id
  if (!app_user_id) return new Response('Missing app_user_id', { status: 400 })

  // Check existence in auth.users via Admin API
  const { data: adminRes, error: adminErr } = await supabase.auth.admin.getUserById(app_user_id)
  if (adminErr) {
    // Treat 400/404/422 as "not found" (e.g., non-UUID or unknown)
    const s = (adminErr as any).status
    if (s === 400 || s === 404 || s === 422) {
      return new Response('Ignored: unknown user', { status: 200 })
    }
    console.error('Auth admin error:', adminErr)
    return new Response('DB error', { status: 500 })
  }
  if (!adminRes?.user) {
    return new Response('Ignored: unknown user', { status: 200 })
  }

  // Fetch latest snapshot from RevenueCat
  const rc = await fetch(`https://api.revenuecat.com/v1/subscribers/${app_user_id}`, {
    headers: { Authorization: `Bearer ${rcApi}` },
  })
  if (!rc.ok) {
    console.error('RevenueCat API error:', rc.status, await rc.text().catch(() => ''))
    return new Response('Upstream error', { status: 502 })
  }
  const { subscriber } = await rc.json()

  // Upsert into public.revenuecat_customers (FK to auth.users)
  const { error } = await supabase
    .from('revenuecat_customers')
    .upsert({ id: app_user_id, data: subscriber })

  if (error) {
    // FK violation (user row not yet present) -> ignore to avoid retries
    if ((error as any).code === '23503') {
      return new Response('Ignored: unknown user', { status: 200 })
    }
    console.error('DB upsert error:', error)
    return new Response('Error updating profile', { status: 500 })
  }

  return new Response('OK', { status: 200 })
})