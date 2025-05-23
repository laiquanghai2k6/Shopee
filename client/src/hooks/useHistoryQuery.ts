'use client'
import { HistoryCart } from "@/components/Modal/ModalBuying"
import { requestAdmin } from "@/service/axiosRequest"
import { useQuery } from "@tanstack/react-query"


const fetchHistoryQuery = async (from:string,to:string)=>{
    try {
        const res = await requestAdmin.get(`/search-history?from=${from}&to=${to}`)
        return res.data as HistoryCart[]
    } catch (error) {
        console.log(error)
        return []
    }
}



export const useHistoryQuery = (from:string,to:string)=>{
    return useQuery({
        queryKey:['query-history-',from,to],
        queryFn:()=>fetchHistoryQuery(from,to),
        enabled:!!from && !!to
    })
}