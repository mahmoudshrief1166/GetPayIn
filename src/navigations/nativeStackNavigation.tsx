import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginScreen';
import SpecificCategoryScreen from '../screens/specificCategoryScreen';
import TabNavigator from './tabNavigation';
import SplashScreen from '../screens/splashScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTab: undefined;
  Category: { category: string };
};

const nativeStack = createNativeStackNavigator<RootStackParamList>();

export default function NativeStackNavigation() {
  return (
    <nativeStack.Navigator>
      <nativeStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <nativeStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <nativeStack.Screen
        name="MainTab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <nativeStack.Screen
        name="Category"
        component={SpecificCategoryScreen}
        options={({ route }) => ({ title: route.params.category })}
      />
    </nativeStack.Navigator>
  );
}
