import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  isVisible: boolean;
  onUnlock: () => void;
}

export default function BiometricModal({ isVisible, onUnlock }: Props) {
  const [loading, setLoading] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    const rnBiometrics = new ReactNativeBiometrics();

    const authenticate = async () => {
      try {
        setLoading(true);
        setAuthFailed(false);

        const { available, biometryType } = await rnBiometrics.isSensorAvailable();

        if (!available) {
          setAuthFailed(true);
          return;
        }

        const result = await rnBiometrics.simplePrompt({
          promptMessage:
            biometryType === BiometryTypes.FaceID
              ? 'Confirm Face ID'
              : 'Confirm fingerprint or device password',
          cancelButtonText: 'Cancel',
        });

        if (result.success) {
          onUnlock();
        } else {
          setAuthFailed(true);
        }
      } catch (error) {
        console.log('Biometric auth failed:', error);
        setAuthFailed(true);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      authenticate();
    }
  }, [isVisible]);

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <View style={styles.fullContainer}>
        {loading ? (
          <>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.message}>Authenticating...</Text>
          </>
        ) : authFailed ? (
          <>
            <Icon name="fingerprint-off" size={80} color="#FF3B30" />
            <Text style={[styles.title, { color: '#FF3B30' }]}>
              Authentication Failed
            </Text>
            <Text style={styles.message}>
              Please try again using your fingerprint or device password.
            </Text>

            <TouchableOpacity style={styles.retryBtn} onPress={() => setAuthFailed(false)}>
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Icon name="fingerprint" size={100} color="#007AFF" />
            <Text style={styles.title}>Authenticate</Text>
            <Text style={styles.message}>
              Use your fingerprint or device password to continue.
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 17,
    textAlign: 'center',
    color: '#444',
    paddingHorizontal: 10,
  },
  retryBtn: {
    marginTop: 25,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
