import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store, RootState } from './src/store/store';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import NativeStackNavigation from './src/navigations/nativeStackNavigation';
import { View } from 'react-native';
import { USeLock } from './src/hooks/regular_hooks/lockHooks';
import LockOverlay from './src/components/lockOverlay';
import { useAppSelector } from './src/hooks/regular_hooks/hooks';
import OfflineIndicator from './src/components/offLineIndicator';
import { getToastConfig } from './src/utils/constants/toastConfig';
const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const registerActivity = USeLock();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  return (
    <>
      <View style={{ flex: 1 }} onTouchStart={() => registerActivity()}>
        <NavigationContainer
          onStateChange={() => registerActivity()}
          theme={theme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <NativeStackNavigation />
        </NavigationContainer>
      </View>

      <Toast
        config={getToastConfig(theme)}
        visibilityTime={3000}
        position="bottom"
      />
      {isAuthenticated && <LockOverlay />}
      <OfflineIndicator />
    </>
  );
}
