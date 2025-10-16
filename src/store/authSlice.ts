import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_ROLES } from '../utils/constants/constants';

interface AuthState {
  token: string | null;
  user: string | null;
  role: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isBiometricEnabled: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  role: USER_ROLES.USER,
  loading: false,
  isAuthenticated: false,
  isBiometricEnabled: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string; user: string }>
    ) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.role = user.toLowerCase()==='emilys'
        ? USER_ROLES.ADMIN
        : USER_ROLES.USER;
      state.isAuthenticated = true;
      state.loading = false;
      state.isBiometricEnabled = true; 
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBiometricEnabled: (state, action: PayloadAction<boolean>) => {
      state.isBiometricEnabled = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.role = USER_ROLES.USER;
      state.isAuthenticated = false;
      state.loading = false;
      state.isBiometricEnabled = false;
    },
  },
});

export const { setBiometricEnabled,setAuth, clearAuth, setLoading } = authSlice.actions;
export default authSlice.reducer;
