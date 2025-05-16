import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum LoadingType{
    SUCCESS='success',
    ERROR='error',
    PENDING='pending'
}
export type Loading = {
    active:boolean,
    type:LoadingType,
    text:string
}
export type LoadingState={
    loading:Loading

}

const initialState:LoadingState = {
    loading:{

        active:false,
        type:LoadingType.SUCCESS,
        text:''
    }
}

export const LoadingSlice = createSlice({
    name:'loading',
    initialState,
    reducers:{
        setLoading(state,action:PayloadAction<Loading>){
            state.loading = action.payload
        },
        turnOff(state){
            state.loading.active = false
        }
    }
})
export const {setLoading,turnOff} = LoadingSlice.actions
