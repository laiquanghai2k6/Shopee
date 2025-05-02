'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export type ProductCardOverview = {
    image: string,
    priceFormat?: string,
    title: string
    priceFormatDiscount: string
    sellNum?: boolean
}
export const toSlug = (text: string) => {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .trim();
}

const ProductCardOverview = ({ image, priceFormat, priceFormatDiscount, title, sellNum = false }: ProductCardOverview) => {
    const router = useRouter()
    const slugTitle = toSlug(title)
    const selled = 43;
    useEffect(() => {
        router.prefetch(`/${slugTitle}`);
      }, []);
    const navigateHandler = () => {
       
        router.push(`/${slugTitle}`)
    }
    return (
        <div onClick={() => navigateHandler()} className={` flex flex-col size-full rounded-sm text-center items-center bg-white  justify-center  cursor-pointer ${sellNum != false && 'hover:border-1 hover:border-[#ee4d2d]'} hover:scale-105 transition-transform duration-300`}>
            <div className="size-40 max-md:size-30">
                <img src={image} alt="image product" className="size-full object-cover" />
            </div>
            <p >{`${title}`}</p>

                
            <div className="flex flex-col">

                {priceFormat && <p className="text-[20px] text-[#ee4d2d] line-through">{`${priceFormat}đ`}</p>}
                <p className="text-[20px] text-[#ee4d2d]">{`${priceFormatDiscount}đ`}</p>
                {sellNum && <p className="text-[15px] self-end ">{`${selled} đã bán`}</p>}
            </div>
        </div>
    );
}



export default ProductCardOverview;