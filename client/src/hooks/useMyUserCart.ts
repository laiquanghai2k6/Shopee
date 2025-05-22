

import { UserCart } from "@/components/Modal/ModalBuying"
import { requestHistoryCart, requestUser, requestVouncher } from "@/service/axiosRequest"
import { MyVouncher } from "@/slice/myVouncherSlice"
import { Vouncher } from "@/slice/vouncherSlice"
import { useQuery } from "@tanstack/react-query"




const fetchMyUserCart =async (id:string)=>{
    if(id){

        try{
            const res = await requestHistoryCart.get(`/get-user-cart?id=${id}`)
            return res.data as UserCart[]
        }catch(e){
             console.log(e)
             return[]
        }
    }else return []
}

export const useMyUserCart = (id:string)=>{
    return useQuery({
        queryKey:['user-cart',id],
        queryFn:()=>fetchMyUserCart(id),
        enabled: !!id
    })
}