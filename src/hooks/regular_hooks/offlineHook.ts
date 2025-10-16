import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useAppDispatch } from './hooks';
import { setOffline } from '../../store/offlineSlice';

export const UseOffline = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unSubscribe = NetInfo.addEventListener(state => {
      dispatch(
        setOffline({
          isConnected: state.isConnected ?? false,
          connectionType: state.type,
        }),
      );
    });

    return () => unSubscribe();
  }, [dispatch]);
};
