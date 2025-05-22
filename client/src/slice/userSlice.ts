import { Role } from "@/hooks/useUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export type User={
    id:string,
    email:string,
    image:string,
    role:Role,
    money:number,
    history:{
        id:string
    }
}
type UserState = {
    user:User
}
const initialState:UserState = {
    user:{
        email:'',
        image:'',
        id:'',
        role:Role.CLIENT,
        money:0,
        history:{
            id:''
        }
    }
}
export const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,action:PayloadAction<User>){
            state.user = action.payload
        },
        resetUser:(state)=>{
            state.user = initialState.user
        },
        increase:(state,action:PayloadAction<number>)=>{
            const temp = state.user
            temp.money+=action.payload
            state.user = temp
        },
        decrease:(state,action:PayloadAction<number>)=>{
            const temp = state.user
            temp.money-=action.payload
            state.user = temp
        },
        uploadUserImage:(state,action:PayloadAction<string>)=>{
            const temp = state.user
            temp.image=action.payload
            state.user = temp
        }
    }
})
export const {setUser,resetUser,increase,uploadUserImage,decrease} = UserSlice.actions
