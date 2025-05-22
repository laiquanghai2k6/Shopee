import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    orderId:''
}

export const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        setOrderId:(state,action:PayloadAction<string>)=>{
            state.orderId = action.payload
        }
    }
})
export const {setOrderId} = orderSlice.actions