import { store } from "@/store/store";
import { GetNewAccessToken } from "./GetNewAccessToken";
import { resetToken, setToken } from "@/slice/accessTokenSlice";
import axios, { AxiosInstance } from "axios";
import { resetUser, setUser } from "@/slice/userSlice";
import { requestUser } from "./axiosRequest";
import { resetMyVouncher } from "@/slice/myVouncherSlice";
import { resetUserCart } from "@/slice/userCartSlice";

export const interceptorAxios = (instance:AxiosInstance)=>{
    instance.interceptors.request.use((config)=>{
        const accessToken = store.getState().accessToken.accessToken
        config.headers['Authorization'] = `Bearer ${accessToken}`
        return config
    },(error)=>{
        return Promise.reject(error)
    })

    instance.interceptors.response.use(

        response => response,
        async (error) => {
            
            const originalRequest = error.config;
            if(originalRequest.url == '/sign-in' ||originalRequest.url == '/sign-up'){
                return Promise.reject(error)
            }
            if (error.response&&error.response.status === 401&&!originalRequest._retry&& !originalRequest.url?.includes('/refreshToken')) {
            originalRequest._retry = true;
                
                try {
                    const response = await requestUser.get('/refreshToken')
                    const newAccessToken = response.data

                    store.dispatch(setToken({ accessToken: newAccessToken }))
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    if(newAccessToken){
                        return instance(originalRequest);
                    }
                } catch (error){
                   await instance.get('/sign-out-auto')
                    store.dispatch(resetUser())
                    store.dispatch(resetMyVouncher())
                    store.dispatch(resetToken())
                    store.dispatch(resetUserCart())
                    return error
                }
            }
            
            return error
    
        }
    )
}

