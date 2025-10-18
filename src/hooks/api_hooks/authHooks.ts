import { useAppDispatch, useAppSelector } from '../regular_hooks/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { APP_END_POINTS, BASE_URL } from '../../utils/constants/constants';
import { setBiometricEnabled, setAuth, clearAuth } from '../../store/authSlice';
import { clearToken, clearUser, getToken, getUser, setToken, setUser } from '../../utils/storage/mmKv';
import React from 'react';
import { RootState } from '../../store/store';
import Toast from 'react-native-toast-message';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (credentials: LoginPayload) => {
      const response = await axios.post<LoginResponse>(
        `${BASE_URL}${APP_END_POINTS.LOGIN}`,
        credentials,
        { headers: { 'Content-Type': 'application/json' } },
      );
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      if (data.accessToken && typeof data.accessToken === 'string') {
        setToken(data.accessToken);
        setUser(data.username);
        dispatch(setAuth({ token: data.accessToken, user: data.username }));
        dispatch(setBiometricEnabled(true));
        Toast.show({ type: 'success', text1: 'Login Success' });
      }
    },
    onError: error => {
      Toast.show({ type: 'error', text1: 'Login Failed', text2: error.message });
    },
  });
};



export const useRestoreSession = () => {
  const dispatch = useAppDispatch();
  const token = getToken();
  const localUser = getUser();
  const isConnected = useAppSelector((state: RootState) => state.offline.isConnected);

  const query = useQuery<LoginResponse, Error>({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await axios.get<LoginResponse>(
        `${BASE_URL}${APP_END_POINTS.ME}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    },
    enabled: !!token && isConnected, 
    retry: (failureCount, error) => axios.isAxiosError(error) && !error.response && failureCount < 3,
    retryDelay: 2000,
  });

  React.useEffect(() => {
    if (!isConnected && token && localUser) {
      dispatch(setAuth({ user: localUser, token: token }));
      return;
    }

    if (query.isSuccess && query.data) {
      dispatch(setAuth({ user: query.data.username, token: query.data.accessToken }));
    }

    if (query.isError && isConnected) {
      if (axios.isAxiosError(query.error)) {
        const status = query.error.response?.status;
        if (status === 401 || status === 403) {
          clearToken();
          clearUser();
          dispatch(clearAuth());
        } 
      } 
    }
  }, [query.isSuccess, query.isError, isConnected]);

  return query;
};
