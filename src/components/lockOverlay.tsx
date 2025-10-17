import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/regular_hooks/hooks';
import { RootState } from '../store/store';
import BiometricModal from './biometricModal';
import { unLockApp } from '../store/lockSlice';

export default function LockOverlay() {
  const dispatch = useAppDispatch();
  const isLocked = useAppSelector((state: RootState) => state.lock.isLocked);

  const handleUnLock = () => {
    dispatch(unLockApp());
  };

  return <BiometricModal isVisible={isLocked} onUnlock={handleUnLock} />;
}
