# Knowledge Context

> **Note for Future AIs:** This document is your single source of truth for the Foodlover app. Before making any changes, please read this document carefully to understand the project's architecture, best practices, and workflows.

## CI/CD and Deployment

This project uses a CI/CD workflow powered by EAS and GitHub Actions to automate builds, updates, and deployments.

### Branching Strategy

*   **`main`**: This branch represents the code that is currently in production.
*   **`preview`**: This is a staging branch for pre-release testing.
*   **`develop`**: This is the main development branch where new features are merged.

### EAS Build Profiles

The `eas.json` file is configured with three build profiles:

*   **`development`**: Used for creating development clients for local development.
*   **`preview`**: Used for creating builds for internal testing on TestFlight.
*   **`production`**: Used for creating builds for the App Store.

### EAS Secrets

API keys and other secrets are stored as EAS Secrets. The following secrets are used:

*   `EXPO_PUBLIC_REVENUECAT_IOS_KEY`: The RevenueCat public SDK key for the Apple App Store.

### GitHub Actions / EAS Workflows

The CI/CD pipeline is defined in two GitHub Actions workflow files located in `expo-app/.github/workflows`:

*   **`preview-release.yml`**:
    *   **Trigger**: On push to the `preview` branch.
    *   **Action**: This workflow intelligently decides whether to create a new build or an OTA update. It uses `eas fingerprint:generate` and `eas fingerprint:compare` to check for native code changes.
        *   If native code has changed, it runs `eas build --profile preview`.
        *   If only JavaScript has changed, it runs `eas update --branch preview`.
    *   After a successful build or update, it submits the new version to TestFlight using `eas submit --profile preview --latest`.

*   **`production-release.yml`**:
    *   **Trigger**: On push to the `main` branch.
    *   **Action**: This workflow promotes the `preview` build to production.
        *   It runs `eas update:republish --source-channel preview --destination-channel production` to promote the JavaScript update.
        *   It then runs `eas submit --profile production --latest` to submit the same build that was on TestFlight to the App Store.

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

- **Library**: Lineicons
- **Implementation**: The app uses the `@lineiconshq/react-native-lineicons` package. To use an icon, import the `Icon` component from `components/ui/Icon.tsx` and provide the desired icon name as the `name` prop.
- **Example**: `<Icon name="home" size={24} color="black" />`

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
- **Database Triggers**:
    - The database has triggers on the `auth.users` and `auth.sessions` tables to sync user data with RevenueCat. These triggers call the `private.sync_revenuecat_user` function.
- **Types**: The `types/supabase.ts` file contains TypeScript types generated from the database schema. This file should be regenerated whenever the database schema changes using the `supabase gen types --linked > types/supabase.ts` command.
- **Queries**: Use the Supabase JS client to query the database.
- **Security**: For sensitive operations (writes, updates, deletes), use Supabase Edge Functions. For read-only operations, use direct queries with Row-Level Security (RLS).

### RevenueCat

- **API Keys**:
    - RevenueCat uses a single public SDK key per platform (iOS, Android). The distinction between sandbox and production is handled automatically by RevenueCat based on the build type.
    - The iOS public SDK key is stored as an EAS Secret named `EXPO_PUBLIC_REVENUECAT_IOS_KEY`.
- **User Identity**:
    - When a new user opens the app, the RevenueCat SDK automatically assigns them a unique, anonymous user ID.
    - When the user logs in or signs up with Supabase, you must call `Purchases.logIn()` and pass it the Supabase user ID. This will merge the anonymous user's purchase history with the new, authenticated user ID.
- **Webhooks**:
    - RevenueCat webhooks are used to keep your Supabase database in sync with RevenueCat.
    - The `revenuecat-webhook` Edge Function handles the webhooks.
    - The webhook is secured using an `Authorization` header with a shared secret.
- **Expo Go Limitations**:
    - The RevenueCat Customer Center and Paywall do not work in Expo Go. They require a development or production build to function correctly.
