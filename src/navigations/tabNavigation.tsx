import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllProductScreen from '../screens/allProductScreen';
import SettingsScreen from '../screens/settingScreen';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { RootState } from '../store/store';
import { colors } from '../utils/constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { height, width } from '../utils/constants/responsive';


const Tab = createBottomTabNavigator();


export default function TabNavigator() {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const themeColor = colors[theme];


  const tabBarHeight = height * 0.08; 
  const iconSize = width * 0.06; 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: themeColor.primary,
        tabBarInactiveTintColor: themeColor.text,
        tabBarStyle: {
          backgroundColor: themeColor.background,
          borderTopColor: themeColor.primary,
          height: tabBarHeight,
          paddingBottom: tabBarHeight * 0.16,
        },
        tabBarLabelStyle: {
          fontSize: width * 0.035,
          fontWeight: '500',
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName = '';

          if (route.name === 'AllProduct') {
            iconName = focused ? 'shopping' : 'shopping-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          return <Icon name={iconName} size={iconSize} color={color} />;
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
