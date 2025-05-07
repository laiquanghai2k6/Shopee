import { AccessTokenSlice } from "@/slice/accessTokenSlice";
import { UserSlice } from "@/slice/userSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer:{
        user:UserSlice.reducer,
        accessToken:AccessTokenSlice.reducer
    }

})

export type RootState = ReturnType<typeof store.getState>