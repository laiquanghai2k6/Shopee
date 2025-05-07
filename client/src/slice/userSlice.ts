import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type User={
    id:string,
    email:string,
    image:string,

}

const initialState = {
    user:{
        email:'',
        image:'',
        id:''
    }
}

export const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,action:PayloadAction<User>){
            state.user = action.payload
        }
    }
})
export const {setUser} = UserSlice.actions
