'use client'
import CartItem from "@/components/Cart/CartItem"
import { Color, Sizes } from "../[slug]/page"
import { useCallback, useEffect, useState } from "react"
import ButtonOrange from "@/components/Button/ButtonOrange"
import Memeguy from '../../../public/meme-guy.png'
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
export type CartProps = {

}
const CartItems: ProductCart[] = [
    {
        id: '1',
        title: 'Quần áo',
        price: 20000000,
        discount: 10,
        image: 'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain',
        quantity: 1,
        sizes: [
            { size: 'Size S < 46Kg' },
            { size: 'Size M < 53kg' }
        ],
        colors: [
            { image: 'https://i.ibb.co/WNvHzvxX/image.png', text: 'Trắng - Tay dài' },
            { image: 'https://i.ibb.co/Gv1vJYQ7/image.png', text: 'Đen - Tay ngắn' },
            { image: '', text: 'Xám - Tay ngắn' },
            { image: 'https://i.ibb.co/WNvHzvxX/image.png', text: 'Trắng - Tay dài' },
            { image: 'https://i.ibb.co/Gv1vJYQ7/image.png', text: 'Đen - Tay ngắn' },
            { image: '', text: 'Xám - Tay ngắn' },
        ],
        sizeChosen: { size: 'Size M < 53kg', key: 1 },
        colorsChoson: { image: 'https://i.ibb.co/Gv1vJYQ7/image.png', text: 'Đen - Tay ngắn', key: 1 },
    },
    {
        id: '2',
        title: 'Quần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áoQuần áosv',
        price: 20000000,
        discount: 10,
        image: 'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain',
        quantity: 1,
        sizes: [
            { size: 'Size S < 46Kg' },
            { size: 'Size M < 53kg' }
        ],
        colors: [
            { image: 'https://i.ibb.co/WNvHzvxX/image.png', text: 'Trắng - Tay dài' },
            { image: 'https://i.ibb.co/Gv1vJYQ7/image.png', text: 'Đen - Tay ngắn' },
            { image: '', text: 'Xám - Tay ngắn' },
            { image: 'https://i.ibb.co/WNvHzvxX/image.png', text: 'Trắng - Tay dài' },
            { image: 'https://i.ibb.co/Gv1vJYQ7/image.png', text: 'Đen - Tay ngắn' },
            { image: '', text: 'Xám - Tay ngắn' },
            { image: 'https://i.ibb.co/WNvHzvxX/image.png', text: 'Trắng - Tay dài' },
            { image: 'https://i.ibb.co/Gv1vJYQ7/image.png', text: 'Đen - Tay ngắn' },

        ],
        sizeChosen: { size: 'Size S < 46Kg', key: 0 },
        colorsChoson: { image: 'https://i.ibb.co/WNvHzvxX/image.png', text: 'Trắng - Tay dài', key: 0 },
    },
]
const keyArraySize: number[] = []
const keyArrayColor: number[] = []
export const ConvertToVND = (num: number) => {
    const strFormat = new Intl.NumberFormat('vi-VN').format(num)
    return strFormat
}
const Cart = () => {
    const [itemChecked, setItemCheck] = useState<Choose>({ checkAll: false, status: [] })
    const [total, setTotal] = useState<number>(0)
    useEffect(() => {
        CartItems.map((item) => {
            if (typeof item.colorsChoson.key == 'number') {
                keyArrayColor.push(item.colorsChoson.key)
            }
            if (typeof item.sizeChosen.key == 'number') {
                console.log(item.sizeChosen.key)

                keyArraySize.push(item.sizeChosen.key)

            }
        })

        const defaultCheck = []
        for (let i = 0; i < CartItems.length; i++) {
            defaultCheck.push(false)

        }

        setItemCheck({ checkAll: false, status: [...defaultCheck] })
    }, [])


    const [cartItems, setCartItems] = useState<ProductCart[]>(CartItems)

    const deleteCartItem = useCallback((id: string) => {
        const temp = cartItems.filter((item) => item.id != id)

        setCartItems(temp)
    }, [cartItems])
    useEffect(() => {
        let newTotal = 0
        console.log(itemChecked.status)
        itemChecked.status.forEach((sts, i) => {
            if (sts) {
                const item = cartItems[i]
                newTotal += (item.price - (item.price / 100) * item.discount) * item.quantity


            }
        })
        console.log('inhere:', cartItems)
        setTotal(newTotal)
    }, [cartItems, itemChecked.status])
    const increaseItem = useCallback((id: string) => {
        setCartItems((prev) => {
            return prev.map((item) => {
                return item.id == id ? { ...item, quantity: item.quantity + 1 } : item
            })
        })
    }, [cartItems])
    const decreaseItem = useCallback((id: string) => {
        setCartItems((prev) => {
            return prev.map((item) => {
                return item.id == id ? { ...item, quantity: item.quantity - 1 } : item
            })
        })
    }, [cartItems])

    const ConfirmBuy = () => {

    }

    return (
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
                                        <CartItem deleteCartItem={deleteCartItem} increaseItem={increaseItem} decreaseItem={decreaseItem} isCheck={itemChecked.status[i]} setItemCheck={setItemCheck} setCartItems={setCartItems} item={item} i={i} key={`Cart:${i}`} />
                                    )
                                })}
                            </div>

                        </div>

                        <div className="w-full h-20 bg-white flex flex-row justify-between max-md:justify-around items-center">
                            <div className="flex flex-row ml-13 max-md:ml-1">

                                <input type="checkbox" checked={itemChecked.checkAll} onChange={() => setItemCheck((prev) => {
                                    if (prev.checkAll) {

                                        const falseTemp = itemChecked.status.map((_, i) => false)
                                        return { checkAll: false, status: [...falseTemp] }

                                    } else {
                                        const trueTemp = itemChecked.status.map((_, i) => true)
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
                        <img src={typeof Memeguy == 'string' ? Memeguy : Memeguy.src} className="size-30"/>
                        <p className="mt-5 text-[17px]">Giỏ hàng chưa có sản phẩm nào</p>
                    </div>
                )}


            </div>
        </div>
    )
}

export default Cart