import { InfoProduct } from "@/components/Modal/ModalProduct"
import { requestProduct } from "@/service/axiosRequest"
import {  useQuery } from "@tanstack/react-query"
export const LIMIT_PER_PAGE = 30

export type ReturnPage = {
    product:InfoProduct[],
    total:number
}


const fetchProduct = async (pageParam:number,id:string)=>{
    if(id == ''){

        try{
            const res = await requestProduct.get(`get-product?page=${pageParam}&limit=${LIMIT_PER_PAGE}`)
            return res.data as ReturnPage
        }catch(e){
            console.log(e)
        }
    }else{
        try {
            const res = await requestProduct.get(`/get-product-category?id=${id}`)
            return res.data as ReturnPage
        } catch (error) {
            
        }
    }
}


export const useProducts = (page: number,id:string) => {
  return useQuery({
    queryKey: ['product', page,id],
    queryFn: () => fetchProduct(page,id),
    
  });
};