import { useRef, useState, useTransition } from "react";
import { fakeProduct } from "../Home/FlashSale";
import ProductCardOverview from "./ProductCardOverview";
import DoubleLeft from '../../../public/double-left.png'
import DoubleRight from '../../../public/double-right.png'
import { useProducts } from "@/hooks/useProducts";
import SpinnerShopee from "../Spinner/SpinnerShopee";

const SuggestProduct = () => {
    const max = 13;
    const [chosen, setChosen] = useState(1)
      const [isPending, startTransition] = useTransition()
    const scrollRef = useRef<HTMLParagraphElement>(null)
    const scrollHandler = (numChosen: number) => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        setChosen(numChosen)
    }
    const {
        data,
        fetchNextPage,
        isError,
        isFetchingNextPage
    } = useProducts()
    return (
        <>

            {(isFetchingNextPage||isPending) && <SpinnerShopee />}
            <div className="h-auto max-h-1500 overflow-y-auto w-full bg-[#f5f5f5] flex items-center flex-col">
                <div className="w-290 max-xs:w-full max-md:w-full h-auto overflow-hidden ">
                    <div className="w-full h-15 border-b-6 border-[#ee4d2d] flex items-center justify-center">
                        <p ref={scrollRef} className="text-[20px] max-md:text-[18px] text-[#ee4d2d]">GỢI Ý HÔM NAY</p>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,1fr))] gap-4 justify-center items-center select-none" id="pli">
                        {data?.pages[chosen - 1]?.product.map((product, idx) => {
                            const price = Number(product.price?.replaceAll('.', ''))
                            const priceFormat = new Intl.NumberFormat('vi-VN').format(price)
                            return (

                                <ProductCardOverview date={product?.timeDiscount?.toString() ?? ''} startTransition={startTransition} price={price} discount={product.discount ?? ''} id={product.id ?? ''} selled={product.sold} sellNum={true} key={idx} image={product.image ?? ''} priceFormatDiscount={priceFormat} title={product.title ?? ''} />
                            )

                        })}

                    </div>

                </div>
                <div className="w-120 h-15 bg-gray-200 max-md:w-[80%] mt-5 mb-5 flex flex-row items-center justify-around select-none">
                    {chosen > 3 && <img onClick={() => {

                        scrollHandler(1)
                    }} className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform duration-300" src={typeof DoubleLeft == 'string' ? DoubleLeft : DoubleLeft.src} />}
                    {chosen < 3 && chosen < max - 1 ? (
                        Array.from({ length: 5 }, (_, i) => {
                            return (
                                <div key={i} onClick={() => {
                                    scrollHandler(i + 1)
                                }} className={`h-7 w-10 ${i + 1 == chosen && 'bg-[#ee4d2d] text-white'} flex justify-center items-center cursor-pointer ${i + 1 != chosen && 'hover:bg-gray-400'} `}>
                                    {i + 1}
                                </div>
                            )
                        }
                        )
                    ) : (
                        Array.from({ length: 5 }, (_, i) => {
                            if (chosen < max - 1) {

                                return (
                                    <div key={i} onClick={() => {

                                        scrollHandler(chosen + i - 2)
                                    }} className={`h-7 w-10 ${chosen + i - 2 == chosen && 'bg-[#ee4d2d] text-white'} flex justify-center items-center cursor-pointer ${chosen + i - 2 != chosen && 'hover:bg-gray-400'} `}>
                                        {chosen + i - 2}
                                    </div>
                                )
                            }
                        })
                    )}
                    {chosen >= max - 1 && (
                        Array.from({ length: 5 }, (_, i) => {
                            return (
                                <div key={i} onClick={() => {

                                    scrollHandler(max - 4 + i)
                                }} className={`h-7 w-10 ${max - 4 + i == chosen && 'bg-[#ee4d2d] text-white'} flex justify-center items-center cursor-pointer ${max - 4 + i != chosen && 'hover:bg-gray-400'} `}>
                                    {max - 4 + i}
                                </div>
                            )
                        }
                        )
                    )}

                    {chosen < max - 2 && <img onClick={() => scrollHandler(max)} className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform duration-300" src={typeof DoubleRight == 'string' ? DoubleRight : DoubleRight.src} />}


                </div>
            </div>
        </>
    );
}

export default SuggestProduct;