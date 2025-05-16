import { requestVouncher } from "@/service/axiosRequest"
import { Vouncher } from "@/slice/vouncherSlice"
import { useQuery } from "@tanstack/react-query"




const fetchVouncher =async ()=>{
        try{
            const res = await requestVouncher.get('get-vouncher')
            return res.data as Vouncher[]
        }catch(e){
             console.log(e)
             return[]
        }
}

export const useVouncher = ()=>{
    return useQuery({
        queryKey:['vouncher'],
        queryFn:fetchVouncher
    })
}