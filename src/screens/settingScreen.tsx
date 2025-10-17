import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch, useAppSelector } from '../hooks/regular_hooks/hooks';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/nativeStackNavigation';
import { RootState } from '../store/store';
import { clearAuth } from '../store/authSlice';
import { clearToken, clearUser } from '../utils/storage/mmKv';
import Toast from 'react-native-toast-message';
import { toogleTheme } from '../store/themeSlice';
import { colors } from '../utils/constants/colors';
import { wp, hp } from '../utils/constants/responsive';

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const rootNavigation = navigation.getParent();
  const isConnected = useAppSelector(
    (state: RootState) => state.offline.isConnected,
  );
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const themeColor = colors[theme];

  const handleLogOut = () => {
    dispatch(clearAuth());
    clearToken();
    clearUser();

    if (!isConnected) {
      Toast.show({
        type: 'info',
        text1: 'Offline logout',
        text2: 'You are logged out locally. Server sync will happen later.',
      });
    }

    rootNavigation?.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColor.background }]}>
      <Text style={[styles.title, { color: themeColor.text }]}>Settings</Text>

      <View style={styles.buttonsContainer}>
        {/* Change Theme Button */}
        <TouchableOpacity
          onPress={() => dispatch(toogleTheme())}
          style={[styles.button, { backgroundColor: themeColor.button }]}
        >
          <Icon name="theme-light-dark" size={wp(5)} color={themeColor.buttonText} />
          <Text style={[styles.buttonText, { color: themeColor.buttonText }]}>
            Change Theme
          </Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogOut}
          style={[styles.button, { backgroundColor: '#ff4d4f' }]}
        >
          <Icon name="logout" size={wp(5)} color="#fff" />
          <Text style={[styles.buttonText, { color: '#fff' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  title: {
    fontSize: wp(7),
    fontWeight: '700',
    marginBottom: hp(3),
  },
  buttonsContainer: {
    width: '100%',
    gap: hp(2),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    borderRadius: wp(3),
    elevation: 3,
    gap: wp(2),
  },
  buttonText: {
    fontSize: wp(4.5),
    fontWeight: '600',
  },
});
