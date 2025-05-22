import React, { useEffect, useState, useTransition } from "react";
import { ProductOverview } from "../Home/FlashSale";
import Right from '../../../public/right.png'
import Left from '../../../public/left.png'
import ProductCardOverview from "./ProductCardOverview";
import { InfoProduct } from "../Modal/ModalProduct";

type ProductListProps = {
    product: InfoProduct[],
    Loading: Function
}

export const throttle = (callback: Function, delay: number) => {
    let lastArgs: any = null
    let shouldWait = false

    return (...args: any) => {
        if (shouldWait) {
            lastArgs = args
            return
        }
        callback(...args)
        shouldWait = true
        setTimeout(() => {
            if (lastArgs == null) {
                shouldWait = false
            } else {
                callback(...lastArgs)
                lastArgs = null
                shouldWait = false

            }
        }, delay)

    }
}

const ProductListFlashSaleMemo = ({ product, Loading }: ProductListProps) => {
    const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(6)
    const [page, setPage] = useState(0)
    const [currentProducts, setCurrentProducts] = useState<InfoProduct[]>([])
    const [nextProducts, setNextProducts] = useState<InfoProduct[]>([])
    const [previousProducts, setPreviousProducts] = useState<InfoProduct[]>([])
    const [animDirection, setAnimDirection] = useState<'left' | 'right'>('left')
    useEffect(() => {
        const width = window.innerWidth
        setITEMS_PER_PAGE(width < 768 ? 3 : 6)
    }, [])
    useEffect(() => {
        setCurrentProducts(product.slice(0, ITEMS_PER_PAGE))
        const handlerResize = (width: number) => {
            setITEMS_PER_PAGE(width < 768 ? 3 : 6)
        };
        const throttledResize = throttle(() => handlerResize(window.innerWidth), 1000);
        window.addEventListener('resize', throttledResize)
        handlerResize(window.innerWidth);
        return () => removeEventListener('resize', throttledResize)
    }, [page])
    const nextPage = (page: number) => {
        console.log('in next;')
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
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        const start = page * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        setCurrentProducts(product.slice(start, end));
    }, [ITEMS_PER_PAGE, page, product]);


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
    useEffect(() => {
        if (isPending) {
            Loading(true)
        } else Loading(false)
    }, [isPending])

    return (
        <div className="relative">
            <div className="overflow-hidden relative">

                {animDirection == 'left' ? (
                    (!previousProducts.length ? (
                        <>
                            <div className={`grid grid-cols-6 gap-2 box-border max-sm:grid-cols-3 `} key={`${Date.now()}  sfdsdsq`}>
                                {currentProducts.map((productM, idx) => {
                                    const price = Number(productM.price?.replaceAll('.', ''))
                                    const discount = Number(productM.discount?.replaceAll('.', ''))

                                    const priceDiscount = price - price * (discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(price)

                                    return (
                                        <ProductCardOverview date={productM?.timeDiscount?.toString() ?? ''} startTransition={startTransition} price={price} discount={productM.discount ?? ''} id={productM.id ?? ''} selled={productM.sold} sellNum={true} key={idx} image={productM.image ?? ''} priceFormatDiscount={priceFormat} title={productM.title ?? ''} />

                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={`grid grid-cols-6 gap-2 size-full box-border max-md:grid-cols-3 absolute slideOutRightToLeft`} key={`ác${Date.now()}  bvfdvsq`}>
                                {previousProducts.map((productM, idx) => {
                                    const price = Number(productM.price?.replaceAll('.', ''))
                                    const discount = Number(productM.discount?.replaceAll('.', ''))

                                    const priceDiscount = price - price * (discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(price)
                                    
                                    return (
                                        <ProductCardOverview date={productM?.timeDiscount?.toString() ?? ''} startTransition={startTransition} price={price} discount={productM.discount ?? ''} id={productM.id ?? ''} selled={productM.sold} sellNum={true} key={idx} image={productM.image ?? ''} priceFormatDiscount={priceFormat} title={productM.title ?? ''} />

                                    )
                                }
                                )}

                            </div>
                            <div className={`grid grid-cols-6  gap-2 box-border size-full max-md:grid-cols-3  right-[0] slideInRightToLeft`} key={`${Date.now()}  sqwrq`}>
                                {currentProducts.map((productM, idx) => {
                                    const price = Number(productM.price?.replaceAll('.', ''))
                                    const discount = Number(productM.discount?.replaceAll('.', ''))

                                    const priceDiscount = price - price * (discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(price)
                                    
                                    return (
                                        <ProductCardOverview date={productM?.timeDiscount?.toString() ?? ''} startTransition={startTransition} price={price} discount={productM.discount ?? ''} id={productM.id ?? ''} selled={productM.sold} sellNum={true} key={idx} image={productM.image ?? ''} priceFormatDiscount={priceFormat} title={productM.title ?? ''} />

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
                                {nextProducts.map((productM, idx) => {
                                    const price = Number(productM.price?.replaceAll('.', ''))
                                    const discount = Number(productM.discount?.replaceAll('.', ''))

                                    const priceDiscount = price - price * (discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(price)
                                    
                                    return (
                                        <ProductCardOverview date={productM?.timeDiscount?.toString() ?? ''} startTransition={startTransition} price={price} discount={productM.discount ?? ''} id={productM.id ?? ''} selled={productM.sold} sellNum={true} key={idx} image={productM.image ?? ''} priceFormatDiscount={priceFormat} title={productM.title ?? ''} />

                                    )
                                })}
                            </div>
                            <div className={`grid grid-cols-6 gap-2 size-full box-border max-md:grid-cols-3  left-[0] slideInLeftToRight`} key={`${Date.now()}  sdssdfq`}>
                                {currentProducts.map((product, idx) => {
                                    const price = Number(product.price?.replaceAll('.', ''))
                                    const discount = Number(product.discount?.replaceAll('.', ''))

                                    const priceDiscount = price - price * (discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(price)
                                    return (
                                        <ProductCardOverview date={product?.timeDiscount?.toString() ?? ''} startTransition={startTransition} price={price} discount={product.discount ?? ''} id={product.id ?? ''} selled={product.sold} sellNum={true} key={idx} image={product.image ?? ''} priceFormatDiscount={priceFormat} title={product.title ?? ''} />

                                    )
                                })}
                            </div>
                        </>
                    )}


            </div>
            {page < Math.floor(product.length / ITEMS_PER_PAGE) && (

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