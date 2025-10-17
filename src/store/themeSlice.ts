import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTheme, setLocalTheme } from '../utils/storage/mmKv';

interface ThemeState {
  theme: 'light' | 'dark';
}
const initialState: ThemeState = {
  theme: getTheme() as 'light'|'dark' || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      setLocalTheme(state.theme)
    },
    toogleTheme:(state)=>{
        state.theme=state.theme==='light'?'dark':'light'
        setLocalTheme(state.theme)
    }
  },
});

export const {setTheme,toogleTheme}=themeSlice.actions
export default themeSlice.reducer
