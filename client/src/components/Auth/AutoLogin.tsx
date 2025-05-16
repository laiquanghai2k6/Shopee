'use client'

import { requestUser } from "@/service/axiosRequest";
import { GetNewAccessToken } from "@/service/GetNewAccessToken";
import { setToken } from "@/slice/accessTokenSlice";
import { setUser, User } from "@/slice/userSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinnerShopee from "../Spinner/SpinnerShopee";
import { useCategories } from "@/hooks/useCategories";
import { setCategories } from "@/slice/categoriesSlice";
import { useVouncher } from "@/hooks/useVouncher";
import { setVouncher } from "@/slice/vouncherSlice";
import { useBanner } from "@/hooks/useBanner";
import { setBanner } from "@/slice/bannerSlice";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0YmU3ZmIzLTQ1ZTItNDc0ZC04ODIwLTAwY2Q4ZTRjZTdlZSIsImlhdCI6MTc0NjQ0MTI2NiwiZXhwIjoxNzQ2NDQ0ODY2fQ.xrMnHMU4vSQObbnxWhhjvjJsYG5JImSqbxubdT29Ds8'
export type SignInResponse = {
    user: User,

}
const AutoLogin = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        const autoLogin = async () => {
            try {
                setLoading(true)
                const currentUser = await requestUser.get('/getUser')
                setLoading(false)
                dispatch(setUser((currentUser.data as SignInResponse).user))
                // dispatch
            } catch (e: any) {
                setLoading(false)

                console.log(e)

            }
        }
        autoLogin()
    }, [])
    const categoriesData = useCategories()
    const vouncherData = useVouncher()
    const bannerData = useBanner()
    useEffect(() => {
        if (categoriesData.data) {
            dispatch(setCategories(categoriesData.data)) 
        }
    }, [categoriesData.data])
    useEffect(() => {
        if (vouncherData.data) {
            dispatch(setVouncher(vouncherData.data)) 
        }
    }, [vouncherData.data])
        useEffect(() => {
        if (bannerData.data) {
            dispatch(setBanner(bannerData.data)) 
        }
    }, [bannerData.data])

    if (loading || categoriesData.isLoading||vouncherData.isLoading||bannerData.isLoading) return <SpinnerShopee />
    return null;
}

export default AutoLogin;