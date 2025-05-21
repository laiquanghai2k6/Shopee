'use client'
import { ConvertToVND } from '@/app/cart/page';
import Close from '../../../public/close.png'
import { InfoProduct } from './ModalProduct';
import ButtonOrange from '../Button/ButtonOrange';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { AddressLocation, useAddress } from '@/hooks/useAddress';
import SpinnerShopee from '../Spinner/SpinnerShopee';
import Input from '../Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ModalVouncherClient from './ModalVouncherClient';
import { Vouncher } from '@/slice/vouncherSlice';
import { requestHistoryCart } from '@/service/axiosRequest';
import { deleteUserCart, resetUserCart } from '@/slice/userCartSlice';
import { LoadingType, setLoading } from '@/slice/loadingSlice';
export enum StateHistory {
    RECEIVED = 'Đã nhận ✅',
    DELIVERING = 'Đang giao hàng 🚚',
    CONFIRMING = 'Đang xác nhận hàng 👨‍💻'

}
export enum MethodHistory {
    COD = 'Thanh toán khi nhận hàng',
    WALLET = 'Thanh toán bằng ví'
}

export enum UserCartType {
    PENDING = 'pending',
    FINISH = 'finish'
}

export type UserCart = {
    id?: string
    product: InfoProduct | undefined,
    quantity: number,
    choosedOption: string
    priceProduct: string
    priceDiscount: string,
    type: UserCartType,
    userId: string


}
export type HistoryCart = {
    id?: string,
    state: StateHistory,
    userCart: UserCart[]
    address: string,
    phone: string
    total: string,
    historyId: string,
    method: MethodHistory,
    create_at:Date,
    received_at?:Date|String

}
type ModalBuyingProp = {
    closeModal: Function,
    userCart: UserCart[]
}
export type Location = {
    code: string,
    name: string
}
export type Address = {
    tinh: string,
    xa: string,
    huyen: string,
    additional?: string
}
export type QueryAddress = {
    location: AddressLocation,
    code?: string
}
const ModalBuying = ({ closeModal, userCart }: ModalBuyingProp) => {


    const [currentVouncher, setCurrentVouncher] = useState<Vouncher>(
        {
            discount: '0',
            expire: new Date(),
            maxDiscount: '0',
            id: ''

        }
    )
    const historyId = useSelector((state: RootState) => state.user.user.history.id)
    const [modal, setModal] = useState(false)
    const [tinhOption, setTinhOption] = useState<Location[]>([])
    const [huyenOption, setHuyenOption] = useState<Location[]>([])
    const [xaOption, setXaOption] = useState<Location[]>([])
    const [queryOption, setQueryOption] = useState<QueryAddress>({
        location: AddressLocation.TINH,
        code: '-1'
    })
    const [select, setSelect] = useState(1)

    const [phone, setPhone] = useState('')
    const detailAddressRef = useRef<HTMLTextAreaElement | null>(null)
    const [address, setAddress] = useState<Address>({
        tinh: 'Tỉnh',
        xa: 'Xã',
        huyen: 'Quận/Huyện',
    })
    const dispatch = useDispatch()
    const [loading, Loading] = useState(false)
    const addressQuery = useAddress(queryOption.location, queryOption.code)
    useEffect(() => {
        if (queryOption.location == AddressLocation.HUYEN) {
            setHuyenOption(addressQuery.data)
        }
        if (queryOption.location == AddressLocation.XA) {
            setXaOption(addressQuery.data)
        }
        if (queryOption.location == AddressLocation.TINH) {
            setTinhOption(addressQuery.data)

        }
    }, [addressQuery.data])
    const closeModals = useCallback(() => {
        setModal(false)
    }, [])
    const totalPrice = userCart.reduce((prev: number, current) => {
        const discountPrice = Number(current.priceDiscount?.replaceAll('.', ''))
        const finalPrice = discountPrice * current.quantity
        return prev + finalPrice
    }, 0)
    const [currentTotal, setCurrentTotal] = useState(totalPrice)
    const [currentDiscount, setCurrentDiscount] = useState(0)
    useEffect(() => {
        const discountNum = (totalPrice / 100) * Number(currentVouncher.discount)
        const discountMaxNum = Number(currentVouncher.maxDiscount.replaceAll('.', ''))
        const discountPrice = totalPrice - (discountNum <= discountMaxNum ? discountNum : discountMaxNum)
        setCurrentDiscount(discountPrice)
    }, [currentVouncher])
    const user = useSelector((state: RootState) => state.user.user)
    const PaymentHandler = async () => {

        if (address.tinh == 'Tỉnh' || address.xa == 'Xã' || address.huyen == 'Quận/Huyện')
            return alert('Vui lòng điền đầy đủ địa chỉ')
        if (phone.length != 10 || phone[0] != '0') {
            return alert('Vui lòng nhập số điện thoại đúng')
        }
        if (select == 2 && user.money < currentDiscount) {
            return alert('Số dư ví không đủ')
        }



        const HistoryCart: HistoryCart = {
            state: StateHistory.DELIVERING,
            address: `${address.tinh} - ${address.huyen} - ${address.xa}${detailAddressRef.current?.value != '' ? ` -${detailAddressRef.current?.value} ` : ''}`,
            userCart: userCart,
            phone: phone,
            historyId: historyId,
            total: String(currentDiscount),
            method: select == 1 ? MethodHistory.COD : MethodHistory.WALLET,
            create_at:new Date()
            
        }

        try {
            Loading(true)
            const historyCart = await requestHistoryCart.post('/create-history-cart', HistoryCart)
            if(historyCart.status!= 201) throw new Error()
            const aDeleteUC = HistoryCart.userCart.map((z) => z.id).filter((x) => x != undefined)
            dispatch(deleteUserCart(aDeleteUC))
            Loading(false)

            dispatch(setLoading({ active: true, text: 'Đơn hàng đã được đặt!', type: LoadingType.SUCCESS }))
            closeModal('finish')
        } catch (e) {
            Loading(false)
            dispatch(setLoading({ active: true, text: 'Đơn hàng đã bị lỗi!', type: LoadingType.ERROR }))
            closeModal()
            console.log(e)
        }
    }
    return (
        <>
            {(loading || addressQuery.isLoading) && <SpinnerShopee />}
            {modal && <ModalVouncherClient currentVouncher={currentVouncher} setCurrentVouncher={setCurrentVouncher} closeModal={closeModals} type='buying' />}
            <div className="fixed top-0  h-screen w-screen bg-black/50  z-20000 flex fixed items-center justify-center">
                <div className="w-250 relative overflow-y-auto overflow-x-hidden  h-150 bg-[#f5f5f5] flex p-4 select-none flex-col">

                    <div className="flex flex-row h-7 justify-end w-full cursor-pointer" onClick={() => closeModal()}>
                        <img src={typeof Close == 'string' ? Close : Close.src} className='size-7' />
                    </div>
                    <div className='w-full flex flex-row '>
                        <div className='w-[60%]'>
                            <p className='ml-3 text-[20px]'>Sản phẩm</p>
                        </div>
                        <div className='w-[15%] '>
                            <p className=' text-[17px]'>Đơn giá</p>
                        </div>
                        <div className='w-[15%]'>
                            <p className='text-[17px]'>Số lượng</p>
                        </div>
                        <div className='w-[15%] '>
                            <p className='text-[17px]'>Thành tiền</p>
                        </div>
                    </div>
                    {userCart.map((cart, i) => {
                        const price = Number(cart.priceProduct?.replaceAll('.', ''))
                        const discount = Number(cart.priceDiscount?.replaceAll('.', ''))
                        const priceFormat = ConvertToVND(price)
                        const discountFormat = ConvertToVND(discount)
                        const finalPrice = discount * cart.quantity

                        const finalPriceFormat = ConvertToVND(finalPrice)

                        return (
                            <div key={i} className={`w-full min-h-30 bg-gray-200 shadow-[0px_0px_6px_rbga(0,0,0,0.5)] 
                         mt-${i == 0 ? '10' : '3'} flex flex-row items-center `}>
                                <div className='flex flex-row items-center w-[60%] '>
                                    <div className='flex flex-row items-center w-[55%] ml-[5%]'>
                                        <img src={cart.product?.image} className='aspect-[14/16] max-w-20 ' />
                                        <p className='ml-3 break-words max-w-[calc(100%-100px)]'>{`${cart.product?.title}`}</p>

                                    </div>
                                    <div className='flex flex-row flex-wrap w-[25%] ml-[7%]  gap-2' id='option-container'>
                                        <p className='text-gray-500'>

                                            {cart.choosedOption}
                                        </p>

                                    </div>
                                </div>
                                <div className='w-[15%] flex flex-col '>
                                    {discount != price ? (
                                        <>
                                            <p className=' text-[17px] line-through text-[#ee4d2d]'>{`${priceFormat}đ`}</p>
                                            <p className=' text-[17px] text-[#ee4d2d]'>{`${discountFormat}đ`}</p>
                                        </>
                                    ) : (
                                        <p className=' text-[17px]  text-[#ee4d2d]'>{`${priceFormat}đ`}</p>

                                    )}
                                </div>
                                <div className='w-[15%] flex '>
                                    <p className='text-[17px]'>{cart.quantity}</p>
                                </div>
                                <div className='w-[15%] '>
                                    <p className='text-[17px]'>{`${finalPriceFormat}đ`}</p>
                                </div>

                            </div>
                        )
                    })}
                    <div className='w-full flex mt-5 flex-row items-center '>
                        <div className='flex-row gap-2 w-[60%] flex'>

                            <p className='text-[20px] mr-10'>Địa chỉ</p>
                            <select onChange={(e) => {
                                const split = e.target.value.split('-')
                                setAddress({
                                    tinh: split[0],
                                    xa: 'Xã',
                                    huyen: 'Quận/Huyện',
                                    additional: ''
                                })
                                setHuyenOption([])
                                setXaOption([])
                                setQueryOption({ location: AddressLocation.HUYEN, code: split[1] })
                            }} className='bg-gray-300 w-30 h-10 cursor-pointer' value={address.tinh}>
                                <option value={address.tinh}>
                                    {address.tinh}
                                </option>
                                {tinhOption?.map((tinh, i) => {
                                    return (
                                        <option key={i} value={`${tinh.name}-${tinh.code}`}>
                                            {tinh.name}
                                        </option>
                                    )
                                })}
                            </select>
                            <select
                                onClick={() => {
                                    if (address.tinh == 'Tỉnh') return alert('Vui lòng chọn tỉnh')
                                }}
                                onChange={async (e) => {
                                    const split = e.target.value.split('-')

                                    setAddress((prev) => ({ ...prev, xa: 'Xã', huyen: split[0] }))
                                    setXaOption([])
                                    setQueryOption({ location: AddressLocation.XA, code: split[1] })
                                }} className='bg-gray-300 w-30 h-10  cursor-pointer' value={address.huyen}>
                                <option>
                                    {address.huyen}
                                </option>
                                {huyenOption?.map((huyen, i) => {
                                    return (
                                        <option key={i} value={`${huyen.name}-${huyen.code}`}>
                                            {huyen.name}
                                        </option>
                                    )
                                })}
                            </select>
                            <select
                                onClick={() => {
                                    if (address.tinh == 'Tỉnh') return alert('Vui lòng chọn tỉnh')
                                    if (address.huyen == 'Quận/Huyện') return alert('Vui lòng chọn huyện')
                                }}
                                onChange={(e) => {


                                    setAddress((prev) => ({ ...prev, xa: e.target.value }))
                                }} className='bg-gray-300 w-30 h-10  cursor-pointer' value={address.xa}>
                                <option>
                                    {address.xa}
                                </option>
                                {xaOption?.map((xa, i) => {
                                    return (
                                        <option key={i} value={xa.name}>
                                            {xa.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='flex flex-row w-[40%] h-20 '>
                            <textarea ref={detailAddressRef} className='w-full h-20 border-1 p-3 resize-none' placeholder='Thêm chi tiết' />
                        </div>
                    </div>
                    <div className='flex flex-row '>
                        <p className='text-[20px] mr-10'>Số điện thoại</p>
                        <input value={phone} onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, '')
                            setPhone(raw)
                        }} className='w-40 h-10 p-2 border-1 ' type='text'
                            placeholder=''
                        >
                        </input>
                    </div>
                    <div className='flex flex-row mt-5 h-30  justify-between items-start '>
                        <div className='flex flex-col '>
                            <div className='flex flex-row'>

                                <p className='text-[20px]'>{`Số dư ví: `}</p>
                                <p className='text-[20px] ml-3 text-[#ee4d2d]'>{`${ConvertToVND(user.money)}đ`}</p>
                            </div>
                            <div className='flex flex-row'>
                                <div className='flex flex-row'>
                                    <label className="label-pay flex flex-row items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="dot1"
                                            value={1}
                                            checked={select === 1}
                                            onChange={() => setSelect(1)}
                                            className="peer hidden"
                                        />
                                        <span className="w-5 h-5 inline-block rounded-full border-2 border-[#ee4d2d] peer-checked:bg-[#ee4d2d]"></span>
                                        <span className="ml-2">Thanh toán khi nhận hàng</span>
                                    </label>
                                    <label className="label-pay ml-5 flex flex-row items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="dot2"
                                            value={2}
                                            checked={select === 2}
                                            onChange={() => setSelect(2)}
                                            className="peer hidden"
                                        />
                                        <span className="w-5 h-5 inline-block rounded-full border-2 border-[#ee4d2d] peer-checked:bg-[#ee4d2d]"></span>
                                        <span className="ml-2">Thanh toán bằng ví</span>
                                    </label>
                                </div>

                            </div>
                            {select == 2 && user.money < currentDiscount && (
                                <p className='text-[15px] text-red-500'>Số dư ví không đủ</p>
                            )}
                        </div>
                        <div className='flex flex-row items-center gap-5'>

                            {currentVouncher.id != '' && <p className='text-[20px] text-[#ee4d2d] border-1 p-2 '>{`Vouncher giảm ${currentVouncher.discount}% tối đa ${ConvertToVND(Number(currentVouncher.maxDiscount))}đ`}</p>}
                            <p onClick={() => setModal(true)} className='text-[20px] mr-10 hover:underline cursor-pointer text-[#ee4d2d]'>Chọn vouncher</p>
                        </div>


                    </div>
                    <div className='flex flex-row justify-end items-center right-0 p-5'>
                        <div className='flex flex-col'>
                            {currentDiscount == 0 || currentDiscount == currentTotal ? (

                                <p className='text-[25px] text-[#ee4d2d] mr-5'>{`${ConvertToVND(currentTotal)}đ`}</p>
                            ) : (
                                <>
                                    <p className='text-[25px] text-[#ee4d2d] mr-5 line-through'>{`${ConvertToVND(currentTotal)}đ`}</p>
                                    <p className='text-[25px] text-[#ee4d2d] mr-5'>{`${ConvertToVND(currentDiscount)}đ`}</p>
                                </>

                            )}
                        </div>

                        <ButtonOrange extraClass='p-3 w-50' text='Thanh toán' onClick={() => PaymentHandler()} />
                    </div>
                </div>
            </div>
        </>

    );
}

export default ModalBuying;