'use client'
import { Category } from "@/components/Home/Category"
import { requestCategory } from "@/service/axiosRequest"
import { useQuery } from "@tanstack/react-query"

const fetchCategories = async ()=>{
    try{
        const res = await requestCategory.get('get-category')
        return res.data as Category[]
    }catch(e){
        console.log(e)
        return[]

    }
}

export const useCategories = ()=>{
    return useQuery({
        queryKey:['categories'],
        queryFn:fetchCategories
    })
}