import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllProductScreen from '../screens/allProductScreen';
import { View, TouchableOpacity, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/regular_hooks/hooks';
import { clearAuth } from '../store/authSlice';
import { clearToken, clearUser } from '../utils/storage/mmKv';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './nativeStackNavigation';
import { RootState } from '../store/store';
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();

function LogoutScreen() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const rootNavigation = navigation.getParent();
  const isConnected = useAppSelector(
    (state: RootState) => state.offline.isConnected, 
  );

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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <TouchableOpacity
        onPress={handleLogOut}
        style={{
          backgroundColor: '#FF3B30',
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}


export default function TabNavigator() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
          tabBarLabelStyle: { fontSize: 14 },
        }}
      >
        <Tab.Screen
          name="AllProduct"
          component={AllProductScreen}
          options={{ tabBarLabel: 'All Products' }}
        />
        <Tab.Screen
          name="SignOut"
          component={LogoutScreen}
          options={{ tabBarLabel: 'Sign Out' }}
        />
      </Tab.Navigator>
    </>
  );
}
