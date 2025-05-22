import { requestUser, requestVouncher } from "@/service/axiosRequest"
import { MyVouncher } from "@/slice/myVouncherSlice"
import { Vouncher } from "@/slice/vouncherSlice"
import { useQuery } from "@tanstack/react-query"




const fetchMyVouncher =async (id:string)=>{
    if(id){

        try{
            const res = await requestUser.get(`/my-vouncher?id=${id}`)
            return res.data as MyVouncher[]
        }catch(e){
             console.log(e)
             return[]
        }
    }else return []
}

export const useMyVouncher = (id:string)=>{
    return useQuery({
        queryKey:['myVouncher',id],
        queryFn:()=>fetchMyVouncher(id),
        enabled: !!id
    })
}