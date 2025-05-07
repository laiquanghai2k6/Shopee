import axios from "axios";
import { interceptorAxios } from "./Interceptors";

export const requestUser = axios.create({
    baseURL:process.env.NEXT_PUBLIC_USER_URL,
    withCredentials:true
})

interceptorAxios(requestUser)