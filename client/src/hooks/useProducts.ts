import { InfoProduct } from "@/components/Modal/ModalProduct"
import { requestProduct } from "@/service/axiosRequest"
import { useInfiniteQuery } from "@tanstack/react-query"
export const LIMIT_PER_PAGE = 30
export type PageProduct = {
    product:InfoProduct[],
    page:number,
    total:number,

}
export type PagePagination={
    pages:PageProduct[],
    pageParams:number
}


const fetchProduct = async (pageParam:number)=>{
    try{
        const res = await requestProduct.get(`get-product?page=${pageParam}&limit=${LIMIT_PER_PAGE}`)
        return res.data 
    }catch(e){
        console.log(e)
    }
}


export const useProducts = ()=>{
    return useInfiniteQuery<PageProduct,Error,PagePagination,[string],number>({
        queryKey:['product'],
        queryFn:({pageParam=1})=>fetchProduct(pageParam),
        getNextPageParam:(lastPage)=>{
            return lastPage.page+1 
        },
        initialPageParam:1
    })
}