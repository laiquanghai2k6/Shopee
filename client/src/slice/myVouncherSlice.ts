

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Vouncher } from "./vouncherSlice"
export enum StateVouncher{
    USED='used',
    UNUSED='unused'
}
export type UserVouncher = {
    id:string
}
export type MyVouncher = {
    id:string,
    user:UserVouncher,
    vouncher:Vouncher,
    state:StateVouncher
}
type MyVouncherState = {
    myVouncher:MyVouncher[]
}

const initialState:MyVouncherState ={
    myVouncher:[]
}
export const MyVoucherSlice = createSlice({
    name:'my-voucnher',
    initialState,
    reducers:{
        setMyVouncher:(state,action:PayloadAction<MyVouncher[]>)=>{
            state.myVouncher = action.payload
        },
        addMyVouncher:(state,action:PayloadAction<MyVouncher>)=>{
            const temp = state.myVouncher
            temp.push(action.payload)
            state.myVouncher = temp
        },
        deleteMyVouncher:(state,action:PayloadAction<string>)=>{
            const temp = state.myVouncher
            const idx = temp.findIndex((v)=>v.id == action.payload)
            temp[idx].state = StateVouncher.USED
            state.myVouncher = temp
        },
        resetMyVouncher:(state)=>{
            state.myVouncher = initialState.myVouncher
        }
    }
})
export const {setMyVouncher,resetMyVouncher,addMyVouncher,deleteMyVouncher} = MyVoucherSlice.actions