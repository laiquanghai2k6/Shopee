'use client'

import ButtonOrange from "@/components/Button/ButtonOrange"

import ButtonLightRed from "@/components/Button/ButtonLightRed"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { HistoryCart, StateHistory } from "@/components/Modal/ModalBuying"
import { useState } from "react"
import { requestHistoryCart } from "@/service/axiosRequest"
import { LoadingType, setLoading } from "@/slice/loadingSlice"
import { updateHistory, UpdateHistory } from "@/slice/historySlice"
import SpinnerShopee from "@/components/Spinner/SpinnerShopee"
import { ConvertToVND } from "@/components/Home/FlashSale"




const History = () => {
    const histories = useSelector((state: RootState) => state.history.history)
    const [loading, Loading] = useState(false)
    const dispatch = useDispatch()
    const ConfirmReceive = async (history: HistoryCart) => {
        try {
            const updateDp:UpdateHistory = {
                historyId: history.id ?? '',
                received_at: new Date().toISOString()
            }
            const updateData={
                 historyId: history.id ?? '',
                received_at: new Date()
            }
            Loading(true)
            const t = await requestHistoryCart.patch('/update-history', updateData)
            console.log(t)
            dispatch(updateHistory(updateDp))
            Loading(false)

            dispatch(setLoading({ active: true, text: 'Cập nhật đơn hàng thành công!', type: LoadingType.SUCCESS }))

        } catch (error) {
            console.log(error)
            Loading(false)
            dispatch(setLoading({ active: true, text: 'Cập nhật đơn hàng lỗi!', type: LoadingType.ERROR }))
        }
    }
    // const BuyAgain = (title:string)=>{
    //         const slugTitle = toSlug(title)
        
    // }
    return (
        <div className="min-h-screen flex justify-center w-full bg-[#f5f5f5]">
            {loading && <SpinnerShopee />}
            <div className="w-290 min-h-100 pb-30">
                {histories.length == 0 && (
                    <div className="w-full flex justify-center">
                        <p className="text-[25px]">Chưa mua hàng nào</p>
                    </div>
                )}

                {histories.map((history, i) => {
                    const total = ConvertToVND(Number(history.total.replaceAll('.', '')))
                    const dateTypeOrder = new Date(history.create_at)
                    const timeOrderNum = dateTypeOrder.getTime()
                    let dateTypeReceive = null
                    if (history.received_at)
                        dateTypeReceive = new Date(typeof history.received_at =='string' ?history.received_at:'' )
                    const dateTypeFuture = new Date(timeOrderNum + 3600 * 1000 * 24 * 2)


                    const orderTime = {
                        day: String(dateTypeOrder.getDate() ).padStart(2, '0'),
                        month: String(dateTypeOrder.getMonth() + 1).padStart(2, '0'),
                        year: String(dateTypeOrder.getFullYear())
                    }
                    let receiveTime = null
                    if (dateTypeReceive) {
                        receiveTime = {
                            day: String(dateTypeReceive.getDate() ).padStart(2, '0'),
                            month: String(dateTypeReceive.getMonth() + 1).padStart(2, '0'),
                            year: String(dateTypeReceive.getFullYear())
                        }
                    }
                    const futureTime = {
                        day: String(dateTypeFuture.getDate() ).padStart(2, '0'),
                        month: String(dateTypeFuture.getMonth() + 1).padStart(2, '0'),
                        year: String(dateTypeFuture.getFullYear())
                    }

                    return (
                        <div key={i} className="w-full hover:scale-105 transition-transform duration-300 cursor-pointer   h-fit bg-white mt-6 flex flex-col select-none p-3">
                            <div className="w-full h-fit flex flex-row justify-end ">
                                <p className="mr-5 text-[18px]">{`Trạng thái: ${history.state}`}</p>
                            </div>
                            {history.userCart.map((cart, cartI) => {
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
                                    {history.state == StateHistory.RECEIVED && receiveTime ? (
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

                                    <p className="text-[#ee4d2d] ml-3 text-[25px]">{`${total}đ`}</p>

                                </div>
                            </div>
                            <div className="flex flex-row p-3 max-md:p-0 max-md:mt-1 justify-end w-full">
                                {history.state == StateHistory.RECEIVED ? (

                                    <ButtonOrange  text="Đã nhận hàng" extraClass="p-3 w-50" />
                                ) : (
                                    <ButtonLightRed onClick={() => {
                                        ConfirmReceive(history)
                                    }} text="Xác nhận đã nhận" extraClass="p-3 w-50" />
                                )}
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default History;