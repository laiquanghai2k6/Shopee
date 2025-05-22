import { InfoProduct } from "@/components/Modal/ModalProduct"
import { requestProduct } from "@/service/axiosRequest"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
export const LIMIT_PER_PAGE = 30




const fetchFlashSale = async ()=>{
 

        try{
            const res = await requestProduct.get(`/get-flash-sale`)
            return res.data as InfoProduct[]
        }catch(e){
            console.log(e)
        }
}


export const useFlashSale = () => {
  return useQuery({
    queryKey: ['flash-sale'],
    queryFn: () => fetchFlashSale(),
    
  });
};