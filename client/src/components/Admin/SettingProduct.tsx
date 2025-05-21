'use client'
import { useSelector } from "react-redux";
import Input from "../Input/Input";
import { RootState } from "@/store/store";
import Plus from '../../../public/plus-black.png'
import ModalCategory from "../Modal/ModalCategory";
import { useCallback, useState } from "react";
import ModalProduct from "../Modal/ModalProduct";
import Add from '../../../public/Add.png'
import { useProducts } from "@/hooks/useProducts";
import { ConvertToVND } from "@/app/cart/page";
import SpinnerShopee from "../Spinner/SpinnerShopee";
type SettingProductProps = {
    topContent: string
}

const SettingProduct = ({ topContent }: SettingProductProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const [modal, setModal] = useState({
        active: false,
        index: -1,
        
        type: 'change'
    })
    const [indexPage,setIndexPage] = useState(0)
    const [modalProduct, setModalProduct] = useState({
        active: false,
        indexProduct:-1,
        indexPage:-1,
        type: 'create',
        id:''
    })
    const Categories = useSelector((state: RootState) => state.categories.category)
    const CloseModal = useCallback(() => {
        setModal((prev) => ({ ...prev, active: false }))
    }, [])
    const CloseModalProduct = useCallback(() => {
        setModalProduct((prev) => ({ ...prev, active: false }))
    }, [])
    const {
        data,
        fetchNextPage,
        isError,
        isFetchingNextPage
    } = useProducts()
    

    return (
        <>
            {isLoading && <SpinnerShopee />}
            {modal.active && <ModalCategory setIsLoading={setIsLoading} type={modal.type} CloseModal={CloseModal} categories={Categories} currentIndex={modal.index} />}
            {modalProduct.active && <ModalProduct setIsLoading={setIsLoading}  id={modalProduct.id} data={data} indexProduct={modalProduct.indexProduct} indexPage={modalProduct.indexPage} categories={Categories} type={modalProduct.type} CloseModal={CloseModalProduct} />}
            <div className="min-h-screen w-[75%] bg-[#f5f5f5] flex items-center overflow-y-auto  flex-col pb-10">

                <div className="h-20 select-none w-full bg-[#F8F8F8] flex items-center justify-center border-b-1">
                    <p className={` text-[25px] font-bold `}>{topContent}</p>
                </div>
                <div className="w-full select-none bg-[#f5f5f5]  min-h-300 p-5">
                    <Input extraClassParent="select-none" placeholder="Tìm kiếm sản phẩm" />
                    <div className="w-full min-h-10 py-2 flex gap-2 flex-row flex-wrap mt-3">
                        <>
                            {Categories.map((category, i) => {
                                return (

                                    <div key={i} onClick={() => {
                                        setModal({ active: true, index: i, type: 'change' })
                                    }} className="w-fit h-15 rounded-lg flex flex-col items-center justify-center border-1 p-2 cursor-pointer hover:bg-[rgba(0,0,0,0.05)]">
                                        {category.image && <img src={category.image } className="size-8" />}
                                        <p>{category.name}</p>
                                    </div>

                                )
                            })}
                            <div onClick={() => {
                                setModal({ active: true, index: -1, type: 'create' })
                            }} className="w-fit h-15 rounded-lg flex items-center gap-2 justify-center border-1 p-2 cursor-pointer hover:bg-[rgba(0,0,0,0.05)]">
                                <img src={typeof Plus == 'string' ? Plus : Plus.src} className="size-4" />
                                <p>Thêm thể loại</p>
                            </div>
                        </>
                    </div>
                    <div className="grid  mt-5 grid-cols-[repeat(auto-fit,_minmax(160px,1fr))] gap-4 justify-center items-center select-none" id="plis">
                        <div onClick={() => { setModalProduct({ active: true,id:'',indexProduct:-1, type: 'create',indexPage:-1 }) }} className="flex flex-col size-full rounded-sm text-center items-center bg-white  justify-center  cursor-pointer hover:border-1 hover:border-[#ee4d2d]'} ">
                            <div className="size-40 max-md:size-30 flex justify-center items-center flex-col">
                                <img src={typeof Add == 'string' ? Add : Add.src} className="size-[50%]" />
                                <p>Thêm sản phẩm</p>
                            </div>

                        </div>
                        {
                            data?.pages[indexPage].product.map((produc, i) => {
                               
                                const price = Number(produc.price?.replaceAll('.',''))
                                const priceFormat = ConvertToVND(price)
                                const time = Date.now()
                                const dicount = Number(produc.discount)
                                const future = new Date(produc.timeDiscount??'').getTime() 
                                const discountPrice = price - (price/100)* (dicount ?? 0)
                                const discountFormat = ConvertToVND(discountPrice)
                               
                                return (

                                    <div onClick={()=>{setModalProduct({ active: true, id:produc.id ?? '',indexProduct:i,indexPage:indexPage ,type: 'change' })}} key={`product${i}`} className="flex flex-col size-full rounded-sm text-center items-center bg-white  justify-center  cursor-pointer hover:border-1 hover:border-[#ee4d2d]'} ">
                                        <div className="size-40 max-md:size-30 " >
                                            <img src={produc.image} alt="image product" className="size-full object-cover" />
                                        </div>
                                        <p >{produc.title}</p>
                                        <div className="flex flex-col">
                                            {time < future && dicount!= 0 ?(
                                                <>
                                                <p className="text-[20px] text-[#ee4d2d] line-through">{`${priceFormat}đ`}</p>
                                                <p className="text-[20px] text-[#ee4d2d]">{`${discountFormat}đ`}</p>
                                                <p className="text-[15px]  ">{`${produc.remain} đã bán`}</p>
                                                </>
                                            ):(
                                                <>
                                                <p className="text-[20px] text-[#ee4d2d]">{`${priceFormat}đ`}</p>
                                                <p className="text-[15px]  ">{`${produc.remain} đã bán`}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )
                            })


                        }

                    </div>

                </div>
            </div>
        </>
    );
}

export default SettingProduct;