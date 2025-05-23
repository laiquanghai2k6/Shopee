'use client'
import { useEffect, useState } from "react";
import ButtonLightRed from "../Button/ButtonLightRed";
import { useDispatch } from "react-redux";
import { useHistoryQuery } from "@/hooks/useHistoryQuery";
import ButtonOrange from "../Button/ButtonOrange";
import SpinnerShopee from "../Spinner/SpinnerShopee";
import { ConvertToVND } from "../Home/FlashSale";

type SettingRevenueProp = {
    topContent: string
}
const SettingRevenue = ({ topContent }: SettingRevenueProp) => {
    const time = Date.now();
    const formatDate = new Date(time)

    const [currentTotal, setCurrentTotal] = useState(0)
    const [dataSend, setDataSend] = useState({
        from: '',
        to: ''
    })
    const day = String(formatDate.getDate()).padStart(2, '0')
    const month = String(formatDate.getMonth() + 1).padStart(2, '0')
    const year = String(formatDate.getFullYear())
    const [date1, setDate1] = useState({
        day,
        month,
        year
    })
    const [date2, setDate2] = useState({
        day,
        month,
        year
    })

    const startQuery = () => {
        const dateFrom = `${date1.year}-${date1.month}-${date1.day}`
        const dateTo = `${date2.year}-${date2.month}-${date2.day}`
      
        setDataSend({ from: dateFrom, to: dateTo })
    }
    const histories = useHistoryQuery(dataSend.from ?? '', dataSend.to ?? '')
    useEffect(()=>{
        const total = histories.data?.reduce((prev,curr)=>{
            const price = Number(curr.total.replaceAll('.',''))
            return prev +price
        },0)
        setCurrentTotal(total ?? 0)
    },[histories.data])
    return (
        <div className="min-h-screen overflow-x-hidden w-[75%] max-md:w-[90%]  flex items-center overflow-y-auto  flex-col pb-10">
            {histories.isLoading && <SpinnerShopee />}
            <div className="h-20 select-none w-full bg-[#F8F8F8] flex items-center justify-center border-b-1">
                <p className={` text-[25px] font-bold `}>{topContent}</p>
            </div>
            <div className='flex flex-col gap-3 min-h-40 w-full items-center mt-5 '>
                <div className="flex px-[25%] w-full   max-md:gap-3 flex-row max-md:flex-col justify-between ">
                    <div className="flex flex-row w-fit  h-fit gap-3">
                        <p className='w-fit whitespace-nowrap  flex items-center '>Từ ngày:</p>
                        <select className='cursor-pointer border-1' onChange={(e) => setDate1((prev) => ({ ...prev, day: e.target.value }))} value={date1.day}>
                            {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map((v) => {
                                return (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                )
                            })}
                        </select>
                        <select className='cursor-pointer border-1' onChange={(e) => setDate1((prev) => ({ ...prev, month: e.target.value }))} value={date1.month}>
                            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((v) => {
                                return (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                )
                            })}
                        </select>
                        <select className='cursor-pointer border-1' onChange={(e) => setDate1((prev) => ({ ...prev, year: e.target.value }))} value={date1.year}>
                            {Array.from({ length: 3 }, (_, i) => String(Number(date1.year) - i)).map((v) => {
                                return (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex flex-row w-fit  h-fit gap-3">
                        <p className='w-fit whitespace-nowrap  flex items-center '>Đến ngày:</p>
                        <select className='cursor-pointer border-1' onChange={(e) => setDate2((prev) => ({ ...prev, day: e.target.value }))} value={date2.day}>
                            {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map((v) => {
                                return (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                )
                            })}
                        </select>
                        <select className='cursor-pointer border-1' onChange={(e) => setDate2((prev) => ({ ...prev, month: e.target.value }))} value={date2.month}>
                            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((v) => {
                                return (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                )
                            })}
                        </select>
                        <select className='cursor-pointer border-1' onChange={(e) => setDate2((prev) => ({ ...prev, year: e.target.value }))} value={date2.year}>
                            {Array.from({ length: 3 }, (_, i) => String(Number(date2.year) - i)).map((v) => {
                                return (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <ButtonLightRed text="Truy vấn" onClick={() => startQuery()} extraClass="p-4 w-40" />

            </div>
            {currentTotal != 0 && (
                <p className="text-[30px]  max-md:text-[20px] my-3 text-[#ee4d2d]">{`Tổng doanh thu: ${ConvertToVND(currentTotal)}đ`}</p>
            )}
            {histories.data?.length == 0 && (
                <div className="w-full flex justify-center">
                    <p className="text-[20px]">Không có đơn hàng nào</p>
                </div>
            )}
            {histories.data && (
                histories.data.map((history, i) => {
                    const total = ConvertToVND(Number(history.total.replaceAll('.', '')))
                    const dateTypeOrder = new Date(history.create_at)
                    const dateTypeReceive = new Date(typeof history.received_at == 'string' ? history.received_at : '')


                    const orderTime = {
                        day: String(dateTypeOrder.getDate() ).padStart(2, '0'),
                        month: String(dateTypeOrder.getMonth() + 1).padStart(2, '0'),
                        year: String(dateTypeOrder.getFullYear())
                    }
                    const receiveTime = {
                        day: String(dateTypeReceive.getDate() ).padStart(2, '0'),
                        month: String(dateTypeReceive.getMonth() + 1).padStart(2, '0'),
                        year: String(dateTypeReceive.getFullYear())
                    }

                    return (
                        <div key={i} className="w-full transition-transform duration-300 cursor-pointer   h-fit bg-white mt-6 flex flex-col select-none p-3">
                            <div className="w-full h-fit flex flex-row justify-end ">
                                <p className="mr-5 text-[18px]">{`Trạng thái: ${history?.state}`}</p>
                            </div>
                            {history?.userCart.map((cart, cartI) => {
                                const priceDiscountFormat = ConvertToVND(Number(cart.priceDiscount.replaceAll('.', '')))
                                const priceFormat = ConvertToVND(Number(cart.priceProduct.replaceAll('.', '')))
                                return (
                                    <div key={`cart-${cartI}`} className="w-full items-center min-h-25 h-auto mt-3 p-2 flex flex-row border-y-[1px] border-gray-300">
                                        <div className="w-[7%] min-w-15">

                                            {cart.product?.image?.length != 0 && <img src={cart.product?.image} alt="" className="size-full object-cover" />}
                                        </div>
                                        <div className="w-[80%] self-start ml-5 h-[100%] flex flex-col ">
                                            <p className="text-[17px]">{cart.product?.title}</p>
                                            <p className="text-[15px] text-gray-400">{`Phân loại:  ${cart.choosedOption}`}</p>

                                            <p className="text-[15px]">{`x ${cart.quantity}`}</p>
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
                                )
                            })}

                            <div className="flex flex-row max-md:flex-col items-center w-full h-20 justify-between">
                                <div className="flex flex-col select-text max-md:self-start">

                                    <>
                                        <p>{`Ngày đặt hàng: ${orderTime.day}-Th${orderTime.month}-${orderTime.year}`}</p>
                                        <p>{`Ngày nhận hàng: ${receiveTime.day}-Th${receiveTime.month}-${receiveTime.year}`}</p>
                                    </>


                                </div>
                                <div className="flex flex-row items-center max-md:self-end">

                                    <p className="text-[20px]">{`Tổng số tiền`}</p>

                                    <p className="text-[#ee4d2d] ml-3 text-[25px]">{`${total}đ`}</p>

                                </div>
                            </div>
                            <div className="flex flex-row p-3 max-md:p-0 max-md:mt-1 justify-end w-full">


                                <ButtonOrange text="Đã nhận hàng" extraClass="p-3 w-50" />



                            </div>
                        </div>
                    )
                })
            )}
        </div>
    );
}

export default SettingRevenue;