'use client'
import CommentProduct from "../Buying/CommentProduct";
import DescriptionProduct from "../Buying/DescriptionProduct";
import DetailProduct from "../Buying/DetailProduct";
import ProductBuyingClient from "../Buying/ProductBuyingClient";
import { InfoProduct } from "../Modal/ModalProduct";
import { useCallback, useState } from "react";
import ModalBuying, { UserCart, UserCartType } from "../Modal/ModalBuying";
import SpinnerShopee from "../Spinner/SpinnerShopee";
export type ProductClientProp = {
    data: InfoProduct
}
export type BeforeBuying = {
    active:boolean
    userCart:UserCart
}

const ProductClient = ({ data }: ProductClientProp) => {
    const [modal, setModal] = useState<BeforeBuying>({
        active: false,
        userCart:{
            choosedOption:'',
            priceProduct:'',
            priceDiscount:'',
            product:undefined,
            quantity:0,
            type:UserCartType.PENDING,
            userId:''
   
        }
    })
    const [loading,Loading] = useState(false)
    const closeModal = useCallback(() => {
        setModal((prev) => ({ ...prev, active: false }))
    }, [])
    const openModal = useCallback((userCart:UserCart)=>{
        setModal({ active: true,userCart:userCart })

    },[])

    return (
        <>
        {loading && <SpinnerShopee />}
        {modal.active && <ModalBuying   closeModal={closeModal} userCart={[modal.userCart]}/>}
        <div className="flex min-h-screen justify-center  w-full  h-auto bg-[#f5f5f5] overflow-y-auto max-xl:w-[100%]">
           
            <div className="w-290 max-xl:w-[100%] h-auto bg-[#f5f5f5] flex flex-col mt-10 select-none pb-10">
                <ProductBuyingClient Loading={Loading} data={data} openModal={openModal} />
                <DetailProduct data={data} />
                <DescriptionProduct data={data} />
                {/* <CommentProduct /> */}
            </div>

        </div>
        </>
    );
}

export default ProductClient;