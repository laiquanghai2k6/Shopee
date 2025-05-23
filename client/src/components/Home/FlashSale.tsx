import { useEffect, useState } from "react"
import ProductListFlashSale from "../Product/ProductListFlashSale"
import { useFlashSale } from "@/hooks/useFlashSale"
import SpinnerShopee from "../Spinner/SpinnerShopee"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import CountingTimer from "./CountingTimer"
export const ConvertToVND = (num: number) => {
    const strFormat = new Intl.NumberFormat('vi-VN').format(num)
    return strFormat
}
export type ProductOverview = {
    id: string,
    title: string,
    price: number,
    discount: number,
    image: string
}

const FlashSale = ({ Loading }: { Loading: Function }) => {



    const data = useSelector((state: RootState) => state.flashSale.flashSale)


    return (
        <>

            <div className="flex bg-[#f5f5f5] h-auto pb-30 justify-center select-none">
                <div className="flex w-290 h-full bg-white flex-col">
                    <CountingTimer />

                    <ProductListFlashSale Loading={Loading} product={data ?? []} />
                </div>

            </div>

        </>
    );
}

export default FlashSale;