import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useLogin } from '../hooks/api_hooks/authHooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/nativeStackNavigation';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { RootState } from '../store/store';
import { colors } from '../utils/constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { wp, hp, fs } from '../utils/constants/responsive'; 

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const themeColor = colors[theme];
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Username and password are required.',
      });
      return;
    }

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: `Welcome ${username}!`,
          });
          navigation.replace('MainTab');
        },
        onError: (error: any) => {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: 'Invalid Username or Password. Please try again.',
          });
        },
      },
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColor.background }]}>
      <Text style={[styles.title, { color: themeColor.text }]}>
        GetPayIn Login
      </Text>

      {loginMutation.isPending && (
        <ActivityIndicator size="large" color={themeColor.primary} />
      )}
      {loginMutation.isError && (
        <Text style={[styles.error, { color: themeColor.colorError }]}>
          Login failed. Please try again.
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { borderColor: themeColor.primary, color: themeColor.inputColor },
          ]}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { borderColor: themeColor.primary, color: themeColor.inputColor },
          ]}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(prev => !prev)}
        >
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={fs(22)}
            color={themeColor.text}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColor.button }]}
        onPress={handleLogin}
        disabled={loginMutation.isPending}
      >
        <Text style={[styles.buttonText, { color: themeColor.buttonText }]}>
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(5),
  },
  title: {
    fontSize: fs(28),
    fontWeight: 'bold',
    marginBottom: hp(10),
    textAlign: 'center',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: hp(2),
  },
  input: {
    borderWidth: 2,
    borderRadius: wp(4),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    fontSize: fs(16),
  },
  eyeIcon: {
    position: 'absolute',
    right: wp(4),
    top: hp(1.5),
  },
  button: {
    paddingVertical: hp(1.8),
    borderRadius: wp(4),
    alignItems: 'center',
    marginTop: hp(2),
    marginHorizontal: wp(20),
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: fs(16),
  },
  error: {
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: hp(1),
  },
});
