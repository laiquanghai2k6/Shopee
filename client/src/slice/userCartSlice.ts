import { UserCart } from './../components/Modal/ModalBuying';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export type UserCartState = {
    userCart: UserCart[]
}
const initialState: UserCartState = {
    userCart: []
}

export const UserCartSlice = createSlice({
    name: 'user-cart',
    initialState,
    reducers: {
        setUserCart: (state, action: PayloadAction<UserCart[]>) => {
            state.userCart = action.payload
        },
        addUserCart: (state, action: PayloadAction<UserCart>) => {
            const temp = [...state.userCart]
            const idx = temp.findIndex((t) => t.product?.id == action.payload.product?.id)


            temp.push(action.payload)
            state.userCart = temp

        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const temp = [...state.userCart].map((t, i) => {
                if (t.id == action.payload) t.quantity += 1
                return t;
            })
            state.userCart = temp


        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const temp = [...state.userCart].map((t, i) => {
                if (t.id == action.payload) t.quantity -= 1
                return t;
            })
            state.userCart = temp


        },
        deleteUserCart: (state, action: PayloadAction<string[]>) => {
            const temp = [...state.userCart]
            const tempx = temp.filter((c) =>!action.payload.includes(c.id!))
            state.userCart = tempx
        },
        resetUserCart: (state) => {
            state.userCart = initialState.userCart
        }
    }
})
export const { resetUserCart, addUserCart, setUserCart, deleteUserCart, increaseQuantity, decreaseQuantity } = UserCartSlice.actions