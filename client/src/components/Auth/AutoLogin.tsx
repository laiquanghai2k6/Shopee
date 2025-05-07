'use client'

import { requestUser } from "@/service/axiosRequest";
import { GetNewAccessToken } from "@/service/GetNewAccessToken";
import { setToken } from "@/slice/accessTokenSlice";
import { setUser, User } from "@/slice/userSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinnerShopee from "../Spinner/SpinnerShopee";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI0YmU3ZmIzLTQ1ZTItNDc0ZC04ODIwLTAwY2Q4ZTRjZTdlZSIsImlhdCI6MTc0NjQ0MTI2NiwiZXhwIjoxNzQ2NDQ0ODY2fQ.xrMnHMU4vSQObbnxWhhjvjJsYG5JImSqbxubdT29Ds8'
export type SignInResponse = {
    user: User,

}
const AutoLogin = () => {
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        const autoLogin = async () => {
            try {
                setLoading(true)
                const currentUser = await requestUser.get('/getUser')
                console.log('curr:',currentUser)
                setLoading(false)

                dispatch(setUser((currentUser.data as SignInResponse).user))
            } catch (e: any) {
                setLoading(false)

                    console.log(e)
                    
            }





        }
        autoLogin()
    }, [])
    if(loading) return <SpinnerShopee />
    return null;
}

export default AutoLogin;