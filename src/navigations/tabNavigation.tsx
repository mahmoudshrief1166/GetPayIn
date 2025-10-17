import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllProductScreen from '../screens/allProductScreen';
import SettingsScreen from '../screens/settingScreen';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { RootState } from '../store/store';
import { colors } from '../utils/constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { USeLock } from '../hooks/regular_hooks/lockHooks';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const themeColor = colors[theme];
    const registerActivity = USeLock();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        
        headerShown: false,
        tabBarActiveTintColor: themeColor.primary,
        tabBarInactiveTintColor: themeColor.text,
        tabBarStyle: {
          backgroundColor: themeColor.background,
          borderTopColor: themeColor.primary,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '500',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = '';

          if (route.name === 'AllProduct') {
            iconName = focused ? 'shopping' : 'shopping-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="AllProduct"
        component={AllProductScreen}
        options={{ tabBarLabel: 'Products' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
}
