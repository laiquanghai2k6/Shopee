import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type Banner={
    bgLogin:string,
    bgNavigate:string[],
    bg1:string,
    bg2:string,

}
export type BannerState={
    banner:Banner
}

const initialState:BannerState = {
    banner:{
        bg1:'',
        bg2:'',
        bgNavigate:[],
        bgLogin:''
    }
}

export const BannerSlice = createSlice({
    name:'banner',
    initialState,
    reducers:{
        setBanner(state,action:PayloadAction<Banner>){
            state.banner = action.payload
        }
    }
})

export const {setBanner} = BannerSlice.actions