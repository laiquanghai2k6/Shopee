import { useState } from "react";
import { fakeProduct } from "../Home/FlashSale";
import ProductCardOverview from "./ProductCardOverview";

const SuggestProduct = () => {
    const [chosen, setChosen] = useState(1)
    const fakeExtraProduct = [...fakeProduct, ...fakeProduct, ...fakeProduct]
    return (
        <div className="h-auto min-h-50 w-full bg-[#f5f5f5] flex items-center flex-col">
            <div className="w-290 h-auto overflow-hidden">
                <div className="w-full h-15 border-b-6 border-[#ee4d2d] flex items-center justify-center">
                    <p className="text-[20px] text-[#ee4d2d]">GỢI Ý HÔM NAY</p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 ">
                    {fakeExtraProduct.map((product, idx) => {
                        const priceFormat = new Intl.NumberFormat('vi-VN').format(product.price)
                        return (

                            <ProductCardOverview sellNum={true} key={idx} image={product.image} priceFormatDiscount={priceFormat} title={product.title} />
                        )

                    })}

                </div>

            </div>
            <div className="w-100 h-15 bg-gray-200 mt-5 mb-5 flex flex-row items-center justify-around select-none">
                {chosen < 3 ? (
                    Array.from({ length: 5 }, (_, i) => {
                        return (
                            <div key={i} onClick={()=>setChosen(i+1)} className={`h-7 w-10 ${i+1 == chosen && 'bg-[#ee4d2d] text-white'} flex justify-center items-center cursor-pointer ${i+1 != chosen && 'hover:bg-gray-400'} `}>
                                {i+1}
                            </div>
                        )
                    }
                    )
                ) : (
                    Array.from({length:5},(_,i)=>{
                        return(
                        <div key={i} onClick={()=>setChosen(chosen+i-2)} className={`h-7 w-10 ${chosen+i-2 == chosen && 'bg-[#ee4d2d] text-white'} flex justify-center items-center cursor-pointer ${chosen+i-2 != chosen && 'hover:bg-gray-400'} `}>
                            {chosen+i-2}
                        </div>
                        )
                    })
                )}



            </div>
        </div>
    );
}

export default SuggestProduct;