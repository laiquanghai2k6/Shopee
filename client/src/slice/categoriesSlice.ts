import { Category } from "@/components/Home/Category";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CategoriesState = {
    category:Category[]
}

const initialState:CategoriesState = {
    category:[]
}



export const CategoriesSlice = createSlice({
    initialState,
    name:'categories',
    reducers:{
        setCategories:(state,action:PayloadAction<Category[]>)=>{
            state.category = action.payload
        },
        addCategory:(state,action:PayloadAction<Category>)=>{
            state.category = [...state.category,action.payload]
        },
        deleteCategory:(state,action:PayloadAction<number>)=>{
            const temp = state.category
            temp.splice(action.payload,1)
            state.category = temp
        },
        changeCategory:(state,action:PayloadAction<Category>)=>{
            const temp = state.category
            const indexU = temp.findIndex((t)=>t.id == action.payload.id)
            temp[indexU] = action.payload
            state.category = temp
        },
    }
})
export const {setCategories,addCategory,deleteCategory,changeCategory} = CategoriesSlice.actions