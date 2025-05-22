




import { toSlug } from "@/components/Product/ProductCardOverview"
import { requestAdmin, requestProduct, requestVouncher } from "@/service/axiosRequest"
import { Vouncher } from "@/slice/vouncherSlice"
import { useQuery } from "@tanstack/react-query"


export type SearchTitle = {
    title:string,
    id:string
}


const searchProduct = async (debounceInput:string)=>{
    if(debounceInput != ''){

        try{   
                const title = toSlug(debounceInput).split('-').join(' ')
                const res = await requestProduct.get(`/search-product-input?title=${title}`)
                return res.data as SearchTitle[]
        }catch(e){
        console.log(e)
        return[]
        }
    }else return []
}

export const useSearchProduct = (debounceInput:string)=>{
    return useQuery({
        queryKey:['products-search',debounceInput],
        queryFn:()=>searchProduct(debounceInput)
    })
}