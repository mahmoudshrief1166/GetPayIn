import React, { useEffect, useState } from 'react';
import { Text, Animated, StyleSheet, View, Dimensions } from 'react-native';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { RootState } from '../store/store';
import { UseOffline } from '../hooks/regular_hooks/offlineHook';
import { colors } from '../utils/constants/colors';

const { width } = Dimensions.get('window');

export default function OfflineIndicator() {
  const isConnected = useAppSelector(
    (state: RootState) => state.offline.isConnected,
  );
  const [slideAnimate] = useState(new Animated.Value(-50));
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const themeColor = colors[theme];

  UseOffline();

  useEffect(() => {
    if (isConnected === undefined) return;

    Animated.timing(slideAnimate, {
      toValue: !isConnected ? 0 : -100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isConnected]);

  if (isConnected || isConnected === undefined) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnimate }],
          backgroundColor: themeColor.background,
          width: width - 20,
        },
      ]}
      pointerEvents="none"
    >
      <Text style={[styles.text, { color: themeColor.colorError }]}>
        You're offline
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    paddingVertical: 10,
    zIndex: 1000,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 40,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});
