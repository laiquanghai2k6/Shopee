'use client'

import { useTransition } from "react";
import { InfoProduct } from "../Modal/ModalProduct";
import ProductCardOverview from "./ProductCardOverview";
import SpinnerShopee from "../Spinner/SpinnerShopee";

type SearchClientProps = {
    products: InfoProduct[],
    title:string
}

const SearchClient = ({ products ,title}: SearchClientProps) => {
          const [isPending, startTransition] = useTransition()
    
    return (
        <div className="min-h-screen overflow-auto w-full flex bg-[#f5f5f5] justify-center">
            {(isPending) && <SpinnerShopee />}
            <div className='w-290 h-fit min-h-20 bg-[#f5f5f5] pb-20'>
                <p className="text-[25px] my-3">{`Tìm kiếm: ${title}`}</p>
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,1fr))] gap-4 justify-center items-center select-none" id="pli">
                    {products.map((product, idx) => {
                        const price = Number(product.price?.replaceAll('.', ''))
                        const priceFormat = new Intl.NumberFormat('vi-VN').format(price)
                        return (

                            <ProductCardOverview date={product?.timeDiscount?.toString() ?? ''} startTransition={startTransition} price={price} discount={product.discount ?? ''} id={product.id ?? ''} selled={product.sold} sellNum={true} key={idx} image={product.image ?? ''} priceFormatDiscount={priceFormat} title={product.title ?? ''} />
                        )

                    })}

                </div>
            </div>
        </div>
    );
}

export default SearchClient;