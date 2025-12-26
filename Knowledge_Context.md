# Knowledge Context

This document contains important information about the Foodlover app that future developers (including LLMs) should be aware of.

## Design System

The app uses a custom design system built with Tailwind CSS and Nativewind.

### Color Palette

- **Background**: `var(--background)`
- **Foreground**: `var(--foreground)`
- **Primary**: `var(--primary)`
- **Secondary**: `var(--secondary)`
- **Accent**: `var(--accent)`

These colors are defined as CSS variables in `global.css` and are used in `tailwind.config.js`.

### Fonts

- **Headings**: Lora (Bold) - Use the `font-lora-bold` class.
- **Body Text**: Inter (Semibold/Bold) - Use the `font-inter-semibold` or `font-inter-bold` class.

### Icons

- **Library**: Material Symbols
- **Implementation**: The app uses the `material-symbols` package with a font-based approach. To use an icon, create a `Text` component with the `material-symbols-outlined` class and the desired icon name as the child.
- **Example**: `<Text className="material-symbols-outlined">settings</Text>`

## Best Practices

### Internationalization (i18n)

- All user-facing text **must** be added to the `locales/en.json` file and accessed using the `useTranslation` hook from `react-i18next`.
- Do not hardcode text in the components.

**How it works:**

1.  **`i18n.ts`**: This file (in `lib/i18n.ts`) initializes `i18next` and sets up the default language and resources.
2.  **`locales/en.json`**: This file contains all the English translations. The keys are nested to create a logical structure.
3.  **`useTranslation` hook**: In your components, you use the `useTranslation` hook to get the `t` function.
4.  **`t` function**: You use the `t` function to access the translations. For example, `t('settings.title')` will get the "Settings" string from the `en.json` file.
5.  **`I18nextProvider`**: The root of the app is wrapped in the `I18nextProvider` to make the `i18n` instance available to all components.

### Componentization

- Create reusable components for any UI element that is used in more than one place.
- Keep components small and focused on a single responsibility.
- Use the `cva` (class-variance-authority) library to create variants of components.
- The `List` component (`components/ui/List.tsx`) should be used to create lists with subsections. It supports a title and a list of items with icons.
- The `ListItem` component (`components/ui/ListItem.tsx`) is a flexible component that can render different types of controls on the right side, such as a switch, a segmented control, or a simple navigation arrow.

### Supabase

- **Project Setup**:
    - To initialize a new Supabase project, run `supabase init` in the `supabase` directory.
    - To link your local project to your remote Supabase project, run `supabase link --project-ref your-project-ref`.
- **Edge Functions**:
    - To create a new Edge Function, run `supabase functions new function-name`.
    - The Deno environment is configured using the `.vscode/settings.json` file in the `supabase` directory and the `deno.json` file in the root of the `supabase` directory.
- **Types**: The `types/supabase.ts` file contains TypeScript types generated from the database schema. This file should be regenerated whenever the database schema changes using the `supabase gen types --linked > types/supabase.ts` command.
- **Queries**: Use the Supabase JS client to query the database.
- **Security**: For sensitive operations (writes, updates, deletes), use Supabase Edge Functions. For read-only operations, use direct queries with Row-Level Security (RLS).

### RevenueCat

- **User Identity**:
    - When a new user opens the app, the RevenueCat SDK automatically assigns them a unique, anonymous user ID.
    - When the user logs in or signs up with Supabase, you must call `Purchases.logIn()` and pass it the Supabase user ID. This will merge the anonymous user's purchase history with the new, authenticated user ID.
- **Webhooks**:
    - RevenueCat webhooks are used to keep your Supabase database in sync with RevenueCat.
    - The `revenuecat-webhook` Edge Function handles the webhooks.
    - The webhook is secured using an `Authorization` header with a shared secret.
- **Expo Go Limitations**:
    - The RevenueCat Customer Center and Paywall do not work in Expo Go. They require a development or production build to function correctly.


