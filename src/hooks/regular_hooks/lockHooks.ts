import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from './hooks';
import { APP_SETTINGS } from '../../utils/constants/constants';
import { lockApp, updateActivity } from '../../store/lockSlice';

export const USeLock = () => {
  const dispatch = useAppDispatch();
  const lastActivity = useAppSelector(
    (state: RootState) => state.lock.lastActivity,
  );

  const appState = useRef(AppState.currentState);
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);



  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {

        const timeOut = Date.now() - lastActivity;
        if (timeOut > APP_SETTINGS.APP_LOCK_TIMEOUT) {
          dispatch(lockApp());
        }
      }
      appState.current = nextState;
    });

    return () => {
      subscription.remove();
    };
  }, [lastActivity, dispatch]);


  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const timeOut = Date.now() - lastActivity;
      if (timeOut > APP_SETTINGS.APP_LOCK_TIMEOUT) {
        dispatch(lockApp());
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [dispatch, lastActivity]);

  const registerActivity = () => {
    dispatch(updateActivity());
  };

  return registerActivity;
};
