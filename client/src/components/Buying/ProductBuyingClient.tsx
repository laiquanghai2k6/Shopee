'use client'

import { Color, ProductDetail, Sizes } from "@/app/[slug]/page"
import { useState } from "react"
import Test3 from '../../../public/test3.png'
import Truck from '../../../public/truck.png'
import Star from '../../../public/star.png'
import HalfStar from '../../../public/half-star.png'
import MinusBlack from '../../../public/minus-black.png'
import MinusGray from '../../../public/minus-gray.png'
import PlusBlack from '../../../public/plus-black.png'
import PlusGray from '../../../public/plus-gray.png'
import ButtonOrange from "../Button/ButtonOrange"
import ButtonLightRed from "../Button/ButtonLightRed"
import IntoCart from '../../../public/into-cart.png'

type ProductBuyingClientProps = {
    fakeProductDetail: ProductDetail
}

const ProductBuyingClient = ({ fakeProductDetail }: ProductBuyingClientProps) => {
    const [curretSize, setSize] = useState<Sizes>({ size: '', key: -1 })
    const [currentColor, setColor] = useState<Color>({ image: '', text: '', key: -1 })
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const priceFormat = new Intl.NumberFormat('vi-VN').format(fakeProductDetail.price)
    const priceDiscountFormat = new Intl.NumberFormat('vi-VN').format(fakeProductDetail.price - fakeProductDetail.price * (fakeProductDetail.discount / 100))
    const numberDate = Date.now();
    const date = new Date(numberDate);
    const dateFuture = new Date(numberDate + 1000 * 3600 * 24 * 3);

    const dayFuture = String(dateFuture.getDate()).padStart(2, '0')
    const monthFuture = String(dateFuture.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const QuantityHandler = (type: string) => {
        if (type == 'minus') {
            if (currentQuantity > 1) {
                setCurrentQuantity((prev) => prev - 1)
            }
        } else {
            setCurrentQuantity((prev) => prev + 1)
        }
    }
    const IntoCartHandler = () => {
        if (currentColor.key == -1 || curretSize.key == -1) {
            alert("Vui lòng điền đầy đủ màu và kích cỡ")
        }
    }
    const BuyHandler = () => {
        if (currentColor.key == -1 || curretSize.key == -1) {
            alert("Vui lòng điền đầy đủ màu và kích cỡ")
        }
    }
    return (
        <div className="w-full bg-white min-h-160 rounded-sm flex flex-row max-xl:flex-col max-xl:items-center">
            <div className="h-full w-[40%] max-xl:w-full bg-white flex p-3 items-start">
                <img src={fakeProductDetail.image} className='w-fit h-fit object-contain' />
            </div>
            <div className="min-h-full h-auto w-[60%] max-xl:w-full bg-whiteflex flex-col p-2">
                <p className='text-[20px]'>Áo Kiểu Thun Tay Dài Cổ Trụ Trơn Basic Dáng Dài Ôm Body, Áo Thun Nữ Tay Dài Kiểu Sexy</p>
                <div className='flex flex-row h-8'>
                    <div className='flex flex-row items-center'>
                        <p className='text-[17px] mr-1'>
                            {fakeProductDetail.starsAvg}
                        </p>
                        {Array.from({ length: Math.floor(fakeProductDetail.starsAvg) }, (_, i) => (
                            <img key={`img:${i}`} src={typeof Star == 'string' ? Star : Star.src} className='w-3 h-3 ml-1' />
                        ))}
                        {
                            Math.floor(fakeProductDetail.starsAvg) < fakeProductDetail.starsAvg && (
                                <img src={typeof HalfStar == 'string' ? HalfStar : HalfStar.src} className='w-3 h-3 ml-1' />

                            )
                        }
                    </div>
                    <div className='flex flex-row h-[80%] items-center ml-5 border-l-2 border-gray-200 pl-1'>
                        <p className='text-[17px] '>{`${fakeProductDetail.comment.length} Đánh giá`}</p>
                    </div>
                    <div className='flex flex-row h-[80%] items-center ml-5 border-l-2 border-gray-200 pl-1'>
                        <p className='text-[17px] '>{`${fakeProductDetail.sold} Đã bán`}</p>
                    </div>
                </div>
                <div className='h-15 w-full bg-[#fafafa] flex flex-row items-center '>
                    {fakeProductDetail.discount == 0 ? (

                        <p className='text-[#ee4d2d] text-[30px] ml-2'>
                            {`${priceFormat}đ`}
                        </p>
                    ) : (
                        <>
                            <p className='text-[#ee4d2d] text-[30px] ml-2'>
                                {`${priceDiscountFormat}đ`}
                            </p>
                            <p className='text-gray-400 line-through text-[20px] ml-5'>
                                {`${priceFormat}đ`}
                            </p>
                            <div className='w-8 h-5 bg-red-200 ml-3'>
                                <p className='text-[#ee4d2d] text-[13px]'>{`-${fakeProductDetail.discount}%`}</p>
                            </div>
                        </>
                    )}
                </div>
                <div className='w-full h-15 flex flex-row mt-6 ml-2'>
                    <div className='w-30 h-full'>
                        <p className='text-[15px] text-gray-500'>Vận chuyển</p>
                    </div>
                    <div className='h-full flex flex-row'>
                        <img src={typeof Truck == 'string' ? Truck : Truck.src} className='w-7 h-7' />
                        <p className='ml-3 select-text'>

                            {`Nhận từ ${day} Th${month} - ${dayFuture} Th${monthFuture}`}
                        </p>
                    </div>
                </div>

                <div className='w-full min-h-15 h-auto flex flex-row mt-6 ml-2'>
                    <div className='min-w-30 max-md:min-w-15  h-full '>
                        <p className='text-[15px] text-gray-500'>Màu sắc</p>
                    </div>
                    <div className='h-full max-w-[100%] flex flex-row flex-wrap'>
                        {fakeProductDetail.colors.map((color, i) => {
                            if (i == currentColor.key) {
                                return (
                                    <div onClick={() => {
                                        
                                            setColor({ image: '', text: '', key: -1 })
                                        
                                    }} key={i} className='mt-2 border-[#ee4d2d] text-[#ee4d2d] cursor-pointer ml-3 h-10 w-fit border-1 p-2 flex items-center justify-center flex-row'>
                                        {color.image != '' && <img src={color.image} className='w-5 h-full object-cover' />}
                                        <p className='ml-2 max-md:text-[10px]'>{color.text}</p>
                                    </div>
                                )
                            } else
                                return (
                                    <div onClick={() => setColor({ ...color, key: i })} key={i} className='mt-2 hover:border-[#ee4d2d] hover:text-[#ee4d2d] cursor-pointer ml-3 h-10 w-fit border-1 p-2 flex items-center justify-center flex-row'>
                                        {color.image != '' && <img src={color.image} className='w-5 h-full object-cover' />}
                                        <p className='ml-2 max-md:text-[10px]'>{color.text}</p>
                                    </div>
                                )
                        })}
                    </div>
                </div>

                <div className='w-full min-h-15 h-auto flex flex-row mt-6 ml-2'>
                    <div className='min-w-30 h-full max-md:min-w-15 '>
                        <p className='text-[15px] text-gray-500'>Size</p>
                    </div>
                    <div className='h-full max-w-[100%] flex flex-row flex-wrap'>
                        {fakeProductDetail.sizes.map((size, i) => {
                            if (i == curretSize.key) {
                                return (
                                    <div onClick={() => {
                                        if (curretSize.key == i) {
                                            setSize({ size: '', key: -1 })
                                        } else setSize({ ...size, key: i })
                                    }} key={i} className='mt-2 cursor-pointer border-[#ee4d2d] text-[#ee4d2d] ml-3 h-10 w-fit border-1  p-2 flex items-center justify-center flex-row'>
                                        <p className='ml-2 max-md:text-[12px]'>{size.size}</p>
                                    </div>
                                )
                            } else return (
                                <div onClick={() => setSize({ ...size, key: i })} key={i} className='mt-2 cursor-pointer hover:border-[#ee4d2d] hover:text-[#ee4d2d] ml-3 h-10 w-fit border-1  p-2 flex items-center justify-center flex-row'>
                                    <p className='ml-2 max-md:text-[12px] font'>{size.size}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='w-full min-h-15 h-auto flex flex-row mt-6 ml-2'>
                    <div className='min-w-30 h-full '>
                        <p className='text-[15px] text-gray-500'>Số lượng</p>
                    </div>
                    {currentColor.key == -1 || curretSize.key == -1 ? (
                        <div className='h-full flex flex-row w-100 ml-2'>
                            <div className="flex  justify-center flex-row w-7 h-7 items-center border-1  border-[#848383] ">

                                <img src={typeof MinusGray == 'string' ? MinusGray : MinusGray.src} alt="" className="w-4 h-4" />
                            </div>
                            <div className="flex  justify-center flex-row w-14 h-7 items-center border-1 border-[#848383]">
                                <p className="text-[#848383] text-[15px]">{currentQuantity}</p>
                            </div>
                            <div  className="flex  justify-center flex-row w-7 h-7 items-center border-1  border-[#848383] ">
                                <img src={typeof PlusGray == 'string' ? PlusGray : PlusGray.src} alt="" className="w-5 h-5" />
                            </div>
                        </div>
                    ) : (
                        <div className='h-full flex flex-row w-100 ml-2'>
                        <div onClick={() => QuantityHandler('minus')} className="flex  justify-center flex-row w-7 h-7 items-center border-1 hover:bg-gray-200 border-[#848383] cursor-pointer">

                            <img src={typeof MinusBlack == 'string' ? MinusBlack : MinusBlack.src} alt="" className="w-4 h-4" />
                        </div>
                        <div className="flex  justify-center flex-row w-14 h-7 items-center border-1 border-[#848383]">
                            <p className=" text-[15px]">{currentQuantity}</p>
                        </div>
                        <div onClick={() => QuantityHandler('plus')} className="flex  justify-center flex-row w-7 h-7 items-center border-1 hover:bg-gray-200 border-[#848383] cursor-pointer">
                            <img src={typeof PlusBlack == 'string' ? PlusBlack : PlusBlack.src} alt="" className="w-5 h-5" />
                        </div>
                    </div>
                )}

                </div>
                <div className="flex flex-row h-15 w-[65%] max-sm:w-full max-sm:pr-1 ml-2 items-center justify-between">
                    <ButtonLightRed onClick={IntoCartHandler} image={typeof IntoCart == 'string' ? IntoCart : IntoCart.src} text={"Thêm vào giỏ hàng"} extraClass="h-13 w-50 " />
                    <ButtonOrange onClick={BuyHandler} text={"Mua ngay"} extraClass="h-13 w-50 rounded-sm" />
                </div>

            </div>

        </div>
    );
}

export default ProductBuyingClient;