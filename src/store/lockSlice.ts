import { createSlice } from "@reduxjs/toolkit"



interface LockState{
    isLocked:boolean,
    lastActivity:number
};

const initialState: LockState={
    isLocked: false,
    lastActivity: Date.now()
}

 const lockSlice=createSlice({
    name:'lock',
    initialState,
    reducers:{
        lockApp:(state)=>{
            state.isLocked=true;
        },
        unLockApp:(state)=>{
            state.isLocked=false;
            state.lastActivity=Date.now();

        },
        updateActivity:(state)=>{
            state.lastActivity=Date.now();
        }
    }
});

export const {lockApp,unLockApp,updateActivity }=lockSlice.actions;
export default lockSlice.reducer;