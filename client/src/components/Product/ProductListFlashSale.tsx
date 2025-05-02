import React, { useEffect, useState } from "react";
import { ProductOverview } from "../Home/FlashSale";
import Right from '../../../public/right.png'
import Left from '../../../public/left.png'
import ProductCardOverview from "./ProductCardOverview";

type ProductListProps = {
    product: ProductOverview[]
}

export const throttle = (callback:Function,delay:number)=>{
    let lastArgs:any = null
    let shouldWait  = false

    return(...args:any)=>{
        if(shouldWait){
            lastArgs = args
            return
        }
        callback(...args)
        shouldWait = true
        setTimeout(()=>{
            if(lastArgs == null){
                shouldWait = false
            }else {
                callback(...lastArgs)
                lastArgs = null
                shouldWait = false

            }
        },delay)
     
    }
}

const ProductListFlashSaleMemo = ({ product }: ProductListProps) => {
    const width = window.innerWidth
    const [ITEMS_PER_PAGE,setITEMS_PER_PAGE] = useState(width < 768 ? 3 : 6)
    const [page, setPage] = useState(0)
    const [currentProducts, setCurrentProducts] = useState<ProductOverview[]>([])
    const [nextProducts, setNextProducts] = useState<ProductOverview[]>([])
    const [previousProducts, setPreviousProducts] = useState<ProductOverview[]>([])
    const [animDirection, setAnimDirection] = useState<'left' | 'right'>('left')
    
    useEffect(() => {
        setCurrentProducts(product.slice(0, ITEMS_PER_PAGE))
        const handlerResize = (width: number) => {
            console.log('res')
            setITEMS_PER_PAGE(width < 768 ? 3 : 6)
        };
        const throttledResize = throttle(() => handlerResize(window.innerWidth), 1000);
        window.addEventListener('resize',throttledResize)
        handlerResize(window.innerWidth);
        return ()=>removeEventListener('resize',throttledResize)
    }, [page])
    const nextPage = (page: number) => {
        const start = (page + 1) * ITEMS_PER_PAGE

        const end = start + ITEMS_PER_PAGE
        const Products = product.slice(start, end)

        setCurrentProducts((prev) => {
            setPreviousProducts(prev)
            return Products
        })
        setPage(prev => prev + 1)
        setAnimDirection('left')

    }
    useEffect(() => {
        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        setCurrentProducts(product.slice(start, end));
    }, [ITEMS_PER_PAGE, page, product]);
    console.log(ITEMS_PER_PAGE)
    console.log(currentProducts)


    const prevPage = (page: number) => {

        const start = (page - 1) * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE
        const Products = product.slice(start, end)

        setCurrentProducts((prev) => {
            setNextProducts(prev)
            return Products
        })
        setAnimDirection('right')
        setPage(prev => prev - 1)
    }


    return (
        <div className="relative">
            <div className="overflow-hidden relative">

                {animDirection == 'left' ? (
                    (!previousProducts.length ? (
                        <>
                            <div className={`grid grid-cols-6 gap-2 box-border max-sm:grid-cols-3 `} key={`${Date.now()}  sfdsdsq`}>
                                {currentProducts.map((product, idx) => {
                                    const priceDiscount = product.price - product.price * (product.discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(product.price)
                                    return (
                                        <ProductCardOverview key={idx} image={product.image} priceFormat={priceFormat} priceFormatDiscount={priceFormatDiscount} title={product.title}/>

                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                              <div className={`grid grid-cols-6 gap-2 size-full box-border max-md:grid-cols-3 absolute slideOutRightToLeft`} key={`ác${Date.now()}  bvfdvsq`}>
                                {previousProducts.map((product, idx) => {
                                    const priceDiscount = product.price - product.price * (product.discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(product.price)

                                    return (
                                        <ProductCardOverview key={idx} image={product.image} priceFormat={priceFormat} priceFormatDiscount={priceFormatDiscount} title={product.title}/>

                                    )
                                }
                                )}
                                
                            </div> 
                            <div className={`grid grid-cols-6  gap-2 box-border size-full max-md:grid-cols-3  right-[0] slideInRightToLeft`} key={`${Date.now()}  sqwrq`}>
                                {currentProducts.map((product, idx) => {
                                    const priceDiscount = product.price - product.price * (product.discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(product.price)

                                    return (
                                        <ProductCardOverview key={idx} image={product.image} priceFormat={priceFormat} priceFormatDiscount={priceFormatDiscount} title={product.title}/>

                                    )
                                })}
                                
                                

                            </div> 
                         
                        </>
                    )
                    )
                )
                    : (
                        <>
                            <div className={`grid grid-cols-6  gap-2 box-border size-full max-md:grid-cols-3 absolute slideOutLeftToRight`} key={`${Date.now()}  vssq`}>
                                {nextProducts.map((product, idx) => {
                                    const priceDiscount = product.price - product.price * (product.discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(product.price)
                                    return (
                                        <ProductCardOverview key={idx} image={product.image} priceFormat={priceFormat} priceFormatDiscount={priceFormatDiscount} title={product.title}/>

                                    )
                                })}
                            </div>
                            <div className={`grid grid-cols-6 gap-2 size-full box-border max-md:grid-cols-3  left-[0] slideInLeftToRight`} key={`${Date.now()}  sdssdfq`}>
                                {currentProducts.map((product, idx) => {
                                    const priceDiscount = product.price - product.price * (product.discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(product.price)
                                    return (
                                        <ProductCardOverview key={idx} image={product.image} priceFormat={priceFormat} priceFormatDiscount={priceFormatDiscount} title={product.title}/>

                                    )
                                })}
                            </div>
                        </>
                    )}


            </div>
            {page < Math.floor(product.length /ITEMS_PER_PAGE )&& (

                <div onClick={() => nextPage(page)} className="flex absolute top-[50%] rounded-full right-[-1.25rem] max-md:right-1 max-md:size-7 size-10 z-5 bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.2)] cursor-pointer hover:shadow-[4px_4px_8px_rgba(0,0,0,0.5)] hover:scale-150 transition-transform duration-300">
                    <img src={typeof Right == 'string' ? Right : Right.src} className="size-70% object-cover" />
                </div>
            )}
            {page > 0 && (

                <div onClick={() => prevPage(page)} className="flex absolute top-[50%] rounded-full left-[-1.25rem] max-md:left-1 max-md:size-7 size-10 z-5 bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.2)] cursor-pointer hover:shadow-[4px_4px_8px_rgba(0,0,0,0.5)] hover:scale-150 transition-transform duration-300">

                    <img src={typeof Left == 'string' ? Left : Left.src} className="size-70% object-cover" />
                </div>
            )}
        </div>
    );
}

const ProductListFlashSale = React.memo(ProductListFlashSaleMemo)
export default ProductListFlashSale;