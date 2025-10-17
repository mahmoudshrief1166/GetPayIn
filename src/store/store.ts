import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./authSlice";
import lockReducer from "./lockSlice"
import offlineReducer from "./offlineSlice"
import themeReducer from './themeSlice'


export const store=configureStore({
    reducer:{
        auth:authReducer,
        lock:lockReducer,
        offline:offlineReducer,
        theme:themeReducer

    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        }),
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;