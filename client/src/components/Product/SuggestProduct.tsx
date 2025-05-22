import { useEffect, useRef, useState, useTransition } from "react";
import ProductCardOverview from "./ProductCardOverview";
import DoubleLeft from '../../../public/double-left.png'
import DoubleRight from '../../../public/double-right.png'
import { LIMIT_PER_PAGE, useProducts } from "@/hooks/useProducts";
import SpinnerShopee from "../Spinner/SpinnerShopee";
import { Category } from "../Home/Categories";
type SuggessProductProp = {
    category:Category
}

const SuggestProduct = ({category}:SuggessProductProp) => {
    const [max,setMax] = useState(0)
    const [chosen, setChosen] = useState(1)
      const [isPending, startTransition] = useTransition()
    const scrollRef = useRef<HTMLParagraphElement>(null)
    const scrollHandler = (numChosen: number) => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        setChosen(numChosen)
    }
    const {
        data,
        isLoading,} = useProducts(chosen,category?.id )
    useEffect(()=>{
        if(data){
            setMax(Math.ceil(data.total /LIMIT_PER_PAGE) )
        }
    },[data])
    
    return (
        <>

            {(isLoading||isPending) && <SpinnerShopee />}
            <div className="h-auto pb-20 max-h-1500 overflow-y-auto w-full bg-[#f5f5f5] flex items-center flex-col">
                <div className="w-290 max-xs:w-full max-md:w-full h-auto overflow-hidden ">
                    <div className="w-full h-15 border-b-6 border-[#ee4d2d] flex items-center justify-center">
                        <p ref={scrollRef} className="text-[20px] max-md:text-[18px] text-[#ee4d2d]">GỢI Ý HÔM NAY</p>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,1fr))] gap-4 justify-center items-center select-none" id="pli">
                        {data?.product.map((product, idx) => {
                            const price = Number(product.price?.replaceAll('.', ''))
                            const priceFormat = new Intl.NumberFormat('vi-VN').format(price)
                            return (

                                <ProductCardOverview date={product?.timeDiscount?.toString() ?? ''} startTransition={startTransition} price={price} discount={product.discount ?? ''} id={product.id ?? ''} selled={product.sold} sellNum={true} key={idx} image={product.image ?? ''} priceFormatDiscount={priceFormat} title={product.title ?? ''} />
                            )

                        })}

                    </div>

                </div>
                {category?.id == '' &&
                <div className="w-120 h-15 bg-gray-200 max-md:w-[80%] mt-5 mb-5 flex flex-row items-center justify-around select-none">
                    {chosen > 3 && <img onClick={() => {

                        scrollHandler(1)
                    }} className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform duration-300" src={typeof DoubleLeft == 'string' ? DoubleLeft : DoubleLeft.src} />}
                    {chosen < 3 && chosen < max - 1 ? (
                        Array.from({ length: Math.min(5,max) }, (_, i) => {
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
                        Array.from({ length: Math.min(max,5) }, (_, i) => {
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
                        
                        Array.from({ length: Math.min(5,max) }, (_, i) => {
                            console.log('here')
                            return (
                                <div key={i} onClick={() => {

                                    scrollHandler(max - Math.min(5,max)+1 + i)
                                }} className={`h-7 w-10 ${max - Math.min(5,max)+1 + i == chosen && 'bg-[#ee4d2d] text-white'} flex justify-center items-center cursor-pointer ${max - Math.min(5,max)+1 + i!= chosen && 'hover:bg-gray-400'} `}>
                                    {max - Math.min(5,max)+1 + i}
                                </div>
                            )
                        }
                        )
                    )}

                    {chosen < max - 2 && <img onClick={() => scrollHandler(max)} className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform duration-300" src={typeof DoubleRight == 'string' ? DoubleRight : DoubleRight.src} />}


                </div>
                }
            </div>
        </>
    );
}

export default SuggestProduct;