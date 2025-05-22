import { InfoProduct } from "@/components/Modal/ModalProduct"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type FlashSaleState = {
    flashSale:InfoProduct[]
}

const initialState:FlashSaleState={
    flashSale:[]
}

export const flashSaleSlice = createSlice({
    name:'flashSale',
    initialState,
    reducers:{
        setFlashSale:(state,action:PayloadAction<InfoProduct[]>)=>{
            state.flashSale = action.payload
        }
    }
})
export const {setFlashSale} = flashSaleSlice.actions