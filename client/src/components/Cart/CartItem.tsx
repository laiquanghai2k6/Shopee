'use client'
import Triangle from '../../../public/triangle-reverse.png'

import { Choose, ConvertToVND, ProductCart } from "@/app/cart/page";
import React, { useEffect, useState } from "react";
import ButtonOrange from '../Button/ButtonOrange';
import MinusBlack from '../../../public/minus-black.png'
import PlusBlack from '../../../public/plus-black.png'
type CartItemProp = {
    item: ProductCart,
    i: number,
    isCheck: boolean,
    setCartItems: Function,
    setItemCheck: Function,
    decreaseItem:Function
    increaseItem:Function,
    deleteCartItem:Function

}

const CartItem = React.memo(({ item, i,deleteCartItem, setCartItems,decreaseItem, increaseItem,isCheck=false, setItemCheck }: CartItemProp) => {
    const [openOption, setOpenOption] = useState<number>(-1)
    const [currentColor, setCurrentColor] = useState(item.colorsChoson.key)
    const [currentSize, setCurrentSize] = useState(item.sizeChosen.key)
    const [totalItem,setTotalItem] = useState('')
    const priceFormat = new Intl.NumberFormat('vi-VN').format(item.price)
    const discountPrice = item.price - (item.price / 100) * item.discount
    const discountPriceFormat = item.discount != 0 ? ConvertToVND(discountPrice) : ""
    useEffect(()=>{
        const realPrice = (item.price - (item.price / 100) * item.discount)*item.quantity
        const formatRealPrice = ConvertToVND(realPrice)
        setTotalItem(formatRealPrice)
    },[item.quantity])
    
    const QuantityHandler = (type: string) => {
        if (type == 'minus') {
            if (item.quantity > 1) {
                    decreaseItem(item.id)
            }
        } else {
            increaseItem(item.id)
        }
    }
    const a = 'https://thafd.bing.com/th?id=OIF.Db%2fTm%2fHyuc7yZ73nsx105A&rs=1&pid=ImgDetMain'
    return (
        <div className="w-full select-none p-5 max-md:p-0 max-md:mt-2 min-h-20 mt-5 border-[1px] border-gray-300 flex flex-row max-md:flex-col  items-center">
            <div className="h-full  flex flex-row w-[50%] max-md:w-full items-center ">

                <input type="checkbox" className="size-5 accent-[#ee4d2d] ml-3" checked={isCheck} onChange={(e) => {
                    setItemCheck((prev: Choose) => {
                  

                        const temp = [ ...prev.status ]
               

                        temp[i] = !temp[i]
                        return { ...prev, status: temp }
                    })
                }} />
                <div className="size-20 ml-10 max-md:ml-2 flex items-center-justify-center bg-white-200">
                    <img src={a} className="size-full object-contain" />
                </div>
                <div id={`${i}`} className="w-[40%] min-h-20  items-start line-clamp-5 ml-3 max-md:ml-2">
                    <p className='max-md:text-[13px] '>{item.title}</p>
                </div>
                <div className="h-full w-25 flex flex-col cursor-pointer grow-1 relative" onClick={() => {
                    if (openOption == i)
                        setOpenOption(-1)
                    else
                        setOpenOption(i)
                }}>
                    <div className="h-full w-full flex flex-row items-center select-none max-md:text-[13px]">
                        <p className="text-[#888]">Phân loại hàng: </p>
                        <img src={typeof Triangle == 'string' ? Triangle : Triangle.src} className="size-2 ml-2" />
                    </div>
                    <div className="min-h-[100%] w-full max-md:text-[13px]">
                        <p className="line-clamp-2 block text-[#888]">{`${item.colorsChoson.text}`}</p>
                        <p className="line-clamp-2 block text-[#888]">{`${item.sizeChosen.size}`}</p>
                    </div>
                    {openOption == i && (
                        <div onClick={(e) => e.stopPropagation()} className="z-100  min-h-30 w-100 absolute top-[110%] right-0 shadow-[0px_0px_10px_rgba(0,0,0,0.2)] bg-white ">
                            <div className='p-2 flex flex-col'>
                                <p className='text-[#888]'>Màu sắc:</p>
                                <div className='flex flex-row flex-wrap w-full '>
                                    {item.colors.map((color, i) => {

                                        if (i == currentColor) {
                                            return (
                                                <div onClick={() => {

                                                    //setColor({ image: '', text: '', key: -1 })

                                                }} key={`color${i}`} className='mt-2 border-[#ee4d2d] text-[#ee4d2d] cursor-pointer ml-3 h-10 w-fit border-1 p-2 flex items-center justify-center flex-row'>
                                                    {color.image != '' && <img src={color.image} className='w-5 h-full object-cover' />}
                                                    <p className='ml-2 max-md:text-[10px]'>{color.text}</p>
                                                </div>
                                            )
                                        } else
                                            return (
                                                <div onClick={() => setCurrentColor(i)} key={`colors${i}`} className='mt-2 hover:border-[#ee4d2d] hover:text-[#ee4d2d] cursor-pointer ml-3 h-10 w-fit border-1 p-2 flex items-center justify-center flex-row'>
                                                    {color.image != '' && <img src={color.image} className='w-5 h-full object-cover' />}
                                                    <p className='ml-2 max-md:text-[10px]'>{color.text}</p>
                                                </div>
                                            )
                                    })}

                                </div>
                                <p className='text-[#888] mt-2'>Kích cỡ</p>
                                <div className='flex flex-row flex-wrap w-full '>

                                    {item.sizes.map((size, i) => {
                                        if (i == currentSize) {
                                            return (
                                                <div onClick={() => {

                                                    // setSize({ size: '', key: -1 })

                                                }} key={`size${i}`} className='mt-2 cursor-pointer border-[#ee4d2d] text-[#ee4d2d] ml-3 h-10 w-fit border-1  p-2 flex items-center justify-center flex-row'>
                                                    <p className='ml-2 max-md:text-[12px]'>{size.size}</p>
                                                </div>
                                            )
                                        } else return (
                                            <div onClick={() => setCurrentSize(i)} key={`sizes${i}`} className='mt-2 cursor-pointer hover:border-[#ee4d2d] hover:text-[#ee4d2d] ml-3 h-10 w-fit border-1  p-2 flex items-center justify-center flex-row'>
                                                <p className='ml-2 max-md:text-[12px] font'>{size.size}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='flex flex-row justify-end w-full mt-4'>
                                    <ButtonOrange onClick={() => setOpenOption(-1)} text='Trở lại' extraClass='p-3 w-40 mr-5 hover:bg-gray-300' basicText='black' basicColor='#f5f5f5' />
                                    <ButtonOrange onClick={() => {
                                        setCartItems((prev: ProductCart[]) => {
                                            const temp = [...prev]
                                            temp[i] = { ...temp[i], colorsChoson: item.colors[currentColor ?? 0], sizeChosen: item.sizes[currentSize ?? 0] }
                                            return temp
                                        })
                                        setOpenOption(-1)
                                    }} text='Xác nhận' extraClass='p-3 w-40' />

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='h-full flex flex-row w-[50%] max-md:w-full items-center ml-2'>
                <div className='w-[25%] h-full flex flex-col justify-center items-center'>
                    {discountPriceFormat != "" ? (
                        <>
                            <p className='line-through text-gray-500'>{`${priceFormat}đ`}</p>
                            <p className=''>{`${discountPriceFormat}đ`}</p>
                        </>

                    ):(
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
                    <p onClick={()=>{
                        deleteCartItem(item.id)
                        setItemCheck((prev:Choose)=>{
                            const temp = [...prev.status]
                            temp.splice(i,1)
                            console.log('zz:',{...prev,status:temp})
                            return {...prev,status:temp}

                        })
                        }} className='hover:text-[#ee4d2d] cursor-pointer'>{`Xóa`}</p>
                </div>
            </div>
        </div>
    );
})

export default CartItem;