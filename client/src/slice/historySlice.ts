



import { HistoryCart, StateHistory, UserCart } from './../components/Modal/ModalBuying';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export type HistoryState = {
    history: HistoryCart[]
}
const initialState: HistoryState = {
    history: []
}
export type UpdateHistory={
    received_at:string,
    historyId:string
}
export const historySlice = createSlice({
    name: 'history-cart',
    initialState,
    reducers: {
        setHistory: (state, action: PayloadAction<HistoryCart[]>) => {
            state.history = action.payload
        },
        addHistory: (state, action: PayloadAction<HistoryCart>) => {
            const temp = [...state.history]


            temp.unshift(action.payload)
            state.history = temp
        },
        updateHistory:(state,action:PayloadAction<UpdateHistory>)=>{
            const temp = [...state.history]
            const idx = temp.findIndex((t)=>t.id == action.payload.historyId)
            temp[idx].state = StateHistory.RECEIVED
            temp[idx].received_at = action.payload.received_at
            state.history = temp
        },
        resetHistory:(state)=>{
            state.history = initialState.history
        }
        
    }
})
export const { resetHistory,updateHistory, addHistory,setHistory } = historySlice.actions