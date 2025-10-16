import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store, RootState } from './src/store/store';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import NativeStackNavigation from './src/navigations/nativeStackNavigation';
import { View } from 'react-native';
import { USeLock } from './src/hooks/regular_hooks/lockHooks';
import LockOverlay from './src/components/lockOverlay';
import { useAppSelector } from './src/hooks/regular_hooks/hooks';
import OfflineIndicator from './src/components/offLineIndicator';
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

  return (
    <>
      <NavigationContainer>
        <View
          style={{ flex: 1 }}
          onStartShouldSetResponder={() => {
            registerActivity();
            return false;
          }}
        >
          <NativeStackNavigation />
           {isAuthenticated&&<LockOverlay />}
          <Toast visibilityTime={3000} position='bottom' />
        </View>
      </NavigationContainer>
      <OfflineIndicator />
    </>
  );
}
