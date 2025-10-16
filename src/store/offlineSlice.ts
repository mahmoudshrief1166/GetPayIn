import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface OfflineState{
    isConnected:boolean,
    connectionType?:string,
    lastChecked:number,
}

const initialState:OfflineState={
    isConnected: false,
    connectionType:undefined,
    lastChecked: Date.now(),
}

const offlineSlice=createSlice({
    name:'network',
    initialState,
    reducers:{
        setOffline:(state,action:PayloadAction<{isConnected:boolean;connectionType?:string}>)=>{
            state.isConnected=action.payload.isConnected;
            state.connectionType=action.payload.connectionType;
            state.lastChecked=Date.now();

        },
    },
})

export const {setOffline}=offlineSlice.actions
export default offlineSlice.reducer