DB schema auth schema:

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE auth.audit_log_entries (
  instance_id uuid,
  id uuid NOT NULL,
  payload json,
  created_at timestamp with time zone,
  ip_address character varying NOT NULL DEFAULT ''::character varying,
  CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id)
);
CREATE TABLE auth.flow_state (
  id uuid NOT NULL,
  user_id uuid,
  auth_code text NOT NULL,
  code_challenge_method USER-DEFINED NOT NULL,
  code_challenge text NOT NULL,
  provider_type text NOT NULL,
  provider_access_token text,
  provider_refresh_token text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  authentication_method text NOT NULL,
  auth_code_issued_at timestamp with time zone,
  CONSTRAINT flow_state_pkey PRIMARY KEY (id)
);
CREATE TABLE auth.identities (
  provider_id text NOT NULL,
  user_id uuid NOT NULL,
  identity_data jsonb NOT NULL,
  provider text NOT NULL,
  last_sign_in_at timestamp with time zone,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  email text DEFAULT lower((identity_data ->> 'email'::text)),
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT identities_pkey PRIMARY KEY (id),
  CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE auth.instances (
  id uuid NOT NULL,
  uuid uuid,
  raw_base_config text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT instances_pkey PRIMARY KEY (id)
);
CREATE TABLE auth.mfa_amr_claims (
  session_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  authentication_method text NOT NULL,
  id uuid NOT NULL,
  CONSTRAINT mfa_amr_claims_pkey PRIMARY KEY (id),
  CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id)
);
CREATE TABLE auth.mfa_challenges (
  id uuid NOT NULL,
  factor_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL,
  verified_at timestamp with time zone,
  ip_address inet NOT NULL,
  otp_code text,
  web_authn_session_data jsonb,
  CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id),
  CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id)
);
CREATE TABLE auth.mfa_factors (
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  friendly_name text,
  factor_type USER-DEFINED NOT NULL,
  status USER-DEFINED NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  secret text,
  phone text,
  last_challenged_at timestamp with time zone UNIQUE,
  web_authn_credential jsonb,
  web_authn_aaguid uuid,
  last_webauthn_challenge_data jsonb,
  CONSTRAINT mfa_factors_pkey PRIMARY KEY (id),
  CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE auth.oauth_authorizations (
  id uuid NOT NULL,
  authorization_id text NOT NULL UNIQUE,
  client_id uuid NOT NULL,
  user_id uuid,
  redirect_uri text NOT NULL CHECK (char_length(redirect_uri) <= 2048),
  scope text NOT NULL CHECK (char_length(scope) <= 4096),
  state text CHECK (char_length(state) <= 4096),
  resource text CHECK (char_length(resource) <= 2048),
  code_challenge text CHECK (char_length(code_challenge) <= 128),
  code_challenge_method USER-DEFINED,
  response_type USER-DEFINED NOT NULL DEFAULT 'code'::auth.oauth_response_type,
  status USER-DEFINED NOT NULL DEFAULT 'pending'::auth.oauth_authorization_status,
  authorization_code text UNIQUE CHECK (char_length(authorization_code) <= 255),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + '00:03:00'::interval),
  approved_at timestamp with time zone,
  nonce text CHECK (char_length(nonce) <= 255),
  CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id),
  CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id),
  CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE auth.oauth_client_states (
  id uuid NOT NULL,
  provider_type text NOT NULL,
  code_verifier text,
  created_at timestamp with time zone NOT NULL,
  CONSTRAINT oauth_client_states_pkey PRIMARY KEY (id)
);
CREATE TABLE auth.oauth_clients (
  id uuid NOT NULL,
  client_secret_hash text,
  registration_type USER-DEFINED NOT NULL,
  redirect_uris text NOT NULL,
  grant_types text NOT NULL,
  client_name text CHECK (char_length(client_name) <= 1024),
  client_uri text CHECK (char_length(client_uri) <= 2048),
  logo_uri text CHECK (char_length(logo_uri) <= 2048),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  deleted_at timestamp with time zone,
  client_type USER-DEFINED NOT NULL DEFAULT 'confidential'::auth.oauth_client_type,
  CONSTRAINT oauth_clients_pkey PRIMARY KEY (id)
);
CREATE TABLE auth.oauth_consents (
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  client_id uuid NOT NULL,
  scopes text NOT NULL CHECK (char_length(scopes) <= 2048),
  granted_at timestamp with time zone NOT NULL DEFAULT now(),
  revoked_at timestamp with time zone,
  CONSTRAINT oauth_consents_pkey PRIMARY KEY (id),
  CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id)
);
CREATE TABLE auth.one_time_tokens (
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  token_type USER-DEFINED NOT NULL,
  token_hash text NOT NULL CHECK (char_length(token_hash) > 0),
  relates_to text NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id),
  CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE auth.refresh_tokens (
  instance_id uuid,
  id bigint NOT NULL DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass),
  token character varying UNIQUE,
  user_id character varying,
  revoked boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  parent character varying,
  session_id uuid,
  CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id),
  CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id)
);
CREATE TABLE auth.saml_providers (
  id uuid NOT NULL,
  sso_provider_id uuid NOT NULL,
  entity_id text NOT NULL UNIQUE CHECK (char_length(entity_id) > 0),
  metadata_xml text NOT NULL CHECK (char_length(metadata_xml) > 0),
  metadata_url text CHECK (metadata_url = NULL::text OR char_length(metadata_url) > 0),
  attribute_mapping jsonb,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  name_id_format text,
  CONSTRAINT saml_providers_pkey PRIMARY KEY (id),
  CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id)
);
CREATE TABLE auth.saml_relay_states (
  id uuid NOT NULL,
  sso_provider_id uuid NOT NULL,
  request_id text NOT NULL CHECK (char_length(request_id) > 0),
  for_email text,
  redirect_to text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  flow_state_id uuid,
  CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id),
  CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id),
  CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id)
);
CREATE TABLE auth.schema_migrations (
  version character varying NOT NULL,
  CONSTRAINT schema_migrations_pkey PRIMARY KEY (version)
);
CREATE TABLE auth.sessions (
  id uuid NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  factor_id uuid,
  aal USER-DEFINED,
  not_after timestamp with time zone,
  refreshed_at timestamp without time zone,
  user_agent text,
  ip inet,
  tag text,
  oauth_client_id uuid,
  refresh_token_hmac_key text,
  refresh_token_counter bigint,
  scopes text CHECK (char_length(scopes) <= 4096),
  CONSTRAINT sessions_pkey PRIMARY KEY (id),
  CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id)
);
CREATE TABLE auth.sso_domains (
  id uuid NOT NULL,
  sso_provider_id uuid NOT NULL,
  domain text NOT NULL CHECK (char_length(domain) > 0),
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT sso_domains_pkey PRIMARY KEY (id),
  CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id)
);
CREATE TABLE auth.sso_providers (
  id uuid NOT NULL,
  resource_id text CHECK (resource_id = NULL::text OR char_length(resource_id) > 0),
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  disabled boolean,
  CONSTRAINT sso_providers_pkey PRIMARY KEY (id)
);
CREATE TABLE auth.users (
  instance_id uuid,
  id uuid NOT NULL,
  aud character varying,
  role character varying,
  email character varying,
  encrypted_password character varying,
  email_confirmed_at timestamp with time zone,
  invited_at timestamp with time zone,
  confirmation_token character varying,
  confirmation_sent_at timestamp with time zone,
  recovery_token character varying,
  recovery_sent_at timestamp with time zone,
  email_change_token_new character varying,
  email_change character varying,
  email_change_sent_at timestamp with time zone,
  last_sign_in_at timestamp with time zone,
  raw_app_meta_data jsonb,
  raw_user_meta_data jsonb,
  is_super_admin boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  phone text DEFAULT NULL::character varying UNIQUE,
  phone_confirmed_at timestamp with time zone,
  phone_change text DEFAULT ''::character varying,
  phone_change_token character varying DEFAULT ''::character varying,
  phone_change_sent_at timestamp with time zone,
  confirmed_at timestamp with time zone DEFAULT LEAST(email_confirmed_at, phone_confirmed_at),
  email_change_token_current character varying DEFAULT ''::character varying,
  email_change_confirm_status smallint DEFAULT 0 CHECK (email_change_confirm_status >= 0 AND email_change_confirm_status <= 2),
  banned_until timestamp with time zone,
  reauthentication_token character varying DEFAULT ''::character varying,
  reauthentication_sent_at timestamp with time zone,
  is_sso_user boolean NOT NULL DEFAULT false,
  deleted_at timestamp with time zone,
  is_anonymous boolean NOT NULL DEFAULT false,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);


