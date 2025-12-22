# DishLover Knowledge Base

This document contains important rules and best practices for developing the DishLover app.

## 1. `SafeAreaView`

Always  from `react-native-safe-area-context`,  WARN  SafeAreaView has been deprecated and will be removed in a future release. Please use 'react-native-safe-area-context' instead. See https://github.com/th3rdwave/react-native-safe-area-context

## 2. `SafeAreaProvider`

The entire application should be wrapped in a `SafeAreaProvider` at the root level. This is typically done in the main `_layout.tsx` file.

## 3. `useSafeAreaInsets`

For complex layouts where you need more control over the safe area, use the `useSafeAreaInsets` hook to get the inset values and apply them manually as padding or margins.
