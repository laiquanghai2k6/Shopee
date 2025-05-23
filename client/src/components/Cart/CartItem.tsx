'use client'

import { Choose } from "@/app/cart/page";
import React, { useEffect, useState } from "react";
import MinusBlack from '../../../public/minus-black.png'
import PlusBlack from '../../../public/plus-black.png'
import { UserCart } from '../Modal/ModalBuying';
import { ConvertToVND } from "../Home/FlashSale";
type CartItemProp = {
    i: number,
    item: UserCart
    isCheck: boolean,
    setItemCheck: Function
    decreaseItem: Function
    increaseItem: Function,
    deleteHandler: Function

}


const CartItem = React.memo(({ i, deleteHandler, decreaseItem, item, increaseItem, isCheck = false, setItemCheck }: CartItemProp) => {
    const price = Number(item.priceProduct.replaceAll('.', ''))
    const now = Date.now()
    const numVouncher = new Date(String(item.product?.timeDiscount)).getTime()
    const discount = now < numVouncher ? Number(item.priceDiscount.replaceAll('.', '')) : price
    const [totalItem, setTotalItem] = useState('')
    const priceFormat = ConvertToVND(price)
    const discountPriceFormat = ConvertToVND(discount)
    useEffect(() => {
        const realPrice = discount * item.quantity
        const formatRealPrice = ConvertToVND(realPrice)
        setTotalItem(formatRealPrice)
    }, [item.quantity])

    const QuantityHandler = (type: string) => {
        if (type == 'minus') {
            if (item.quantity > 1) {
                decreaseItem(item.id)
            }
        } else {
            increaseItem(item.id)
        }
    }

    return (
        <div className="w-full select-none p-5 max-md:p-0 max-md:mt-2 min-h-20 mt-5 border-[1px] border-gray-300 flex flex-row max-md:flex-col  items-center">
            <div className="h-full  flex flex-row w-[50%] max-md:w-full items-center ">
                <input type="checkbox" className="size-5 accent-[#ee4d2d] ml-3"
                    checked={isCheck} onChange={(e) => {
                        setItemCheck((prev: Choose) => {
                            const temp = [...prev.status]
                            temp[i] = !temp[i]
                            return { ...prev, status: temp }
                        })
                    }} />
                <div className="size-20 ml-10 max-md:ml-2 flex items-center-justify-center bg-white-200">
                    <img src={item.product?.image} className="size-full object-contain" />
                </div>
                <div id={`${i}`} className="w-[40%] min-h-20  items-start line-clamp-5 ml-3 max-md:ml-2">
                    <p className='max-md:text-[13px] '>{item.product?.title}</p>
                </div>
                <div className="h-full w-25 flex flex-col grow-1 relative  self-start"
                    
                >
                    <div className="h-full w-full flex flex-row items-center select-none max-md:text-[13px]">
                        <p className="text-[#888]">Phân loại hàng: </p>
                        {/* <img src={typeof Triangle == 'string' ? Triangle : Triangle.src} className="size-2 ml-2" /> */}
                    </div>
                    <div className="min-h-[100%] w-full max-md:text-[13px] ">
                        <p className="line-clamp-2 block text-[#888]">{`${item.choosedOption}`}</p>
                        {/* <p className="line-clamp-2 block text-[#888]">{`${item.sizeChosen.size}`}</p> */}
                    </div>

                </div>
            </div>
            <div className='h-full flex flex-row w-[50%] max-md:w-full items-center ml-2'>
                <div className='w-[25%] h-full flex flex-col justify-center items-center'>
                    {discountPriceFormat != priceFormat && now < numVouncher ? (
                        <>
                            <p className='line-through text-gray-500'>{`${priceFormat}đ`}</p>
                            <p className=''>{`${discountPriceFormat}đ`}</p>
                        </>

                    ) : (
                        <p className=''>{`${priceFormat}đ`}</p>
                    )}
                </div>
                <div className='w-[25%] pl-[5%] h-full flex flex-row items-center justify-center'>
                    <div onClick={() => QuantityHandler('minus')} className="flex  justify-center flex-row w-7 h-7 items-center  border-[1px] hover:bg-gray-200 border-gray-300 cursor-pointer">

                        <img src={typeof MinusBlack == 'string' ? MinusBlack : MinusBlack.src} alt="" className="w-4 h-4" />
                    </div>
                    <div className="flex  justify-center flex-row w-14 h-7 items-center border-[1px] border-gray-300">
                        <p className=" text-[15px]">{item.quantity}</p>
                    </div>
                    <div onClick={() => QuantityHandler('plus')} className="flex  justify-center flex-row w-7 h-7 items-center border-[1px] hover:bg-gray-200 border-gray-300 cursor-pointer">
                        <img src={typeof PlusBlack == 'string' ? PlusBlack : PlusBlack.src} alt="" className="w-5 h-5" />
                    </div>
                </div>
                <div className='w-[25%] h-full pl-[5%] flex flex-row items-center justify-center'>
                    <p className='text-[#ee4d2d]'>{`${totalItem}đ`}</p>
                </div>
                <div className='w-[25%] h-full flex flex-row items-center pl-[15%] '>
                    <p onClick={() => {
                        deleteHandler(item.id, i)
                    }} className='hover:text-[#ee4d2d] cursor-pointer'>{`Xóa`}</p>
                </div>
            </div>
        </div>
    );
})
CartItem.displayName = "CartItem";

export default CartItem;