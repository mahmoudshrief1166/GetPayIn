import React, { useEffect, useState } from 'react';
import {  Text, Animated, StyleSheet } from 'react-native';
import { useAppSelector } from '../hooks/regular_hooks/hooks';
import { RootState } from '../store/store';
import { UseOffline } from '../hooks/regular_hooks/offlineHook';


export default function OfflineIndicator() {
  const isConnected=useAppSelector((state:RootState)=>state.offline.isConnected)
  const [slideAnimate] = useState(new Animated.Value(-50));
  UseOffline()
  useEffect(() => {
    Animated.timing(slideAnimate, {
      toValue: !isConnected ? 0 : -100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isConnected]);
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnimate }] }]}
    >
      <Text style={styles.text}>You're offline</Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ff3b30',
    padding: 10,
    zIndex: 1000,
    alignItems: 'center',
    marginTop:40
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});
