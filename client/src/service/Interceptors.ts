import { store } from "@/store/store";
import { GetNewAccessToken } from "./GetNewAccessToken";
import { setToken } from "@/slice/accessTokenSlice";
import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/router";
import { setUser } from "@/slice/userSlice";
import { requestUser } from "./axiosRequest";

export const interceptorAxios = (instance:AxiosInstance)=>{
    instance.interceptors.request.use((config)=>{
        const accessToken = store.getState().accessToken.accessToken
        console.log('ac:',accessToken)
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
                    store.dispatch(setUser({ email: '', image: '', id: '' }))
                    store.dispatch(setToken({ accessToken: '' }))
                    return error
                }
            }
            
            return error
    
        }
    )
}

