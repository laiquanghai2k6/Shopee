'use client'
import CartItem from "@/components/Cart/CartItem"
import { Color, Sizes } from "../[slug]/page"
import {  useEffect, useState } from "react"
import ButtonOrange from "@/components/Button/ButtonOrange"
import Memeguy from '../../../public/meme-guy.png'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import ModalBuying, { UserCart } from "@/components/Modal/ModalBuying"
import { decreaseQuantity, deleteUserCart, increaseQuantity } from "@/slice/userCartSlice"
import { requestHistoryCart } from "@/service/axiosRequest"
import SpinnerShopee from "@/components/Spinner/SpinnerShopee"
import { LoadingType, setLoading } from "@/slice/loadingSlice"
export type ProductCart = {
    id: string,
    title: string,
    price: number,
    discount: number,
    image: string,
    quantity: number,
    sizes: Sizes[],
    colors: Color[],
    sizeChosen: Sizes,
    colorsChoson: Color

}
export type totalPrice = {
    numberPrice: number,
    formatPrice: string,
    id: string
}
export type Choose = {
    status: boolean[],
    checkAll: boolean
}

export const ConvertToVND = (num: number) => {
    const strFormat = new Intl.NumberFormat('vi-VN').format(num)
    return strFormat
}
type totalCartModal = {
    active: boolean,
    totalCart: UserCart[]
}

const Cart = () => {
    const [itemChecked, setItemCheck] = useState<Choose>({ checkAll: false, status: [] })
    const [total, setTotal] = useState<number>(0)
    const [init, setInit] = useState(false)
    const cartItems = useSelector((state: RootState) => state.userCart.userCart)
    const [loading, Loading] = useState(false)
    const [totalCartModal, setTotalCartModal] = useState<totalCartModal>({
        active: false,
        totalCart: []
    })
    useEffect(() => {
        if (!init && cartItems.length > 0) {
            const t = Array.from({ length: cartItems.length }, () => false)
            setItemCheck({ checkAll: false, status: t })
            setInit(true)

        }
    }, [cartItems.length])
    const dispatch = useDispatch()




    useEffect(() => {
        let newTotal = 0
        itemChecked.status.forEach((sts, i) => {
            if (sts) {
                newTotal += Number(cartItems[i].priceDiscount) * cartItems[i].quantity

            }
        })
        setTotal(newTotal)
    }, [cartItems, itemChecked.status])
    const increaseItem = (id: string) => {

        dispatch(increaseQuantity(id))

    }
    const decreaseItem = (id: string) => {
        dispatch(decreaseQuantity(id))
    }
    const deleteHandler = async (id: string, i: number) => {
        try {
            Loading(true)
            await requestHistoryCart.delete(`/delete-user-cart?id=${id}`)
            dispatch(deleteUserCart([id]))

            setItemCheck((prev: Choose) => {
                const temp = [...prev.status]
                temp.splice(i, 1)
                return { ...prev, status: temp }

            })
            Loading(false)
            dispatch(setLoading({ active: true, text: 'Xóa sản phẩm thành công!', type: LoadingType.SUCCESS }))
        } catch (e) {
            console.log(e)
            Loading(false)
            dispatch(setLoading({ active: true, text: 'Xóa sản phẩm lỗi!', type: LoadingType.ERROR }))
        }
    }
    const ConfirmBuy = () => {
        if (total == 0) return dispatch(setLoading({active:true,text:'Vui lòng chọn sản phẩm',type:LoadingType.ERROR}))
        const userCarts = itemChecked.status.reduce((prev: UserCart[], curr, i) => {
            if (curr) {
                prev.push(cartItems[i])
            }
            return prev

        }, [])
        setTotalCartModal({ active: true, totalCart: userCarts })
    }
    const closeModal = (type?: string) => {
        if (type == 'finish') {
            setItemCheck({ checkAll: false, status: [] })
            setTotal(0)
            setInit(false)
            setTotalCartModal({
                active: false,
                totalCart: []
            })
        } else {

        }
        setTotalCartModal((prev) => ({ ...prev, active: false }))
    }
    return (
        <>
            {loading && <SpinnerShopee />}
            {totalCartModal.active && <ModalBuying closeModal={closeModal} userCart={totalCartModal.totalCart} />}
            <div className="min-h-screen h-auto bg-[#f5f5f5] flex justify-center select-none">
                <div className="w-290 max-md:w-full flex flex-col">
                    <div className="w-full bg-white mt-2 rounded-sm h-15 p-2 flex flex-row justify-between items-center">
                        <div className="w-[50%] h-full flex items-center ml-5">
                            <p>Sản phẩm</p>
                        </div>
                        <div className="w-[50%] max-md:hidden h-full flex items-center justify-between mr-2">
                            <div className="w-[25%] flex justify-center items-center">
                                <p className="text-[#888] ">Đơn Giá</p>
                            </div>
                            <div className="w-[25%] flex justify-center items-center">
                                <p className="text-[#888] ">Số Lượng</p>
                            </div>
                            <div className="w-[25%] flex justify-center items-center">
                                <p className="text-[#888] ">Số Tiền</p>
                            </div>
                            <div className="w-[25%] flex justify-center items-center">
                                <p className="text-[#888] ">Thao Tác</p>
                            </div>
                        </div>
                    </div>
                    {cartItems.length > 0 ? (
                        <>
                            <div className="w-full bg-white mt-2 rounded-sm min-h-20 flex flex-col">
                                <div className="p-5">
                                    {cartItems.map((item, i) => {
                                        return (
                                            <CartItem deleteHandler={deleteHandler} increaseItem={increaseItem} decreaseItem={decreaseItem} isCheck={itemChecked.status[i]} setItemCheck={setItemCheck} item={item} i={i} key={`Cart:${i}`} />
                                        )
                                    })}
                                </div>

                            </div>

                            <div className="w-full h-20 bg-white flex flex-row justify-between max-md:justify-around items-center">
                                <div className="flex flex-row ml-13 max-md:ml-1">

                                    <input type="checkbox" checked={itemChecked.checkAll} onChange={() => setItemCheck((prev) => {
                                        if (prev.checkAll) {

                                            const falseTemp = itemChecked.status.map(() => false)
                                            return { checkAll: false, status: [...falseTemp] }

                                        } else {
                                            const trueTemp = itemChecked.status.map(() => true)
                                            return { checkAll: true, status: [...trueTemp] }
                                        }

                                    })} className="size-5 accent-[#ee4d2d]" />
                                    <p className="ml-3 ">Chọn tất cả</p>
                                </div>
                                <div className="flex items-center flex-row ">
                                    <p className="mr-5 text-[30px] max-md:text-[15px] text-[#ee4d2d]">{`${ConvertToVND(total)}đ`}</p>
                                    <ButtonOrange onClick={() => ConfirmBuy()} text="Xác nhận" extraClass="p-3 w-60 max-md:w-30" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-100 w-full bg-white mt-5 rounded-sm flex flex-col items-center justify-center">
                            <img src={typeof Memeguy == 'string' ? Memeguy : Memeguy.src} className="size-30" />
                            <p className="mt-5 text-[17px]">Giỏ hàng chưa có sản phẩm nào</p>
                        </div>
                    )}


                </div>
            </div>
        </>

    )
}

export default Cart