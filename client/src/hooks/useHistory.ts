import { HistoryCart } from "@/components/Modal/ModalBuying"
import { requestHistoryCart, requestVouncher } from "@/service/axiosRequest"
import { Vouncher } from "@/slice/vouncherSlice"
import { useQuery } from "@tanstack/react-query"




const fetchHistory =async (historyId:string)=>{
    if(!historyId) return []
        try{
            const res = await requestHistoryCart.get(`/get-history?id=${historyId}`)
            return res.data as HistoryCart[]
        }catch(e){
             console.log(e)
             return[]
        }
}

export const useHistory = (id:string)=>{
    return useQuery({
        queryKey:['history-',id],
        queryFn:()=>fetchHistory(id)
    })
}