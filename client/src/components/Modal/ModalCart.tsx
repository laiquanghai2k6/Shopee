'use client'
import { useRouter } from "next/navigation";
import ButtonOrange from "../Button/ButtonOrange";
import { ProductOverview } from "../Home/FlashSale";
import { EventHandler, MouseEvent, useEffect, useState } from "react";

type ModalCartProps = {
    productCart: ProductOverview[],
    closeModalCart: Function,
    openCartModal: boolean
}

const ModalCart = ({ productCart, openCartModal, closeModalCart }: ModalCartProps) => {
    const [shouldRenderCart, setShouldRenderCart] = useState(false);

    useEffect(() => {
        if (openCartModal) {
            setShouldRenderCart(true);
        } else {
            const timeout = setTimeout(() => setShouldRenderCart(false), 100);
            return () => clearTimeout(timeout);
        }
    }, [openCartModal]);
    const router = useRouter()
    const ViewProduct = (title: string) => {
        closeModalCart()
        router.push(`/${title}`)
    }
    const GoToCart = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        closeModalCart()
        router.push(`/cart`)
    }
    console.log('im closing')
    return (
        <>
       {shouldRenderCart && (<div className={`${openCartModal == false ? 'disappearCart' : ' appearCart'} absolute shadow-[0px_0px_7px_rgba(0,0,0,0.2)] w-100 min-h-30 bg-white rounded-sm transition-all right-0 max-md:right-[-50%] top-[90%] origin-top-right transform translate-x-[-16px] translate-y-[8px] z-1000  `}>
            <div className="flex flex-col">
                <div className="flex max-h-100 overflow-y-auto flex-col">
                    {productCart.map((item, i) => {
                        const priceFormat = new Intl.NumberFormat('vi-VN').format(item.price)
                        let priceDiscountFormat = ""
                        if (item.discount > 0) {
                            const discount = item.price - item.price * item.discount / 100
                            priceDiscountFormat = new Intl.NumberFormat('vi-VN').format(discount)
                        }
                        return (
                            <div key={i} onClick={() => ViewProduct(item.title)} className="flex p-2 cursor-pointer hover:bg-[rgba(0,0,0,0.2)] flex-row items-center justify-between h-20  w-full">
                                <div className="h-15 w-[15%] ">
                                    <img src={item.image} className="object-cover h-full w-full" />
                                </div>
                                <div className="justify-start max-w-[60%] w-60 ml-3">{item.title}</div>

                                <div className="min-w-[25%] h-full flex flex-row items-center  ">
                                    <div className={`w-full flex flex-col justify-center items-center `}>

                                        <p className={`text-[15px] text-[#ee4d2d] ${priceDiscountFormat != "" && 'line-through'}`}>
                                            {`${priceFormat}đ`}
                                        </p>
                                        {priceDiscountFormat != "" &&
                                            <p className="text-[15px] text-[#ee4d2d] ">
                                                {`${priceDiscountFormat}đ`}
                                            </p>
                                        }
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>

                <div className="cursor-default flex flex-row p-2 w-full h-15 items-center justify-between">
                    <p className="text-[15px]">{`${productCart.length} Thêm vào giỏ hàng`}</p>
                    <ButtonOrange extraClass="p-3" text="Xem giỏ hàng" onClick={(e) => GoToCart(e)} />
                </div>
            </div>
        </div>
        )}
        </>

    );
}

export default ModalCart;