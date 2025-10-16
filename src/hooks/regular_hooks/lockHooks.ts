import { useEffect } from 'react';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from './hooks';
import { APP_SETTINGS } from '../../utils/constants/constants';
import { lockApp, updateActivity } from '../../store/lockSlice';

export const USeLock = () => {
  const dispatch = useAppDispatch();

  const lastActivity = useAppSelector(
    (state: RootState) => state.lock.lastActivity,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const timeOut = Date.now() - lastActivity;
      if (timeOut > APP_SETTINGS.APP_LOCK_TIMEOUT) {
        dispatch(lockApp());
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [lastActivity, dispatch]);

  const registerActivity = () => {
    dispatch(updateActivity());
  };

  return registerActivity;
};
