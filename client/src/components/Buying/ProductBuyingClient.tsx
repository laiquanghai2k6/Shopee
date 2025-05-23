'use client'

import {  useState } from "react"
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
import { InfoProduct } from "../Modal/ModalProduct"
import  { UserCart, UserCartType } from "../Modal/ModalBuying"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { addUserCart } from "@/slice/userCartSlice"
import { requestHistoryCart } from "@/service/axiosRequest"
import { LoadingType, setLoading } from "@/slice/loadingSlice"

type ProductBuyingClientProps = {
    data: InfoProduct,
    openModal:Function,
    Loading:Function
}
export type ChooseOption = {
    key: number
}

const ProductBuyingClient = ({ data,openModal,Loading }: ProductBuyingClientProps) => {
    const defaultOption = Array.from({ length: data.productOptions?.length ?? 0 }, () => ({ key: -1 }));
    const [currentProductOptions, setCurrentProductOptions] = useState<ChooseOption[]>(defaultOption)
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const userId = useSelector((state:RootState)=>state.user.user.id)

    const discount = Number(data.discount)
    const now = Date.now()
    const numVouncher = new Date(String(data.timeDiscount)).getTime()
    const price = Number(data.price?.replaceAll('.', ''))
    const priceFormat = new Intl.NumberFormat('vi-VN').format(price)
    const priceDiscountFormat = new Intl.NumberFormat('vi-VN').format(price - price * (discount / 100))
    const numberDate = Date.now();
    const date = new Date(numberDate);
    const dateFuture = new Date(numberDate + 1000 * 3600 * 24 * 3);
    const dispatch = useDispatch()
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
    const IntoCartHandler  =async () => {
        const isNot = currentProductOptions.some((option) => option.key == -1)
        if (isNot) {
           return dispatch(setLoading({active:true,text:'Vui lòng điền đầy đủ',type:LoadingType.ERROR}))
        }
        const keys = currentProductOptions.map((option)=>option.key)
        const choosedOption = data.productOptions?.map((pd,i)=>{
            
            return String(pd.name)+':'+String(pd.options[keys[i]].name)
        }).join(' , ')
        const userCart:UserCart={
            product:data,
            choosedOption:choosedOption ?? '',
            priceProduct:data.price?.replaceAll('.','')??'',
            priceDiscount:String(price - price * (discount / 100)),
            quantity:currentQuantity,
            type:UserCartType.PENDING,
            userId
        }
        try {
            Loading(true)
            const res = await requestHistoryCart.post('/create-user-cart',userCart)
            console.log(res)
            dispatch(addUserCart(res.data as UserCart))
            Loading(false)
            dispatch(setLoading({active:true,text:'Đã thêm vào giỏ hàng!',type:LoadingType.SUCCESS}))
        } catch (error) {
              Loading(false)
              console.log(error)
            dispatch(setLoading({active:true,text:'Lỗi thêm vào giỏ hàng!',type:LoadingType.ERROR}))
        }
    }
    const BuyHandler = () => {
        const isNot = currentProductOptions.some((option) => option.key == -1)
        if (isNot) {
            return dispatch(setLoading({active:true,text:'Vui lòng điền đầy đủ',type:LoadingType.ERROR}))
        }
        const keys = currentProductOptions.map((option)=>option.key)
        const choosedOption = data.productOptions?.map((pd,i)=>{
            
            return String(pd.name)+':'+String(pd.options[keys[i]].name)
        }).join(' , ')
        
        const userCart:UserCart={
            product:data,
            choosedOption:choosedOption ?? '',
            priceProduct:data.price?.replaceAll('.','')??'',
            priceDiscount:String(price - price * (discount / 100)),
            quantity:currentQuantity,
            type:UserCartType.PENDING,
            userId
        }
        openModal(userCart)

    }


    return (
        <>
            <div className="w-full bg-white min-h-160 rounded-sm flex flex-row max-xl:flex-col max-xl:items-center">
                <div className="h-full w-[40%] max-xl:w-full bg-white flex p-3 items-start">
                    <img src={data.image} className='w-fit h-fit object-contain' />
                </div>
                <div className="min-h-full h-auto w-[60%] max-xl:w-full bg-whiteflex flex-col p-2">
                    <p className='text-[20px]'>{data.title}</p>
                    <div className='flex flex-row h-8'>
                        <div className='flex flex-row items-center'>
                            <p className='text-[17px] mr-1'>
                                {data.starAvg}
                            </p>
                            {Array.from({ length: Math.floor(data.starAvg ?? 0) }, (_, i) => (
                                <img key={`img:${i}`} src={typeof Star == 'string' ? Star : Star.src} className='w-3 h-3 ml-1' />
                            ))}
                            {
                                Math.floor(data.starAvg ?? 0) < (data.starAvg ?? 0) && (
                                    <img src={typeof HalfStar == 'string' ? HalfStar : HalfStar.src} className='w-3 h-3 ml-1' />

                                )
                            }
                        </div>
                        <div className='flex flex-row h-[80%] items-center ml-5 border-l-2 border-gray-200 pl-1'>
                            <p className='text-[17px] '>{`${data.response?.length} Đánh giá`}</p>
                        </div>
                        <div className='flex flex-row h-[80%] items-center ml-5 border-l-2 border-gray-200 pl-1'>
                            <p className='text-[17px] '>{`${data.sold} Đã bán`}</p>
                        </div>
                    </div>
                    <div className='h-15 w-full bg-[#fafafa] flex flex-row items-center '>
                        {discount == 0 || now > numVouncher ? (

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
                                    <p className='text-[#ee4d2d] text-[13px]'>{`-${discount}%`}</p>
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

                    <div className='w-full min-h-15 h-auto flex flex-col mt-6 ml-2'>
                        {data.productOptions?.map((productOptions, indexProductOption) => {

                            return (

                                <div key={`${indexProductOption} container`} className="flex flex-row w-fit mt-4">

                                    <div key={indexProductOption} className='min-w-30 max-md:min-w-15  h-full '>
                                        <p className='text-[15px] text-gray-500'>{productOptions.name}</p>
                                    </div>
                                    <div key={`${indexProductOption}  d`} className='h-full max-w-[100%] flex flex-row flex-wrap'>
                                        {productOptions.options.map((option, indexOption) => {
                                            if (indexOption == currentProductOptions[indexProductOption].key) {
                                                return (
                                                    <div onClick={() => {

                                                        setCurrentProductOptions((prev) => {
                                                            const temp = [...prev]
                                                            temp[indexProductOption].key = -1
                                                            return temp
                                                        })

                                                    }} key={`${indexOption} ${indexProductOption}`} className='mt-2 border-[#ee4d2d] text-[#ee4d2d] cursor-pointer ml-3 h-10 w-fit border-1 p-2 flex items-center justify-center flex-row'>
                                                        <p className='ml-2 max-md:text-[10px]'>{option.name}</p>
                                                    </div>
                                                )
                                            } else
                                                return (
                                                    <div onClick={() => {
                                                        setCurrentProductOptions((prev) => {
                                                            const temp = [...prev]
                                                            temp[indexProductOption].key = indexOption
                                                            return temp
                                                        })
                                                    }} key={`${indexOption} ${indexProductOption}`} className='mt-2 hover:border-[#ee4d2d] hover:text-[#ee4d2d] cursor-pointer ml-3 h-10 w-fit border-1 p-2 flex items-center justify-center flex-row'>
                                                        <p className='ml-2 max-md:text-[10px]'>{option.name}</p>
                                                    </div>
                                                )
                                        })}
                                    </div>
                                </div>


                            )
                        })}


                    </div >


                    <div className='w-full min-h-15 h-auto flex flex-row mt-6 ml-2'>
                        <div className='min-w-30 h-full '>
                            <p className='text-[15px] text-gray-500'>Số lượng</p>
                        </div>
                        {currentProductOptions.some((productOption) => productOption.key == -1) ? (
                            <div className='h-full flex flex-row w-100 ml-2'>
                                <div className="flex  justify-center flex-row w-7 h-7 items-center border-1  border-[#848383] ">

                                    <img src={typeof MinusGray == 'string' ? MinusGray : MinusGray.src} alt="" className="w-4 h-4" />
                                </div>
                                <div className="flex  justify-center flex-row w-14 h-7 items-center border-1 border-[#848383]">
                                    <p className="text-[#848383] text-[15px]">{currentQuantity}</p>
                                </div>
                                <div className="flex  justify-center flex-row w-7 h-7 items-center border-1  border-[#848383] ">
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
                        <ButtonLightRed onClick={IntoCartHandler} image={typeof IntoCart == 'string' ? IntoCart : IntoCart.src} text={"Thêm vào giỏ hàng"} extraClass="h-13 w-50 max-md:w-40 " />
                        <ButtonOrange onClick={BuyHandler} text={"Mua ngay"} extraClass="h-13 w-50 rounded-sm max-md:w-40 " />
                    </div>

                </div>

            </div>
        </>

    );
}

export default ProductBuyingClient;