'use client'
import { ConvertToVND } from '@/app/cart/page';
import Close from '../../../public/close.png'
import { InfoProduct } from './ModalProduct';
import ButtonOrange from '../Button/ButtonOrange';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AddressLocation, useAddress } from '@/hooks/useAddress';
import SpinnerShopee from '../Spinner/SpinnerShopee';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ModalVouncherClient from './ModalVouncherClient';
import { Vouncher } from '@/slice/vouncherSlice';
import { requestHistoryCart, requestUser } from '@/service/axiosRequest';
import { deleteUserCart } from '@/slice/userCartSlice';
import { LoadingType, setLoading } from '@/slice/loadingSlice';
import { decrease } from '@/slice/userSlice';
import { addHistory } from '@/slice/historySlice';
import { Listbox } from '@headlessui/react';
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
    create_at: Date,
    received_at?: Date | String

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

    const userId = useSelector((state: RootState) => state.user.user.id)

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
            return dispatch(setLoading({active:true,text:'Vui lòng điền địa chỉ',type:LoadingType.ERROR}))
        if (phone.length != 10 || phone[0] != '0') {
            return dispatch(setLoading({active:true,text:'Vui lòng nhập đúng số điện thoại',type:LoadingType.ERROR}))
        }
        if (select == 2 && user.money < currentDiscount) {
            return dispatch(setLoading({active:true,text:'Số dư ví khoogn đủ',type:LoadingType.ERROR}))
        }



        const HistoryCart: HistoryCart = {
            state: StateHistory.DELIVERING,
            address: `${address.tinh} - ${address.huyen} - ${address.xa}${detailAddressRef.current?.value != '' ? ` -${detailAddressRef.current?.value} ` : ''}`,
            userCart: userCart,
            phone: phone,
            historyId: historyId,
            total: String(currentDiscount),
            method: select == 1 ? MethodHistory.COD : MethodHistory.WALLET,
            create_at: new Date()

        }
        if (select == 1) {

            try {
                Loading(true)
                const historyCart = await requestHistoryCart.post('/create-history-cart', HistoryCart)

                if (historyCart.status != 201) throw new Error()
                const aDeleteUC = HistoryCart.userCart.map((z) => z.id).filter((x) => x != undefined)
                dispatch(deleteUserCart(aDeleteUC))
                dispatch(addHistory(historyCart.data))
                Loading(false)

                dispatch(setLoading({ active: true, text: 'Đơn hàng đã được đặt!', type: LoadingType.SUCCESS }))
                closeModal('finish')
            } catch (e) {
                Loading(false)
                dispatch(setLoading({ active: true, text: 'Đơn hàng đã bị lỗi!', type: LoadingType.ERROR }))
                closeModal()
                console.log(e)
            }
        } else {
            try {

                const data = {
                    id: userId,
                    amount: currentDiscount
                }
                Loading(true)
                const historyCart = await requestHistoryCart.post('/create-history-cart', HistoryCart)
                if (historyCart.status != 201) throw new Error()
                const res = await requestUser.post('/decrease-money', data)
                dispatch(addHistory(historyCart.data))
                const aDeleteUC = HistoryCart.userCart.map((z) => z.id).filter((x) => x != undefined)
                dispatch(deleteUserCart(aDeleteUC))
                dispatch(decrease(currentDiscount))
                Loading(false)
                dispatch(setLoading({ active: true, text: 'Thanh toán thành công!', type: LoadingType.SUCCESS }))

            } catch (error) {
                console.log(error)
                Loading(false)
                dispatch(setLoading({ active: true, text: 'Thanh toán không thành công!', type: LoadingType.ERROR }))

            }
            closeModal()
        }
    }
    return (
        <>
            {(loading || addressQuery.isLoading) && <SpinnerShopee />}
            {modal && <ModalVouncherClient currentVouncher={currentVouncher} setCurrentVouncher={setCurrentVouncher} closeModal={closeModals} type='buying' />}
            <div className="fixed top-0  h-screen w-screen bg-black/50  z-20000 flex fixed items-center justify-center">
                <div className="w-250 relative overflow-y-auto overflow-x-hidden  h-150 bg-[#f5f5f5] flex p-4 select-none flex-col">

                    <div className="flex flex-row h-7 justify-end w-full cursor-pointer" onClick={() => closeModal()}>
                        <img src={typeof Close == 'string' ? Close : Close.src} className='size-7 max-md:size-5' />
                    </div>
                    <div className='w-full flex flex-row '>
                        <div className='w-[60%]'>
                            <p className='ml-3 text-[20px] max-md:text-[15px]'>Sản phẩm</p>
                        </div>
                        <div className='w-[15%] '>
                            <p className=' text-[17px] max-md:text-[13px]'>Đơn giá</p>
                        </div>
                        <div className='w-[15%]'>
                            <p className='text-[17px] max-md:text-[13px]'>Số lượng</p>
                        </div>
                        <div className='w-[15%] '>
                            <p className='text-[17px] max-md:text-[13px]'>Tổng</p>
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
                            <div key={i} className={`w-full min-h-30 overflow-y-auto h-fit bg-gray-200 shadow-[0px_0px_6px_rbga(0,0,0,0.5)] 
                         mt-${i == 0 ? '10' : '3'} flex flex-row max-md:flex-col items-center `}>
                                <div className='flex flex-row items-center w-[35%] max-md:w-[100%] '>
                                    <div className='flex flex-row items-center   w-[100%] ml-[5%] max-md:ml-0'>
                                        <img src={cart.product?.image} className='aspect-[14/16] max-w-[30%] max-md:max-w-20  ' />
                                        <div className='max-md:w-30 min-w-[10%] break-words  items-center max-md:flex-grow-1'>

                                            <p className='ml-3 w-full max-md:ml-1 break-words  max-md:max-w-100'>{`${cart.product?.title}`}</p>
                                        </div>

                                    </div>

                                </div>
                                <div className='flex flex-row w-[65%] max-md:w-[100%] mt-1'>
                                    <div className='flex max-md:justify-start flex-row max-md:w-[63%] flex-wrap w-[33%] max-md:w-[25%]   max-md:ml-0 gap-2' id='option-container'>
                                        <p className='text-gray-500  max-md:ml-[5%] ml-[7%] max-md:text-[13px]'>

                                            {cart.choosedOption}
                                        </p>

                                    </div>
                                    <div className='w-[23%] max-md:w-[15%] flex flex-col '>
                                        {discount != price ? (
                                            <>
                                                <p className=' text-[17px] max-md:text-[13px] line-through text-[#ee4d2d]'>{`${priceFormat}đ`}</p>
                                                <p className=' text-[17px] max-md:text-[13px] text-[#ee4d2d]'>{`${discountFormat}đ`}</p>
                                            </>
                                        ) : (
                                            <p className=' text-[17px] max-md:text-[13px]  text-[#ee4d2d]'>{`${priceFormat}đ`}</p>

                                        )}
                                    </div>
                                    <div className='w-[23%] max-md:w-[15%] flex '>
                                        <p className='text-[17px] max-md:text-[13px] ml-1'>{`x${cart.quantity}`}</p>
                                    </div>
                                    <div className='w-[23%] max-md:w-[15%] '>
                                        <p className='text-[17px] max-md:text-[13px] '>{`${finalPriceFormat}đ`}</p>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                    <div className='w-full flex mt-5 flex-row items-center max-md:flex-col'>
                        <div className='flex-row gap-2 w-[60%] max-md:w-[100%] flex'>

                            <p className='text-[20px] max-md:text-[15px] mr-10'>Địa chỉ</p>
                            <Listbox value={address.tinh}
                                onChange={(e:any) => {
                                    const split = e.split('-')
                                    setAddress({
                                        tinh: split[0],
                                        xa: 'Xã',
                                        huyen: 'Quận/Huyện',
                                        additional: ''
                                    })
                                    setHuyenOption([])
                                    setXaOption([])
                                    setQueryOption({ location: AddressLocation.HUYEN, code: split.length == 3 ? split[2] : split[1] })
                                }}
                            >
                                <div className='relative  w-72'>
                                    <Listbox.Button className="bg-gray-300 min-h-10 h-fit mb-1 px-4 py-2 w-full rounded cursor-pointer">
                                        {address.tinh}
                                    </Listbox.Button>
                                    <Listbox.Options className="absolute  max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {tinhOption?.map((tinh, i) => (
                                            <Listbox.Option key={i} value={`${tinh.name}-${tinh.code}`}>
                                                {tinh.name}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                            
                            <Listbox
                             value={address.huyen}
                             onChange={async (e) => {
                                    const split = e.split('-')

                                    setAddress((prev) => ({ ...prev, xa: 'Xã', huyen: split[0] }))
                                    setXaOption([])
                                    setQueryOption({ location: AddressLocation.XA, code: split[1] })
                                }}
                            >
                                <div className='relative  w-72'>
                                    <Listbox.Button
                                    onClick={()=>{
                                    if (address.tinh == 'Tỉnh') dispatch(setLoading({active:true,text:'Vui lòng chọn tỉnh',type:LoadingType.ERROR}))

                                    }}
                                    className="bg-gray-300 min-h-10 h-fit mb-1 px-4 py-2 w-full rounded cursor-pointer">
                                        {address.huyen}
                                    </Listbox.Button>
                                    <Listbox.Options className="absolute  max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {huyenOption?.map((huyen, i) => (
                                            <Listbox.Option key={i} value={`${huyen.name}-${huyen.code}`}>
                                                {huyen.name}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                           <Listbox
                             value={address.xa}
                             onChange={(e) => {
                                    setAddress((prev) => ({ ...prev, xa: e }))
                                }}
                            >
                                <div className='relative  w-72'>
                                    <Listbox.Button
                                    onClick={() => {
                                    if (address.tinh == 'Tỉnh') return dispatch(setLoading({active:true,text:'Vui lòng chọn tỉnh',type:LoadingType.ERROR}))
                                    if (address.huyen == 'Quận/Huyện') return dispatch(setLoading({active:true,text:'Vui lòng chọn huyện',type:LoadingType.ERROR}))
                                }}
                                    className="bg-gray-300 min-h-10 h-fit mb-1 px-4 py-2 w-full rounded cursor-pointer">
                                        {address.xa}
                                    </Listbox.Button>
                                    <Listbox.Options className="absolute  max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {xaOption?.map((xa, i) => (
                                            <Listbox.Option key={i} value={`${xa.name}`}>
                                                {xa.name}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                            {/* <select
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
                            </select> */}
                        </div>
                        <div className='flex flex-row w-[40%] max-md:w-[100%] h-20 '>
                            <textarea ref={detailAddressRef} className='w-full h-20 border-1 p-3 resize-none' placeholder='Thêm chi tiết' />
                        </div>
                    </div>
                    <div className='flex flex-row mt-2 '>
                        <p className='text-[20px] max-md:text-[15px] mr-10'>Số điện thoại</p>
                        <input value={phone} onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, '')
                            setPhone(raw)
                        }} className='w-40 h-10 p-2 border-1 ' type='text'
                            placeholder=''
                        >
                        </input>
                    </div>
                    <div className='flex flex-row max-md:flex-col mt-5 h-30  justify-between items-start '>
                        <div className='flex flex-col '>
                            <div className='flex flex-row'>

                                <p className='text-[20px] max-md:text-[15px]'>{`Số dư ví: `}</p>
                                <p className='text-[20px] max-md:text-[15px] ml-3 text-[#ee4d2d]'>{`${ConvertToVND(user.money)}đ`}</p>
                            </div>
                            <div className='flex flex-row'>
                                <div className='flex flex-row max-md:flex-col'>
                                    <label className="label-pay flex flex-row items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="dot1"
                                            value={1}
                                            checked={select === 1}
                                            onChange={() => setSelect(1)}
                                            className="peer hidden"
                                        />
                                        <span className="w-5 h-5 inline-block rounded-full border-2 max-md:border-1 border-[#ee4d2d] peer-checked:bg-[#ee4d2d]"></span>
                                        <span className="ml-2">Thanh toán khi nhận hàng</span>
                                    </label>
                                    <label className="label-pay ml-5 max-md:ml-0 flex flex-row items-center cursor-pointer">
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

                            {currentVouncher.id != '' && <p className='text-[20px] max-md:text-[13px] text-[#ee4d2d] border-1 p-2 '>{`Vouncher giảm ${currentVouncher.discount}% tối đa ${ConvertToVND(Number(currentVouncher.maxDiscount))}đ`}</p>}
                            <p onClick={() => setModal(true)} className='text-[20px] max-md:text-[15px] mr-10 hover:underline cursor-pointer text-[#ee4d2d]'>Chọn vouncher</p>
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