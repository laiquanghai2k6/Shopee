import axios from "axios";
import { interceptorAxios } from "./Interceptors";

export const requestUser = axios.create({
    baseURL:process.env.NEXT_PUBLIC_USER_URL,
    withCredentials:true
})
export const requestCategory = axios.create({
    baseURL:process.env.NEXT_PUBLIC_CATEGORY_URL,
    withCredentials:true
})
export const requestVouncher = axios.create({
    baseURL:process.env.NEXT_PUBLIC_VOUNCHER_URL,
    withCredentials:true
})
export const requestAdmin = axios.create({
    baseURL:process.env.NEXT_PUBLIC_ADMIN_URL,
    withCredentials:true
})
export const requestProduct = axios.create({
    baseURL:process.env.NEXT_PUBLIC_PRODUCT_URL,
    withCredentials:true
})
export const requestAddress = axios.create({
    baseURL:'https://vn-public-apis.fpo.vn',
    withCredentials:false 
})
export const requestHistoryCart = axios.create({
    baseURL:process.env.NEXT_PUBLIC_HISTORY_CART_URL,
    withCredentials:true
})
interceptorAxios(requestUser)
interceptorAxios(requestCategory)
interceptorAxios(requestVouncher)
interceptorAxios(requestAdmin)
interceptorAxios(requestHistoryCart)


