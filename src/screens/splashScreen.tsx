import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useRestoreSession } from '../hooks/api_hooks/authHooks';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store/store';
import BiometricModal from '../components/biometricModal';
import { useAppDispatch, useAppSelector } from '../hooks/regular_hooks/hooks';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/nativeStackNavigation';
import { setBiometricEnabled } from '../store/authSlice';
import React from 'react';
import { getTheme, getToken } from '../utils/storage/mmKv';

export default function SplashScreen() {
  const restoreQuery = useRestoreSession();
  const { isBiometricEnabled } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!restoreQuery.isFetching && !restoreQuery.isLoading && !getToken()) {
      navigation.replace('Login');
    }
    if (restoreQuery?.isSuccess) {
      dispatch(setBiometricEnabled(true));
      console.log('success')
    }

    if (
      restoreQuery?.isError &&
      restoreQuery?.error &&
      (restoreQuery?.error as any).response === undefined 
    ) {
      console.log('Offline mode — proceeding to app');
      dispatch(setBiometricEnabled(true));

      return;
    }

    if (restoreQuery?.isError) {
      Toast.show({
        type: 'error',
        text1: 'Session Restore Failed',
        text2: 'Please login again.',
      });
      navigation.replace('Login');
    }
  }, [restoreQuery?.isSuccess, restoreQuery?.isError]);

  const hideBiometricModal = () => {
    dispatch(setBiometricEnabled(false));
    navigation.replace('MainTab');
  };
  if (restoreQuery.isLoading || restoreQuery.isFetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View>
      <BiometricModal
        isVisible={isBiometricEnabled}
        onUnlock={hideBiometricModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
