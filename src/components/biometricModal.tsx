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
    const rnBiometrics = new ReactNativeBiometrics();
    setLocalPassword('1234')

    const authenticate = async () => {
      try {
        setLoading(true);
        setAuthFailed(false);
        setFallback(false);

        const { available, biometryType } =
          await rnBiometrics.isSensorAvailable();

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
        console.log('Biometric auth failed:', error);
        setFallback(true);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      authenticate();
    }
  }, [isVisible]);

  const handlePasswordSubmit = () => {

       const savedPassword = getPassword();
    if (password.trim() === savedPassword?.trim()) {
      onUnlock();
      setPassword('')
    } else {
      setAuthFailed(true);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <View
        style={[
          styles.fullContainer,
          { backgroundColor: themeColor.background },
        ]}
      >
        {loading ? (
          <>
            <ActivityIndicator size="large" color={themeColor.primary} />
            <Text style={[styles.message, { color: themeColor.text }]}>
              Authenticating...
            </Text>
          </>
        ) : fallback ? (
          <>
            <Icon
              name="lock-outline"
              size={80}
              color={themeColor.primary}
              style={{ marginBottom: 10 }}
            />
            <Text style={[styles.title, { color: themeColor.primary }]}>
              Enter Password
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: themeColor.primary,
                  color: themeColor.text,
                },
              ]}
              secureTextEntry
              placeholder="Enter your password"
              placeholderTextColor={themeColor.placeholderColor}
              value={password}
              onChangeText={setPassword}
            />
            {authFailed && (
              <Text style={[styles.error, { color: 'red' }]}>
                Incorrect password, try again.
              </Text>
            )}

            <TouchableOpacity
              style={[
                styles.retryBtn,
                { backgroundColor: themeColor.primary },
              ]}
              onPress={handlePasswordSubmit}
            >
              <Text style={styles.retryText}>Unlock</Text>
            </TouchableOpacity>
          </>
        ) : authFailed ? (
          <>
            <Icon name="fingerprint-off" size={80} color="#FF3B30" />
            <Text style={[styles.title, { color: '#FF3B30' }]}>
              Authentication Failed
            </Text>
            <Text style={[styles.message, { color: themeColor.text }]}>
              Please try again or use password.
            </Text>

            <TouchableOpacity
              style={[
                styles.retryBtn,
                { backgroundColor: themeColor.primary },
              ]}
              onPress={() => setFallback(true)}
            >
              <Text style={styles.retryText}>Use Password</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Icon name="fingerprint" size={100} color={themeColor.primary} />
            <Text style={[styles.title, { color: themeColor.primary }]}>
              Authenticate
            </Text>
            <Text style={[styles.message, { color: themeColor.text }]}>
              Use your fingerprint or Face ID to continue.
            </Text>
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
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  message: {
    marginTop: 12,
    fontSize: 17,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  retryBtn: {
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 15,
  },
  error: {
    marginTop: 10,
    fontSize: 14,
  },
});
