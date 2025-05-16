import { requestAdmin, requestVouncher } from "@/service/axiosRequest"
import { Banner } from "@/slice/bannerSlice"
import { useQuery } from "@tanstack/react-query"




const fetchBanner =async ()=>{
        try{
            const res = await requestAdmin.get('/get-banner')
            return res.data as Banner
        }catch(e){
             console.log(e)
             return{} as Banner
        }
}

export const useBanner = ()=>{
    return useQuery({
        queryKey:['banner'],
        queryFn:fetchBanner
    })
}