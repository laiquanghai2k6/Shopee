import { AccessTokenSlice } from "@/slice/accessTokenSlice";
import { BannerSlice } from "@/slice/bannerSlice";
import { CategoriesSlice } from "@/slice/categoriesSlice";
import { LoadingSlice } from "@/slice/loadingSlice";
import { UserSlice } from "@/slice/userSlice";
import { VouncherSlice } from "@/slice/vouncherSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer:{
        user:UserSlice.reducer,
        accessToken:AccessTokenSlice.reducer,
        categories:CategoriesSlice.reducer,
        vouncher:VouncherSlice.reducer,
        loading:LoadingSlice.reducer,
        banner:BannerSlice.reducer
    }

})

export type RootState = ReturnType<typeof store.getState>