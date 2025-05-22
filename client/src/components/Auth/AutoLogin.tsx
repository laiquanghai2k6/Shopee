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
import { useMyVouncher } from "@/hooks/useMyVouncher";
import { setMyVouncher } from "@/slice/myVouncherSlice";
import { useMyUserCart } from "@/hooks/useMyUserCart";
import { setUserCart } from "@/slice/userCartSlice";
import { useHistory } from "@/hooks/useHistory";
import { setHistory } from "@/slice/historySlice";
import { useFlashSale } from "@/hooks/useFlashSale";
import { setFlashSale } from "@/slice/flashSaleSlice";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0YmU3ZmIzLTQ1ZTItNDc0ZC04ODIwLTAwY2Q4ZTRjZTdlZSIsImlhdCI6MTc0NjQ0MTI2NiwiZXhwIjoxNzQ2NDQ0ODY2fQ.xrMnHMU4vSQObbnxWhhjvjJsYG5JImSqbxubdT29Ds8'
export type SignInResponse = {
    user: User,

}
const AutoLogin = () => {
    const [loading, setLoading] = useState(false)
    const [user, setCurrentUser] = useState<User | undefined>(undefined)
    const dispatch = useDispatch()
    useEffect(() => {
        const autoLogin = async () => {
            try {
                setLoading(true)
                const currentUser = await requestUser.get('/getUser')
                setLoading(false)
                console.log(user)
                dispatch(setUser((currentUser.data as SignInResponse).user))
                setCurrentUser(currentUser.data.user)
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
    const myVouncherData = useMyVouncher(user?.id ?? '')
    const myUserCartData = useMyUserCart(user?.id ?? '')
    const historyData = useHistory(user?.history?.id ?? '')
    const flashSaleData = useFlashSale()

    useEffect(() => {
        if (flashSaleData.data) {
            console.log('flash')
            dispatch(setFlashSale(flashSaleData.data))
        }
    }, [flashSaleData.data])
    useEffect(() => {
        if (categoriesData.data) {
            dispatch(setCategories(categoriesData.data))
        }
    }, [categoriesData.data])
      useEffect(() => {
        if (myUserCartData.data) {
            dispatch(setUserCart(myUserCartData.data))
        }
    }, [myUserCartData.data])
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
    useEffect(() => {
        if (myVouncherData.data) {
            if (myVouncherData.data.length != 0) {
                dispatch(setMyVouncher(myVouncherData.data))
            }
        }
    }, [myVouncherData.data])
    useEffect(()=>{
        if(historyData.data){
            dispatch(setHistory(historyData.data))
        }
    },[historyData.data])

    if (loading || categoriesData.isLoading || flashSaleData.isLoading|| vouncherData.isLoading || bannerData.isLoading) return <SpinnerShopee />
    return null;
}

export default AutoLogin;