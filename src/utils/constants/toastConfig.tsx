import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { colors } from './colors';
import React from 'react';

export const getToastConfig = (theme: 'light' | 'dark') => {
  const themeColor = colors[theme];

  return {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: themeColor.primary,
          backgroundColor: themeColor.background,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ color: themeColor.text, fontWeight: '600' }}
        text2Style={{ color: themeColor.text }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: '#FF3B30',
          backgroundColor: themeColor.background,
        }}
        text1Style={{ color: themeColor.text }}
        text2Style={{ color: themeColor.text }}
      />
    ),
    info: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: themeColor.primary,
          backgroundColor: themeColor.background,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ color: themeColor.text, fontWeight: '600' }}
        text2Style={{ color: themeColor.text }}
      />
    ),
  };
};
