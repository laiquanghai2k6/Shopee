import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Vouncher = {
    id?:string,
    expire:Date,
    discount:string,
    maxDiscount:string
}
type VouncherState = {
    vouncher:Vouncher[]
}

const initialState:VouncherState ={
    vouncher:[]
}
export const VouncherSlice = createSlice({
    name:'voucnher',
    initialState,
    reducers:{
        setVouncher:(state,action:PayloadAction<Vouncher[]>)=>{
            state.vouncher = action.payload
        },
        addVouncher:(state,action:PayloadAction<Vouncher>)=>{
            const temp = state.vouncher
            temp.push(action.payload)
            state.vouncher = temp
        },
        deleteVouncher:(state,action:PayloadAction<string>)=>{
            const temp = state.vouncher
            state.vouncher = temp.filter((t)=>t.id != action.payload)
        },
        changeVouncher:(state,action:PayloadAction<Vouncher>)=>{
            const temp = state.vouncher
            
            const idx = temp.findIndex((t)=>t.id == action.payload.id)
            temp[idx] = action.payload
            state.vouncher = temp
        }
    }
})
export const {setVouncher,addVouncher,deleteVouncher,changeVouncher} = VouncherSlice.actions