'use client'
import { useDispatch, useSelector } from 'react-redux'
import Close from '../../../public/close.png'
import { RootState } from '@/store/store'
import Shopee from '../../../public/shopee-icon.png'
import ButtonOrange from '../Button/ButtonOrange'
import { ConvertToVND } from '@/app/cart/page'
import { requestUser } from '@/service/axiosRequest'
import { useState } from 'react'
import SpinnerShopee from '../Spinner/SpinnerShopee'
import { addMyVouncher, MyVouncher, StateVouncher } from '@/slice/myVouncherSlice'
import { LoadingType, setLoading } from '@/slice/loadingSlice'
import { Vouncher } from '@/slice/vouncherSlice'


type ModalVouncherClientProp = {
    closeModal: Function,
    type?: string,
    setCurrentVouncher?: Function,
    currentVouncher?: Vouncher
}
const ModalVouncherClient = ({ closeModal, type = 'client', setCurrentVouncher, currentVouncher }: ModalVouncherClientProp) => {
    const vounchers = useSelector((state: RootState) => state.vouncher.vouncher)
    const userId = useSelector((state: RootState) => state.user.user.id)
    const myVouncher = useSelector((state: RootState) => state.myVouncher.myVouncher)
    const [loading, Loading] = useState(false)
    const dispatch = useDispatch()
    const SaveVouncher = async (id: string) => {
        try {
            const data = {
                userId: userId,
                vouncherId: id
            }
            Loading(true)
            const res = await requestUser.post('/save-vouncher', data)
            console.log(res)
            dispatch(addMyVouncher(res.data as MyVouncher))
            Loading(false)
            dispatch(setLoading({ active: true, text: 'Lưu vouncher thành công!', type: LoadingType.SUCCESS }))
        } catch (e) {
            console.log(e)
            Loading(false)
            dispatch(setLoading({ active: true, text: 'Lưu vouncher thành công!', type: LoadingType.SUCCESS }))

        }
    }
    return (
        <>
            {loading && <SpinnerShopee />}


            <div className="fixed top-0  h-screen w-screen bg-black/70  z-25000 flex fixed items-center justify-center">
                <div className="w-200 relative  h-140 bg-[#f5f5f5] flex p-4 select-none flex-col">

                    <div className="flex flex-row h-7 justify-end w-full cursor-pointer" onClick={() => closeModal()}>
                        <img src={typeof Close == 'string' ? Close : Close.src} className='size-7' />
                    </div>
                    <div className='h-140 overflow-y-auto overflow-x-hidden'>

                        {type == 'client' ? (
                            vounchers.map((vouncher, i) => {
                                const maxDiscount = ConvertToVND(parseInt(vouncher.maxDiscount))
                                const time = new Date(vouncher.expire)
                                const formatDate = new Date(time)
                                const day = String(formatDate.getDate()).padStart(2, '0')
                                const month = String(formatDate.getMonth() + 1).padStart(2, '0')
                                const year = String(formatDate.getFullYear())
                                return (
                                    <div key={i} className='cursor-pointer w-full min-h-35 my-3 border-1 flex shadow-[4px_4px_7px_rgba(0,0,0,0.2)] max-md:h-25 flex-row"'>
                                        <div className="w-[30%] select-none self-stretch bg-[#ee4d2d] flex  items-center justify-center">
                                            <img src={typeof Shopee == 'string' ? Shopee : Shopee.src} className="size-30 max-md:size-15" />
                                        </div>
                                        <div className="w-[70%] bg-white p-4 flex flex-row  justify-between  items-center self-stretch">
                                            <div className="flex flex-col">

                                                <p className="font-bold text-[40px] max-md:text-[20px]">{`Giảm giá ${vouncher.discount}%`}</p>
                                                <p className="text-bold text-[25px] max-md:text-[12x]">{`Giảm tối đa ${maxDiscount}đ`}</p>
                                                <p className="text-bold text-[25px max-md:text-[12px]]">{`Hết hạn vào ${day}-${month}-${year}`}</p>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                {myVouncher.some((myV, i) => myV.vouncher.id == vouncher.id) ? (
                                                    <ButtonOrange isDisable={true} text="Đã lưu" extraClass="p-3 w-20 " onClick={() => { SaveVouncher(vouncher.id ?? '') }} />

                                                ) : (

                                                    <ButtonOrange text="Lưu" extraClass="p-3 w-20" onClick={() => { SaveVouncher(vouncher.id ?? '') }} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })) : (
                            <>
                                {myVouncher.map((myVouncher, i) => {

                                    const maxDiscount = ConvertToVND(parseInt(myVouncher.vouncher.maxDiscount))
                                    const time = new Date(myVouncher.vouncher.expire)
                                    const timeVouncher = time.getTime()
                                    const now = Date.now()
                                    const formatDate = new Date(time)
                                    const day = String(formatDate.getDate()).padStart(2, '0')
                                    const month = String(formatDate.getMonth() + 1).padStart(2, '0')
                                    const year = String(formatDate.getFullYear())
                                    return (
                                        <div key={i} className='cursor-pointer w-full min-h-35 my-3 border-1 flex shadow-[4px_4px_7px_rgba(0,0,0,0.2)] max-md:h-25 flex-row"'>
                                            <div className="w-[30%] select-none self-stretch bg-[#ee4d2d] flex  items-center justify-center">
                                                <img src={typeof Shopee == 'string' ? Shopee : Shopee.src} className="size-30 max-md:size-15" />
                                            </div>
                                            <div className="w-[70%] bg-white p-4 flex flex-row  justify-between  items-center self-stretch">
                                                <div className="flex flex-col">

                                                    <p className="font-bold text-[40px] max-md:text-[20px]">{`Giảm giá ${myVouncher.vouncher.discount}%`}</p>
                                                    <p className="text-bold text-[25px] max-md:text-[12x]">{`Giảm tối đa ${maxDiscount}đ`}</p>
                                                    <p className="text-bold text-[25px max-md:text-[12px]]">{`Hết hạn vào ${day}-${month}-${year}`}</p>
                                                </div>
                                                <div className="flex flex-col gap-3">

                                                    {myVouncher.state == StateVouncher.USED ? (
                                                        <ButtonOrange isDisable={true} text="Đã dùng" extraClass="p-3 w-20 " />

                                                    ) : (
                                                        myVouncher.vouncher.id == currentVouncher?.id ? (


                                                            <ButtonOrange isDisable={true} text={"Đang dùng"} extraClass="p-3 w-20 " />

                                                        ) : (
                                                            now < timeVouncher ? (

                                                                <ButtonOrange text="Chọn" extraClass="p-3 w-20" onClick={() => {
                                                                    if (setCurrentVouncher)
                                                                        setCurrentVouncher(myVouncher.vouncher)
                                                                }} />
                                                            ) : (
                                                                <ButtonOrange isDisable={true} text={"Hết hạn"} extraClass="p-3 w-20 " />

                                                            )
                                                        ))}

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {myVouncher.length == 0 && <div className='flex flex-row w-full justify-center'>
                                    <p className=' text-[30px] '>Chưa có vouncher nào</p>
                                </div>}
                            </>

                        )}

                    </div>
                </div>
            </div>


        </>
    );
}

export default ModalVouncherClient;