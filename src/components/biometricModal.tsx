import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { RootState } from '../store/store';
import { colors } from '../utils/constants/colors';
import { getPassword, setLocalPassword } from '../utils/storage/mmKv';
import { wp, hp } from '../utils/constants/responsive';

interface Props {
  isVisible: boolean;
  onUnlock: () => void;
}

export default function BiometricModal({ isVisible, onUnlock }: Props) {
  const [loading, setLoading] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [password, setPassword] = useState('');

  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const themeColor = colors[theme];

  useEffect(() => {
    if (!isVisible) return;

    setLocalPassword('1234');

    const rnBiometrics = new ReactNativeBiometrics();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setAuthFailed(false);
        setFallback(false);

        const { available, biometryType } = await rnBiometrics.isSensorAvailable();

        if (!available) {
          setFallback(true);
          return;
        }

        const result = await rnBiometrics.simplePrompt({
          promptMessage:
            biometryType === BiometryTypes.FaceID
              ? 'Confirm Face ID'
              : 'Confirm fingerprint or device password',
          cancelButtonText: 'Use Password Instead',
        });

        if (result.success) {
          onUnlock();
        } else {
          setFallback(true);
        }
      } catch (error) {
        setFallback(true);
      } finally {
        setLoading(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const handlePasswordSubmit = () => {
    const savedPassword = getPassword();
    if (password.trim() === savedPassword?.trim()) {
      onUnlock();
      setPassword('');
    } else {
      setAuthFailed(true);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <View style={[styles.fullContainer, { backgroundColor: themeColor.background }]}>
        {loading ? (
          <>
            <ActivityIndicator size="large" color={themeColor.primary} />
            <Text style={[styles.message, { color: themeColor.text }]}>Authenticating...</Text>
          </>
        ) : fallback ? (
          <>
            <Icon name="lock-outline" size={hp(12)} color={themeColor.primary} style={{ marginBottom: hp(2) }} />
            <Text style={[styles.title, { color: themeColor.primary }]}>Enter Password</Text>
            <TextInput
              style={[styles.input, { borderColor: themeColor.primary, color: themeColor.text }]}
              secureTextEntry
              placeholder="Enter your password"
              placeholderTextColor={themeColor.placeholderColor}
              value={password}
              onChangeText={setPassword}
            />
            {authFailed && <Text style={[styles.error, { color: 'red' }]}>Incorrect password, try again.</Text>}

            <TouchableOpacity style={[styles.retryBtn, { backgroundColor: themeColor.primary }]} onPress={handlePasswordSubmit}>
              <Text style={styles.retryText}>Unlock</Text>
            </TouchableOpacity>
          </>
        ) : authFailed ? (
          <>
            <Icon name="fingerprint-off" size={hp(12)} color="#FF3B30" />
            <Text style={[styles.title, { color: '#FF3B30' }]}>Authentication Failed</Text>
            <Text style={[styles.message, { color: themeColor.text }]}>Please try again or use password.</Text>

            <TouchableOpacity style={[styles.retryBtn, { backgroundColor: themeColor.primary }]} onPress={() => setFallback(true)}>
              <Text style={styles.retryText}>Use Password</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Icon name="fingerprint" size={hp(15)} color={themeColor.primary} />
            <Text style={[styles.title, { color: themeColor.primary }]}>Authenticate</Text>
            <Text style={[styles.message, { color: themeColor.text }]}>Use your fingerprint or Face ID to continue.</Text>
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  title: {
    fontSize: wp(6),
    fontWeight: 'bold',
    marginTop: hp(1),
    textAlign: 'center',
  },
  message: {
    marginTop: hp(1),
    fontSize: wp(4),
    textAlign: 'center',
    paddingHorizontal: wp(2),
  },
  retryBtn: {
    marginTop: hp(2),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(10),
    borderRadius: wp(2),
  },
  retryText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.5),
    marginTop: hp(1.5),
  },
  error: {
    marginTop: hp(1),
    fontSize: wp(3.5),
    textAlign: 'center',
  },
});
