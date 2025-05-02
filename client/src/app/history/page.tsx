'use client'

import ButtonOrange from "@/components/Button/ButtonOrange"
import { Color, Sizes } from "../[slug]/page"
import { ConvertToVND } from "../cart/page"

export enum StateProduct {
    RECEIVED = 'Đã nhận ✅',
    DELIVERING = 'Đang giao hàng 🚚',
    CONFIRMING = 'Đang xác nhận hàng 👨‍💻'
}

export type History = {
    totalPrice: number,
    price: number
    vouncherDiscount: number,
    productDiscount: number,
    quantity: number,
    title: string,
    sizes: Sizes,
    color: Color,
    orderDay: number,
    receiveDay: number,
    state: StateProduct,
    image: string,
}


const fakeHistory: History[] = [
    {
        totalPrice: 36000000,
        price: 20000000,
        vouncherDiscount: 20,
        productDiscount: 10,
        quantity: 2,
        title: 'Laptop gaming',
        sizes: {
            size: '8 inch'
        },
        color: {
            text: 'Xanh lá'
        },
        orderDay:1746154967092,
        receiveDay: 1746414172826,
        state: StateProduct.RECEIVED,
        image: 'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    },
    {
        totalPrice: 36000000,
        price: 20000000,
        vouncherDiscount: 20,
        productDiscount: 10,
        quantity: 2,
        title: 'Laptop gaming',
        sizes: {
            size: '8 inch'
        },
        color: {
            text: 'Xanh lá'
        },
        orderDay: 1746154967092,
        receiveDay: 0,
        state: StateProduct.DELIVERING,
        image: 'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    },
]
const History = () => {
    return (
        <div className="min-h-screen flex justify-center w-full bg-[#f5f5f5]">
            <div className="w-290">

                <div className="w-full h-fit bg-white flex flex-col">
                    <div className="h-20 w-full p-5 select-none">
                        <input placeholder="Tìm kiếm đơn hàng" className="p-2 border-gray-300 focus:border-black border-[1px] bg-gray-300 outline-none size-full" />
                    </div>
                </div>
                {fakeHistory.map((history, i) => {
                    const priceDiscount = history.price - history.price * history.productDiscount / 100
                    const priceDiscountFormat = ConvertToVND(priceDiscount)
                    const priceFormat = ConvertToVND(history.price)
                    const totalPriceDiscount = history.totalPrice - history.totalPrice * history.vouncherDiscount / 100
                    const totalPriceDiscountFormat = ConvertToVND(totalPriceDiscount)
                    const totalPriceFormat = ConvertToVND(history.totalPrice)
                    const dateTypeOrder = new Date(history.orderDay)
                    const dateTypeReceive = new Date(history.receiveDay)
                    const dateTypeFuture = new Date(history.orderDay+3600*1000*24*2)
                    console.log('dateTypeOrder',dateTypeOrder)
                    console.log('dateTypeReceive',dateTypeReceive)

                    console.log('dateTypeFuture',dateTypeFuture)

                    const orderTime = {
                        day: String(dateTypeOrder.getDate()+1).padStart(2, '0'),
                        month: String(dateTypeOrder.getMonth()+1).padStart(2, '0'),
                        year: String(dateTypeOrder.getFullYear())
                    }
                    const receiveTime = {
                        day: String(dateTypeReceive.getDate()+1).padStart(2, '0'),
                        month: String(dateTypeReceive.getMonth()+1).padStart(2, '0'),
                        year: String(dateTypeReceive.getFullYear())
                    }
                    const futureTime = {
                        day: String(dateTypeFuture.getDate()+1).padStart(2, '0'),
                        month: String(dateTypeFuture.getMonth()+1).padStart(2, '0'),
                        year: String(dateTypeFuture.getFullYear())
                    }
                    
                    return (
                        <div key={i} className="w-full hover:scale-105 transition-transform duration-300 cursor-pointer   h-fit bg-white mt-6 flex flex-col select-none p-3">
                            <div className="w-full h-fit flex flex-row justify-end ">
                                <p className="mr-5 text-[18px]">{`Trạng thái: ${history.state}`}</p>
                            </div>
                            <div className="w-full items-center min-h-25 h-auto mt-3 p-2 flex flex-row border-y-[1px] border-gray-300">
                                <div className="w-[7%] min-w-15">

                                    <img src={history.image} alt="" className="size-full object-cover" />
                                </div>
                                <div className="w-[80%] self-start ml-5 h-[100%] flex flex-col ">
                                    <p className="text-[17px]">{history.title}</p>
                                    {history.sizes.size != '' && history.color.text != '' ?

                                        (

                                            <p className="text-[15px] text-gray-400">{`Phân loại:  ${history.color.text}, ${history.sizes.size}`}</p>
                                        ) : (
                                            history.sizes.size != '' || history.color.text != '' ? (
                                                <p className="text-[15px] text-gray-400">{`Phân loại:  ${history.color.text != '' ? history.color.text : history.sizes.size}`}</p>

                                            ) : (
                                                <></>
                                            )
                                        )}
                                    <p className="text-[15px]">{`x ${history.quantity}`}</p>
                                </div>
                                <div className="flex grow-1 flex-col  ml-3">
                                    {priceDiscountFormat != priceFormat ? (
                                        <>
                                            <p className="line-through text-gray-400">{`${priceFormat}đ`}</p>
                                            <p className="text-[#ee4d2d] text-[17px]">{`${priceDiscountFormat}đ`}</p>
                                        </>

                                    ) : (
                                        <p className="text-[#ee4d2d] text-[17px]">{`${priceFormat}đ`}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-row max-md:flex-col items-center w-full h-20 justify-between">
                                <div className="flex flex-col select-text max-md:self-start">
                                    {history.state == StateProduct.RECEIVED ? (
                                        <>
                                            <p>{`Ngày đặt hàng: ${orderTime.day}-Th${orderTime.month}-${orderTime.year}`}</p>
                                            <p>{`Ngày nhận hàng: ${receiveTime.day}-Th${receiveTime.month}-${receiveTime.year}`}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p>{`Ngày đặt hàng: ${orderTime.day}-Th${orderTime.month}-${orderTime.year}`}</p>
                                            <p>{`Ngày nhận hàng dự kiến: ${futureTime.day}-Th${futureTime.month}-${futureTime.year}`}</p>
                                        </>
                                    )}

                                </div>
                                <div className="flex flex-row items-center max-md:self-end">

                                    <p className="text-[20px]">{`Tổng số tiền`}</p>
                                    {totalPriceDiscountFormat != totalPriceFormat ? (
                                        <>
                                            <p className="ml-3 line-through text-gray-400">{`${totalPriceFormat}đ`}</p>
                                            <p className="text-[#ee4d2d] ml-3 text-[25px]">{`${totalPriceDiscountFormat}đ`}</p>
                                        </>

                                    ) : (
                                        <p className="text-[#ee4d2d] ml-3 text-[25px]">{`${totalPriceFormat}đ`}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-row p-3 max-md:p-0 max-md:mt-1 justify-end w-full">
                                <ButtonOrange text="Mua lại" extraClass="p-3 w-50" />
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default History;