public db schema:

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  icon_name text,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.category_translations (
  category_id uuid NOT NULL,
  language_code text NOT NULL,
  name text NOT NULL,
  CONSTRAINT category_translations_pkey PRIMARY KEY (category_id, language_code),
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.categories(id),
  CONSTRAINT fk_language FOREIGN KEY (language_code) REFERENCES public.languages(code)
);
CREATE TABLE public.collection_recipes (
  collection_id uuid NOT NULL,
  recipe_id uuid NOT NULL,
  CONSTRAINT collection_recipes_pkey PRIMARY KEY (collection_id, recipe_id),
  CONSTRAINT collection_recipes_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES public.collections(id),
  CONSTRAINT collection_recipes_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id)
);
CREATE TABLE public.collections (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT collections_pkey PRIMARY KEY (id),
  CONSTRAINT collections_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.cuisine_translations (
  cuisine_id uuid NOT NULL,
  language_code text NOT NULL,
  name text NOT NULL,
  CONSTRAINT fk_cuisine FOREIGN KEY (cuisine_id) REFERENCES public.cuisines(id),
  CONSTRAINT fk_language FOREIGN KEY (language_code) REFERENCES public.languages(code)
);
CREATE TABLE public.cuisines (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  CONSTRAINT cuisines_pkey PRIMARY KEY (id)
);
CREATE TABLE public.diet_translations (
  diet_id uuid NOT NULL,
  language_code text NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  CONSTRAINT diet_translations_pkey PRIMARY KEY (diet_id, language_code),
  CONSTRAINT diet_translations_diet_id_fkey FOREIGN KEY (diet_id) REFERENCES public.diets(id),
  CONSTRAINT diet_translations_language_code_fkey FOREIGN KEY (language_code) REFERENCES public.languages(code)
);
CREATE TABLE public.diets (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  icon_identifier text,
  color_hex text,
  CONSTRAINT diets_pkey PRIMARY KEY (id)
);
CREATE TABLE public.difficulties (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT difficulties_pkey PRIMARY KEY (id)
);
CREATE TABLE public.difficulty_translations (
  difficulty_id uuid NOT NULL,
  language_code text NOT NULL,
  name text NOT NULL,
  CONSTRAINT difficulty_translations_pkey PRIMARY KEY (difficulty_id, language_code),
  CONSTRAINT difficulty_translations_difficulty_id_fkey FOREIGN KEY (difficulty_id) REFERENCES public.difficulties(id),
  CONSTRAINT difficulty_translations_language_code_fkey FOREIGN KEY (language_code) REFERENCES public.languages(code)
);
CREATE TABLE public.ingredient_translations (
  ingredient_id uuid NOT NULL,
  language_code text NOT NULL,
  name text NOT NULL,
  CONSTRAINT ingredient_translations_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id),
  CONSTRAINT ingredient_translations_language_code_fkey FOREIGN KEY (language_code) REFERENCES public.languages(code)
);
CREATE TABLE public.ingredient_unit_conversions (
  ingredient_id uuid NOT NULL,
  unit_id uuid NOT NULL,
  grams_per_unit numeric NOT NULL,
  CONSTRAINT ingredient_unit_conversions_pkey PRIMARY KEY (ingredient_id, unit_id),
  CONSTRAINT ingredient_unit_conversions_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id),
  CONSTRAINT ingredient_unit_conversions_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.units(id)
);
CREATE TABLE public.ingredients (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  image_url text,
  availability_category text CHECK (availability_category = ANY (ARRAY['Pantry Staple'::text, 'Common'::text, 'Widely Available'::text, 'Specialty'::text])),
  calories_per_100 numeric,
  protein_per_100 numeric,
  carbs_per_100 numeric,
  fat_per_100 numeric,
  created_at timestamp with time zone DEFAULT now(),
  preferred_display_unit_imperial_id uuid,
  preferred_display_unit_metric_id uuid,
  query_name text,
  CONSTRAINT ingredients_pkey PRIMARY KEY (id),
  CONSTRAINT fk_display_metric FOREIGN KEY (preferred_display_unit_metric_id) REFERENCES public.units(id),
  CONSTRAINT fk_display_imperial FOREIGN KEY (preferred_display_unit_imperial_id) REFERENCES public.units(id)
);
CREATE TABLE public.instruction_ingredients (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  instruction_id uuid,
  ingredient_id uuid,
  amount_g numeric NOT NULL,
  CONSTRAINT instruction_ingredients_pkey PRIMARY KEY (id),
  CONSTRAINT instruction_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id),
  CONSTRAINT instruction_ingredients_instruction_id_fkey FOREIGN KEY (instruction_id) REFERENCES public.instructions(id)
);
CREATE TABLE public.instruction_translations (
  instruction_id uuid NOT NULL,
  language_code text NOT NULL,
  description text NOT NULL,
  duration_label text,
  CONSTRAINT instruction_translations_pkey PRIMARY KEY (instruction_id, language_code),
  CONSTRAINT instruction_translations_language_code_fkey FOREIGN KEY (language_code) REFERENCES public.languages(code),
  CONSTRAINT instruction_translations_instruction_id_fkey FOREIGN KEY (instruction_id) REFERENCES public.instructions(id)
);
CREATE TABLE public.instructions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  recipe_id uuid,
  step_number integer NOT NULL,
  image_url text,
  duration_minutes integer,
  temperature_celsius integer,
  temperature_fahrenheit integer,
  CONSTRAINT instructions_pkey PRIMARY KEY (id),
  CONSTRAINT instructions_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id)
);
CREATE TABLE public.languages (
  code text NOT NULL,
  name text NOT NULL,
  native_name text NOT NULL,
  CONSTRAINT languages_pkey PRIMARY KEY (code)
);
CREATE TABLE public.likes (
  recipe_id uuid NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT likes_pkey PRIMARY KEY (recipe_id, user_id),
  CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT likes_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id)
);
CREATE TABLE public.occasion_translations (
  occasion_id uuid NOT NULL,
  language_code text NOT NULL,
  name text NOT NULL,
  CONSTRAINT occasion_translations_pkey PRIMARY KEY (occasion_id, language_code),
  CONSTRAINT fk_occasion FOREIGN KEY (occasion_id) REFERENCES public.occasions(id),
  CONSTRAINT fk_language FOREIGN KEY (language_code) REFERENCES public.languages(code)
);
CREATE TABLE public.occasions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  CONSTRAINT occasions_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profile_disliked_ingredients (
  profile_id uuid NOT NULL,
  ingredient_id uuid NOT NULL,
  CONSTRAINT profile_disliked_ingredients_pkey PRIMARY KEY (profile_id, ingredient_id),
  CONSTRAINT profile_disliked_ingredients_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id),
  CONSTRAINT profile_disliked_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text,
  created_at timestamp with time zone DEFAULT now(),
  avatar_path text,
  role text,
  preferred_temperature USER-DEFINED DEFAULT 'celsius'::preferred_temperature_unit,
  preferred_units USER-DEFINED DEFAULT 'metric'::preferred_measurement_unit,
  diet_id uuid,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id),
  CONSTRAINT profiles_diet_id_fkey FOREIGN KEY (diet_id) REFERENCES public.diets(id)
);
CREATE TABLE public.recipe_categories (
  recipe_id uuid NOT NULL,
  category_id uuid NOT NULL,
  CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES public.recipes(id),
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.recipe_cuisines (
  recipe_id uuid NOT NULL,
  cuisine_id uuid NOT NULL,
  CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES public.recipes(id),
  CONSTRAINT fk_cuisine FOREIGN KEY (cuisine_id) REFERENCES public.cuisines(id)
);
CREATE TABLE public.recipe_diets (
  recipe_id uuid NOT NULL,
  diet_id uuid NOT NULL,
  CONSTRAINT recipe_diets_diet_id_fkey FOREIGN KEY (diet_id) REFERENCES public.diets(id),
  CONSTRAINT recipe_diets_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id)
);
CREATE TABLE public.recipe_ingredients (
  recipe_id uuid NOT NULL,
  ingredient_id uuid NOT NULL,
  base_amount_g numeric,
  CONSTRAINT recipe_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id),
  CONSTRAINT recipe_ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id)
);
CREATE TABLE public.recipe_occasions (
  recipe_id uuid NOT NULL,
  occasion_id uuid NOT NULL,
  CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES public.recipes(id),
  CONSTRAINT fk_occasion FOREIGN KEY (occasion_id) REFERENCES public.occasions(id)
);
CREATE TABLE public.recipe_tags (
  recipe_id uuid NOT NULL,
  tag_id uuid NOT NULL,
  CONSTRAINT recipe_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id),
  CONSTRAINT recipe_tags_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id)
);
CREATE TABLE public.recipe_times (
  recipe_id uuid NOT NULL,
  minutes integer NOT NULL,
  time_type_id uuid NOT NULL,
  CONSTRAINT recipe_times_pkey PRIMARY KEY (recipe_id, time_type_id),
  CONSTRAINT recipe_times_time_type_id_fkey FOREIGN KEY (time_type_id) REFERENCES public.time_types(id),
  CONSTRAINT recipe_times_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id)
);
CREATE TABLE public.recipe_translations (
  recipe_id uuid NOT NULL,
  language_code text NOT NULL,
  title text NOT NULL,
  description text,
  notes text,
  CONSTRAINT recipe_translations_pkey PRIMARY KEY (recipe_id, language_code),
  CONSTRAINT recipe_translations_language_code_fkey FOREIGN KEY (language_code) REFERENCES public.languages(code),
  CONSTRAINT recipe_translations_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id)
);
CREATE TABLE public.recipe_utensils (
  recipe_id uuid NOT NULL,
  utensil_id uuid NOT NULL,
  CONSTRAINT recipe_utensils_pkey PRIMARY KEY (recipe_id, utensil_id),
  CONSTRAINT recipe_utensils_utensil_id_fkey FOREIGN KEY (utensil_id) REFERENCES public.utensils(id),
  CONSTRAINT recipe_utensils_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id)
);
CREATE TABLE public.recipes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  image_url text,
  video_url text,
  servings integer,
  author_id uuid,
  status text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text, 'private'::text])),
  rating_average numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  slug text,
  calories_per_serving numeric,
  protein_per_serving numeric,
  carbs_per_serving numeric,
  fat_per_serving numeric,
  scalable boolean,
  difficulty_id uuid,
  CONSTRAINT recipes_pkey PRIMARY KEY (id),
  CONSTRAINT recipes_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.profiles(id),
  CONSTRAINT recipes_difficulty_id_fkey FOREIGN KEY (difficulty_id) REFERENCES public.difficulties(id)
);
CREATE TABLE public.revenuecat_customers (
  id uuid NOT NULL,
  data jsonb,
  CONSTRAINT revenuecat_customers_pkey PRIMARY KEY (id),
  CONSTRAINT revenuecat_customers_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  recipe_id uuid,
  user_id uuid,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT reviews_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id)
);
CREATE TABLE public.saves (
  recipe_id uuid NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT saves_pkey PRIMARY KEY (recipe_id, user_id),
  CONSTRAINT saves_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT saves_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id)
);
CREATE TABLE public.tag_translations (
  tag_id uuid NOT NULL,
  language_code text NOT NULL,
  name text NOT NULL,
  CONSTRAINT tag_translations_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id),
  CONSTRAINT tag_translations_language_code_fkey FOREIGN KEY (language_code) REFERENCES public.languages(code)
);
CREATE TABLE public.tags (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT tags_pkey PRIMARY KEY (id)
);
CREATE TABLE public.time_type_translations (
  time_type_id uuid NOT NULL,
  language_code text NOT NULL,
  name text NOT NULL,
  CONSTRAINT time_type_translations_pkey PRIMARY KEY (time_type_id, language_code),
  CONSTRAINT time_type_translations_language_code_fkey FOREIGN KEY (language_code) REFERENCES public.languages(code),
  CONSTRAINT time_type_translations_time_type_id_fkey FOREIGN KEY (time_type_id) REFERENCES public.time_types(id)
);
CREATE TABLE public.time_types (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT time_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.unit_translations (
  unit_id uuid NOT NULL,
  language_code text NOT NULL,
  name_singular text NOT NULL,
  name_plural text NOT NULL,
  abbreviation text,
  CONSTRAINT unit_translations_pkey PRIMARY KEY (unit_id, language_code),
  CONSTRAINT unit_translations_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.units(id),
  CONSTRAINT unit_translations_language_code_fkey FOREIGN KEY (language_code) REFERENCES public.languages(code)
);
CREATE TABLE public.units (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT units_pkey PRIMARY KEY (id)
);
CREATE TABLE public.utensil_translations (
  utensil_id uuid NOT NULL,
  language_code text NOT NULL,
  name text NOT NULL,
  CONSTRAINT utensil_translations_pkey PRIMARY KEY (utensil_id, language_code),
  CONSTRAINT utensil_translations_utensil_id_fkey FOREIGN KEY (utensil_id) REFERENCES public.utensils(id),
  CONSTRAINT utensil_translations_language_code_fkey FOREIGN KEY (language_code) REFERENCES public.languages(code)
);
CREATE TABLE public.utensils (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  image_url text,
  CONSTRAINT utensils_pkey PRIMARY KEY (id)
);

