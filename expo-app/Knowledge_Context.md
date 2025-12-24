# Knowledge Context

This document contains important information about the Foodlover app that future developers (including LLMs) should be aware of.

## Design System

The app uses a custom design system built with Tailwind CSS and Nativewind.

### Color Palette

- **Background**: `#F8F9FA` (Cool Off-White)
- **Accent**: `#556B2F` (Olive Green)
- **Text/Primary**: `#000000` (Pure Black)

### Fonts

- **Headings**: Lora (Bold) - Use the `font-lora` class.
- **Body Text**: Inter (Semibold/Bold) - Use the `font-inter` class with `font-semibold` or `font-bold`.

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

### Supabase

- **Types**: The `types/supabase.ts` file contains TypeScript types generated from the database schema. This file should be regenerated whenever the database schema changes using the `supabase gen types --linked > types/supabase.ts` command.
- **Queries**: Use the Supabase JS client to query the database.
- **Security**: For sensitive operations (writes, updates, deletes), use Supabase Edge Functions. For read-only operations, use direct queries with Row-Level Security (RLS).
