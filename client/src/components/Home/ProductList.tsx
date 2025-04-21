import React, { useEffect, useState } from "react";
import { ProductOverview } from "./FlashSale";
import Right from '../../../public/right.png'
import Left from '../../../public/left.png'

type ProductListProps = {
    product: ProductOverview[]
}
const ITEMS_PER_PAGE = 6
const ProductListMemo = ({ product }: ProductListProps) => {
    const [page, setPage] = useState(0)
    const [currentProducts, setCurrentProducts] = useState<ProductOverview[]>([])
    const [nextProducts, setNextProducts] = useState<ProductOverview[]>([])
    const [previousProducts, setPreviousProducts] = useState<ProductOverview[]>([])
    const [animDirection, setAnimDirection] = useState<'left' | 'right'>('left')
    useEffect(() => {
        setCurrentProducts(product.slice(0, ITEMS_PER_PAGE))

    }, [])
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
                            <div className={`grid grid-cols-6 gap-2 box-border `} key={`${Date.now()}  sfdsdsq`}>
                                {currentProducts.map((product, idx) => {
                                    const priceDiscount = product.price - product.price * (product.discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(product.price)
                                    return (

                                        <div key={idx} className=" flex flex-col rounded-sm text-center items-center justify-center">
                                            <div className="size-40">
                                                <img src={product.image} alt="image product" className="size-full object-cover" />
                                            </div>
                                            <p className="text-[20px] text-[#ee4d2d] line-through">{`${priceFormat}đ`}</p>
                                            <p className="text-[20px] text-[#ee4d2d]">{`${priceFormatDiscount}đ`}</p>

                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                              <div className={`grid grid-cols-6 gap-2 size-full box-border absolute slideOutRightToLeft`} key={`ác${Date.now()}  bvfdvsq`}>
                                {previousProducts.map((product, idx) => {
                                    const priceDiscount = product.price - product.price * (product.discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(product.price)
                                    console.log('priceFormat',priceFormat)

                                    return (
                                        <div key={idx} className=" flex flex-col rounded-sm text-center items-center justify-center">
                                            <div className="size-40">
                                                <img src={product.image} alt="image product" className="size-full object-cover" />
                                            </div>
                                            <p className="text-[20px] text-[#ee4d2d] line-through">{`${priceFormat}đ`}</p>
                                            <p className="text-[20px] text-[#ee4d2d]">{`${priceFormatDiscount}đ`}</p>

                                        </div>
                                    )
                                }
                                )}
                                
                            </div> 
                            <div className={`grid grid-cols-6  gap-2 box-border size-full  right-[0] slideInRightToLeft`} key={`${Date.now()}  sqwrq`}>
                                {currentProducts.map((product, idx) => {
                                    const priceDiscount = product.price - product.price * (product.discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(product.price)

                                    return (
                                        <div key={idx} className=" flex flex-col rounded-sm text-center items-center justify-center">
                                            <div className="size-40">
                                                <img src={product.image} alt="image product" className="size-full object-cover" />
                                            </div>
                                            <p className="text-[20px] text-[#ee4d2d] line-through">{`${priceFormat}đ`}</p>
                                            <p className="text-[20px] text-[#ee4d2d]">{`${priceFormatDiscount}đ`}</p>

                                        </div>
                                    )
                                })}
                                
                                

                            </div> 
                         
                        </>
                    )
                    )
                )
                    : (
                        <>
                            <div className={`grid grid-cols-6  gap-2 box-border size-full absolute slideOutLeftToRight`} key={`${Date.now()}  vssq`}>
                                {nextProducts.map((product, idx) => {
                                    const priceDiscount = product.price - product.price * (product.discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(product.price)
                                    return (
                                        <div key={idx} className=" flex flex-col rounded-sm text-center items-center justify-center">
                                            <div className="size-40">
                                                <img src={product.image} alt="image product" className="size-full object-cover" />
                                            </div>
                                            <p className="text-[20px] text-[#ee4d2d] line-through">{`${priceFormat}đ`}</p>
                                            <p className="text-[20px] text-[#ee4d2d]">{`${priceFormatDiscount}đ`}</p>

                                        </div>
                                    )
                                })}
                            </div>
                            <div className={`grid grid-cols-6 gap-2 size-full box-border  left-[0] slideInLeftToRight`} key={`${Date.now()}  sdssdfq`}>
                                {currentProducts.map((product, idx) => {
                                    const priceDiscount = product.price - product.price * (product.discount / 100)
                                    const priceFormatDiscount = new Intl.NumberFormat('vi-VN').format(priceDiscount)
                                    const priceFormat = new Intl.NumberFormat('vi-VN').format(product.price)
                                    return (
                                        <div key={idx} className=" flex flex-col rounded-sm text-center items-center justify-center">
                                            <div className="size-40">
                                                <img src={product.image} alt="image product" className="size-full object-cover" />
                                            </div>
                                            <p className="text-[20px] text-[#ee4d2d] line-through">{`${priceFormat}đ`}</p>
                                            <p className="text-[20px] text-[#ee4d2d]">{`${priceFormatDiscount}đ`}</p>

                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}


            </div>
            {page < product.length / 7 && (

                <div onClick={() => nextPage(page)} className="flex absolute top-[50%] rounded-full right-[-1.25rem] size-10 z-5 bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.2)] cursor-pointer hover:shadow-[4px_4px_8px_rgba(0,0,0,0.5)] hover:scale-150 transition-transform duration-300">
                    <img src={typeof Right == 'string' ? Right : Right.src} className="size-70% object-cover" />
                </div>
            )}
            {page > 0 && (

                <div onClick={() => prevPage(page)} className="flex absolute top-[50%] rounded-full left-[-1.25rem] size-10 z-5 bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.2)] cursor-pointer hover:shadow-[4px_4px_8px_rgba(0,0,0,0.5)] hover:scale-150 transition-transform duration-300">

                    <img src={typeof Left == 'string' ? Left : Left.src} className="size-70% object-cover" />
                </div>
            )}
        </div>
    );
}

const ProductList = React.memo(ProductListMemo)
export default ProductList;