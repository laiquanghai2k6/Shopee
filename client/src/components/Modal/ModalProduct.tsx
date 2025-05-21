'use client'
import { Fragment, useCallback, useRef, useState } from 'react'
import Close from '../../../public/close.png'
import Input from '../Input/Input'
import Add from '../../../public/Add.png'
import Triangle from '../../../public/triangle-reverse.png'
import ModalOption, { ProductOptions } from './ModalOption'
import ButtonLightRed from '../Button/ButtonLightRed'
import ButtonOrange from '../Button/ButtonOrange'
import { Category } from '../Home/Category'
import { requestAdmin, requestUser } from '@/service/axiosRequest'
import { PagePagination } from '@/hooks/useProducts'
import { useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { LoadingType, setLoading } from '@/slice/loadingSlice'
import { CreateImage } from './ModalCategory'
import { UserClient } from '@/hooks/useUser'
type ModalProductProp = {
    CloseModal: Function,
    type: string,
    categories: Category[],
    indexPage: number,
    indexProduct: number,
    data: PagePagination | undefined,
    id: string,
    setIsLoading: Function
}
export type Detail = {
    name: string,
    value: string
}
export type Response = {
    id: string,
    comment: string,
    image: string,
    star: number,
    user: UserClient
}
export type InfoProduct = {
    id?: string | undefined,
    type: string | undefined
    image: string | undefined,
    title: string | undefined,
    price: string | undefined,
    discount: string | undefined,
    productOptions: ProductOptions[] | undefined,
    detail: Detail[] | undefined,
    timeDiscount: Date | number | undefined,
    description: string | undefined,
    created_at: Date | null | undefined,
    remain: string | undefined,
    sold?: string,
    starAvg?: number,
    response?: Response[]


}
export type SendProduct = {

}

const ModalProduct = ({ CloseModal, setIsLoading, id, indexPage, indexProduct, type, categories, data }: ModalProductProp) => {
    const refDescription = useRef<HTMLTextAreaElement | null>(null)
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const [infoProduct, setInfoProduct] = useState<InfoProduct>({
        type: type == 'create' ? categories[0].name : data?.pages[indexPage].product[indexProduct].type,
        image: type == 'create' ? '' : data?.pages[indexPage].product[indexProduct].image,
        title: type == 'create' ? '' : data?.pages[indexPage].product[indexProduct].title,
        price: type == 'create' ? '' : data?.pages[indexPage].product[indexProduct].price,
        discount: type == 'create' ? '' : data?.pages[indexPage].product[indexProduct].discount,
        timeDiscount: type == 'create' ? 0 : data?.pages[indexPage].product[indexProduct].timeDiscount,
        productOptions: type == 'create' ? [] : data?.pages[indexPage].product[indexProduct].productOptions,
        detail: type == 'create' ? [] : data?.pages[indexPage].product[indexProduct].detail,
        description: type == 'create' ? '' : data?.pages[indexPage].product[indexProduct].description,
        created_at: type == 'create' ? null : data?.pages[indexPage].product[indexProduct].created_at,
        remain: type == 'create' ? '' : data?.pages[indexPage].product[indexProduct].remain,
    })
    const time = new Date()
    const formatDate = new Date(time)
    const day = String(formatDate.getDate()).padStart(2, '0')
    const month = String(formatDate.getMonth() + 1).padStart(2, '0')
    const year = String(formatDate.getFullYear())
    const [date, setDate] = useState({
        day,
        month,
        year
    })
    const [fileImage, setFileImage] = useState<null | File>(null)
    const [addProductsOption, setAddProductsOption] = useState({
        active: false,
        type: 'product-option',
        index: -1,
        indexOption: -1,
        indexDetail: -1,
    })

    const CloseModalOption = useCallback(() => {
        setAddProductsOption((prev) => ({ ...prev, active: false }))
    }, [])
    const Save = async () => {
        if (infoProduct.type == '') {
            return alert('Vui lòng điền thể loại')
        }
        if (infoProduct.image == '') {
            return alert('Vui lòng thêm hình ảnh')
        }
        if (infoProduct.price == '') {
            return alert('Vui lòng điền giá')
        }
        if (infoProduct.title == 'Vui lòng điền tiêu đề') {
            return alert('Vui lòng điền thể loại')
        }
        if (infoProduct.remain && infoProduct.remain.length > 9) {
            return alert('Số lượng hàng hóa quá nhiều')
        }
        if (infoProduct.discount && (infoProduct.discount?.length >= 3 && infoProduct.discount != '100')) {
            return alert('Giảm giá tối đa 100%')
        }
        if (infoProduct.price && infoProduct.price.length > 13) {
            return alert('Giá quá cao!')
        }
        const timeString = `${date.year}-${date.month}-${date.day}`
        const future = new Date(timeString)

        if (type == 'create') {
            const now = Date.now()
            const create_at = new Date(now)

            try {
                let newImage = ''
                if (fileImage) {
                    const data = new FormData()
                    data.append('file', fileImage)
                    data.append('folder', 'product')
                    const res2 = await requestUser.post('/upload-user-image', data)
                    newImage = res2.data

                }

                const sendProduct: InfoProduct = {
                    ...infoProduct,
                    price: infoProduct.price,
                    created_at: create_at,
                    timeDiscount: future,
                    description: refDescription.current?.value ?? '',
                    image: newImage != '' ? newImage : infoProduct.image
                }
                setIsLoading(true)
                const res = await requestAdmin.post('/create-product', sendProduct)
                if (res.status == 403) {
                    setIsLoading(false)
                    return dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Bạn không phải admin!' }))

                }
                queryClient.setQueryData(['product'], (oldData: PagePagination | undefined) => {
                    if (!oldData) return oldData;

                    const newPages = [...oldData.pages];
                    newPages[0] = {
                        ...newPages[0],
                        product: [sendProduct, ...newPages[0].product], // Thêm mới lên đầu
                    };

                    return {
                        ...oldData,
                        pages: newPages,
                    };
                });
                setIsLoading(false)

                dispatch(setLoading({ active: true, type: LoadingType.SUCCESS, text: 'Tạo sản phẩm thành công!' }))
            } catch (e) {
                console.log(e)
                setIsLoading(false)

                dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Lỗi tạo sản phẩm!' }))
            }
        } else {

            try {
                setIsLoading(true)
                let newImage = ''
                if (fileImage) {

                    newImage = await CreateImage(fileImage, 'product')
                }
                const changeProduct: InfoProduct = {
                    ...infoProduct,
                    price: infoProduct.price,
                    timeDiscount: future,
                    description: refDescription.current?.value ?? '',
                    image: newImage != '' ? newImage : infoProduct.image
                }
                const res = await requestAdmin.patch(`/change-product/${id}`, changeProduct)
                if (res.status == 403) {
                    setIsLoading(false)
                    return dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Bạn không phải admin!' }))

                }
                queryClient.setQueryData(['product'], (oldData: PagePagination | undefined) => {
                    if (!oldData) return oldData
                    const newPages = [...oldData.pages]
                    newPages[indexPage].product[indexProduct] = { ...changeProduct, id }
                    return {
                        ...oldData,
                        newPages
                    }
                })
                setIsLoading(false)

                dispatch(setLoading({ active: true, type: LoadingType.SUCCESS, text: 'Tạo sản phẩm thành công!' }))

            } catch (e) {
                console.log(e)
                setIsLoading(false)

                dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Lỗi thay đổi sản phẩm!' }))

            }

        }
        CloseModal()
    }
    return (
        <>


            {addProductsOption.active && <ModalOption indexDetail={addProductsOption.indexDetail} indexOption={addProductsOption.indexOption} index={addProductsOption.index} type={addProductsOption.type} infoProduct={infoProduct} setAddProductsOption={setAddProductsOption} CloseModal={CloseModalOption} />}

            <div className="h-full min-w-screen bg-black/50  z-10000 flex fixed items-start select-none  justify-center">

                <div className="w-200 overflow-y-auto relative overflow-x-hidden max-h-150 bg-[#f5f5f5] flex mt-[10vh] p-2 select-none flex-col">
                    <div className="flex justify-end mr-3 h-7 w-full ">
                        <img src={typeof Close == 'string' ? Close : Close.src} className="size-7 cursor-pointer" onClick={() => CloseModal()} />
                    </div>
                    <div className='flex flex-row gap-5'>

                        <p>Thể loại:</p>
                        <select className='cursor-pointer bg-gray-300' value={infoProduct.type} onChange={(e) => setInfoProduct((prev) => ({ ...prev, type: e.target.value }))} >
                            {categories.map((category, i) => {
                                return (
                                    <option className='cursor-pointer' key={i} value={category.name}>
                                        {category.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <p className='mt-5'>Ảnh sản phẩm:</p>
                    {infoProduct.image == '' ? (

                        <div onClick={() => document.getElementById('image-product')?.click()} className='aspect-[14/16] w-70 border-[1px] hover:shadow-[0px_0px_8px_rgba(0,0,0,0.7)] cursor-pointer'>

                        </div>
                    ) : (
                        <img onClick={() => document.getElementById('image-product')?.click()} src={infoProduct.image} className='aspect-[14/16] border-1 w-70 cursor-pointer' />
                    )}
                    <input className='hidden' id='image-product' onChange={(e) => {
                        const file = e.target.files?.[0] as File
                        if (!file.type.startsWith('image')) return alert('Vui lòng chọn ảnh')
                        const url = URL.createObjectURL(file)
                        setFileImage(file)
                        setInfoProduct((prev) => ({ ...prev, image: url }))
                    }} type='file' />
                    <p className='mt-5'>Tiêu đề:</p>
                    <Input onChange={(e) => setInfoProduct((prev) => ({ ...prev, title: e.target.value }))} value={infoProduct.title} />
                    <p className='mt-5'>Số lượng hàng:</p>
                    <Input onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '')
                        setInfoProduct((prev) => ({ ...prev, remain: raw }))
                    }} value={infoProduct.remain} />

                    <p className='mt-5'>Giá:</p>
                    <div className='flex flex-row items-center '>

                        <Input extraClassParent='mb-5' onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, '')
                            const priceFormatVnd = new Intl.NumberFormat('vi-VN').format(Number(raw))
                            setInfoProduct((prev) => ({ ...prev, price: priceFormatVnd }))
                        }} type='text' value={infoProduct.price} />
                        <p className='ml-3'>VNĐ</p>
                    </div>
                    <p className='mt-5'>Giảm giá</p>
                    <div className='flex flex-row items-center '>

                        <Input extraClassParent='mb-5' extraClassParentWidth='[40%]' onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, '')
                            setInfoProduct((prev) => ({ ...prev, discount: raw }))
                        }} type='text' value={infoProduct.discount} />
                        <p className='ml-2'>%</p>

                        <div className='flex flex-row gap-3 h-15 items-center '>
                            <p className='w-fit whitespace-nowrap  ml-5 flex items-center '>Hạn sử dụng:</p>
                            <select className='cursor-pointer border-1' onChange={(e) => setDate((prev) => ({ ...prev, day: e.target.value }))} value={date.day}>
                                {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map((v) => {
                                    return (
                                        <option key={v} value={v}>
                                            {v}
                                        </option>
                                    )
                                })}
                            </select>
                            <select className='cursor-pointer border-1' onChange={(e) => setDate((prev) => ({ ...prev, month: e.target.value }))} value={date.month}>
                                {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((v) => {
                                    return (
                                        <option key={v} value={v}>
                                            {v}
                                        </option>
                                    )
                                })}
                            </select>
                            <select className='cursor-pointer border-1' onChange={(e) => setDate((prev) => ({ ...prev, year: e.target.value }))} value={date.year}>
                                {Array.from({ length: 100 }, (_, i) => String(2030 - i)).map((v) => {
                                    return (
                                        <option key={v} value={v}>
                                            {v}
                                        </option>
                                    )
                                })}
                            </select>

                        </div>

                    </div>
                    <p className='mt-5'>Thêm phân loại</p>
                    <div className='flex flex-col mt-2  '>
                        <div onClick={() => setAddProductsOption({ type: 'product-option', active: true, index: -1, indexOption: -1, indexDetail: -1 })} className='w-30 h-10 hover:bg-black/20 rounded-lg border-1 flex items-center justify-center cursor-pointer'>
                            <img src={typeof Add == 'string' ? Add : Add.src} className='h-[50%]' />
                        </div>
                        {infoProduct.productOptions && infoProduct.productOptions.map((productOption, i) => {
                            return (
                                <Fragment key={`frag${i}`}>
                                    <div key={i} className='flex flex-row gap-2 items-center ml-30'>

                                        <p>{`${productOption.name}:`}</p>
                                    </div>
                                    <div key={`option${i}`} className='flex flex-row flex-wrap gap-5 ml-45 '>

                                        <div key={`add${i}`} onClick={() => setAddProductsOption({ type: 'option', active: true, index: i, indexOption: -1, indexDetail: -1 })} className='hover:bg-black/20 w-30 h-10 rounded-lg border-1 flex items-center justify-center cursor-pointer'>
                                            <p>Thêm tùy chọn</p>
                                        </div>
                                        {productOption.options.map((option, optionI) => {
                                            return (

                                                <div key={`opt${optionI}`} onClick={() => setAddProductsOption({ type: 'change-option', active: true, index: i, indexOption: optionI, indexDetail: -1 })} className='hover:bg-black/20 w-30 h-10 rounded-lg border-1 flex items-center justify-center cursor-pointer'>
                                                    <p className='ml-2'>{option.name}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Fragment>

                            )
                        })}
                    </div>
                    <p className='mt-5'>Thêm chi tiết</p>
                    <div className='flex flex-row flex-wrap gap-5 mt-2  '>
                        <div onClick={() => setAddProductsOption({ type: 'create-detail', active: true, index: -1, indexOption: -1, indexDetail: -1 })} className='w-30 h-10 hover:bg-black/20 rounded-lg border-1 flex items-center justify-center cursor-pointer'>
                            <img src={typeof Add == 'string' ? Add : Add.src} className='h-[50%]' />
                        </div>
                        {infoProduct.detail && infoProduct.detail.map((d, i) => {
                            return (
                                <div key={`detail:${i}`} onClick={() => setAddProductsOption({ type: 'change-detail', active: true, index: -1, indexOption: -1, indexDetail: i })} className='w-30 h-10 hover:bg-black/20 rounded-lg border-1 flex items-center justify-center cursor-pointer'>
                                    <p>{`${d.name} : ${d.value}`}</p>
                                </div>
                            )
                        })}
                    </div>
                    <p className='mt-5'>Thêm mô tả</p>
                    <div className='w-full h-40 mt-3'>

                        <textarea ref={refDescription} className='w-full h-40 p-3  rounded-sm outline-none border-[1px] p-1 border-gray-400 focus:border-black' />
                    </div>
                    <div className="flex flex-row justify-between mt-5">

                        <ButtonLightRed extraClass="w-[40%] h-10" text="Hủy" onClick={() => CloseModal()} />
                        <ButtonOrange extraClass="w-[40%] h-10" text="Lưu" onClick={() => { Save() }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalProduct;