import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type AccessToken={
    accessToken:string

}

const initialState:AccessToken = {
    accessToken:''
}

export const AccessTokenSlice = createSlice({
    name:'token',
    initialState,
    reducers:{
        setToken(state,action:PayloadAction<AccessToken>){
            state.accessToken = action.payload.accessToken
        }
    }
})

export const {setToken} = AccessTokenSlice.actions