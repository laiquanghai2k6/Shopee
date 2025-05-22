'use client'
import { useRouter } from "next/navigation";
import ButtonOrange from "../Button/ButtonOrange";
import { ProductOverview } from "../Home/FlashSale";
import { EventHandler, MouseEvent, useEffect, useState, useTransition } from "react";
import { InfoProduct } from "./ModalProduct";
import { UserCart } from "./ModalBuying";
import { ConvertToVND } from "@/app/cart/page";
import { toSlug } from "../Product/ProductCardOverview";
import SpinnerShopee from "../Spinner/SpinnerShopee";

type ModalCartProps = {
    productCart: UserCart[],
    closeModalCart: Function,
    openCartModal: boolean,
    Loading: Function
}

const ModalCart = ({ productCart, Loading, openCartModal, closeModalCart }: ModalCartProps) => {
    const [shouldRenderCart, setShouldRenderCart] = useState(false);
    const [isPending, startTransition] = useTransition()
    useEffect(() => {
        if (openCartModal) {
            setShouldRenderCart(true);
        } else {
            const timeout = setTimeout(() => setShouldRenderCart(false), 100);
            return () => clearTimeout(timeout);
        }
    }, [openCartModal]);
    const router = useRouter()
    const ViewProduct = (title: string, id: string) => {
        const slugTitle = toSlug(title)
        closeModalCart()
        startTransition(() => {
            router.push(`/${slugTitle}-${id}`)
        })
    }
    const GoToCart = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        closeModalCart()
        startTransition(() => {
            router.push(`/cart`)
        })
    }
    useEffect(() => {
        if (isPending) {
            Loading(true)

        } else Loading(false)
    }, [isPending])
    return (
        <>
            {shouldRenderCart && (<div className={`${openCartModal == false ? 'disappearCart' : ' appearCart'} absolute shadow-[0px_0px_7px_rgba(0,0,0,0.2)] w-100 min-h-30 bg-white rounded-sm transition-all right-0 max-md:right-[-50%] top-[65%] origin-top-right transform translate-x-[-16px] translate-y-[8px] z-1000  `}>
                <div className="flex flex-col">
                    <div className="flex max-h-100 overflow-y-auto flex-col">
                        {productCart.map((item, i) => {
                            const now = Date.now()
                            const numVouncher = new Date(String(item?.product?.timeDiscount)).getTime()
                            const priceFormat = ConvertToVND(Number(item?.priceProduct.replaceAll('.', '')))
                            const discountFormat = ConvertToVND(Number(item?.priceDiscount.replaceAll('.', '')))
                            return (
                                <div key={i} onClick={() => ViewProduct(item?.product?.title ?? 'Error', item?.product?.id ?? 'error')} className="flex p-2 cursor-pointer hover:bg-[rgba(0,0,0,0.2)] flex-row items-center justify-between h-fit min-h-20  w-full">
                                    <div className="h-15 w-[15%] ">
                                        <img src={item?.product?.image} className="object-cover h-full w-full" />
                                    </div>
                                    <div className="justify-start max-w-[60%] w-60 h-fit ml-3">{item?.product?.title}</div>

                                    <div className="min-w-[25%] h-full flex flex-row items-center  ">
                                        <div className={`w-full flex flex-col justify-center items-center `}>

                                            {discountFormat != priceFormat && now < numVouncher ? (
                                                <>
                                                    <p className={`text-[15px] text-[#ee4d2d] line-through`}>
                                                        {`${priceFormat}đ`}
                                                    </p>
                                                    <p className="text-[15px] text-[#ee4d2d] ">
                                                        {`${discountFormat}đ`}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-[15px] text-[#ee4d2d] ">
                                                    {`${priceFormat}đ`}
                                                </p>
                                            )}

                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    {productCart.length == 0 ? (
                        <div className="cursor-default flex flex-col p-2 w-full h-30 items-center justify-between">

                            <p className="text-[15px]">{`Giỏ hàng trống`}</p>
                            <ButtonOrange extraClass="p-3 ml-auto" text="Xem giỏ hàng" onClick={(e) => GoToCart(e)} />
                        </div>

                    ) : (
                        <div className="cursor-default flex flex-row p-2 w-full h-30 items-center justify-between">
                            <p className="text-[15px]">{`${productCart.length} Thêm vào giỏ hàng`}</p>
                            <ButtonOrange extraClass="p-3" text="Xem giỏ hàng" onClick={(e) => GoToCart(e)} />
                        </div>
                    )}
                </div>
            </div>
            )}
        </>

    );
}

export default ModalCart;