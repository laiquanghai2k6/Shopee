'use client'

import { ConvertToVND } from "@/app/cart/page"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export type ProductCardOverview = {
    image: string,
    priceFormat?: string,
    title: string
    priceFormatDiscount: string,
    selled?: string | undefined
    sellNum?: boolean,
    discount: string
    price: number
    id: string,
    startTransition: Function,
    date: string
}
export const toSlug = (text: string) => {
    return text
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/đ/g, "d") 
        .replace(/Đ/g, "D")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") 
        .trim()
        .replace(/\s+/g, "-") 
        .replace(/-+/g, "-"); 
}

const ProductCardOverview = ({ image, date,startTransition, price, selled, discount, id, priceFormat, priceFormatDiscount, title, sellNum = false }: ProductCardOverview) => {
    const router = useRouter()
    const slugTitle = toSlug(title)


    const navigateHandler = async () => {
        startTransition(() => {
            router.push(`/${slugTitle}-${id}`)
        })
    }

    const discountNum = Number(discount)
    const now = Date.now()
    const numVouncher = new Date(date).getTime()
    const priceDiscount = price - (price / 100) * discountNum
    const discountFormat = ConvertToVND(priceDiscount)
    return (
        <div onClick={() => navigateHandler()} className={` flex flex-col size-full rounded-sm text-center items-center bg-white  justify-center  cursor-pointer ${sellNum != false && 'hover:shadow-[0px_0px_7px_rgba(0,0,0,0.5)] hover:border-[#ee4d2d]'} hover:scale-105 transition-transform duration-300`}>
            <div className="size-40 max-md:size-30">
                <img src={image} alt="image product" className="size-full object-cover" />
            </div>
            <p >{`${title}`}</p>


            <div className="flex flex-col">

                {discountNum!=0 && now < numVouncher ? (
                    <>
                        <p className="text-[20px] text-[#ee4d2d] line-through">{`${priceFormatDiscount}đ`}</p>
                        <p className="text-[20px] text-[#ee4d2d]">{`${discountFormat}đ`}</p>
                    </>

                ) : (

                    <p className="text-[20px] text-[#ee4d2d]">{`${priceFormatDiscount}đ`}</p>
                )}
                {sellNum && <p className="text-[15px] self-end ">{`${selled} đã bán`}</p>}
            </div>
        </div>
    );
}



export default ProductCardOverview;