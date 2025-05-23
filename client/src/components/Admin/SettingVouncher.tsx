'use client'
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Shopee from '../../../public/shopee-icon.png'
import { ConvertToVND } from "@/app/cart/page";
import ButtonOrange from "../Button/ButtonOrange";
import ButtonLightRed from "../Button/ButtonLightRed";
import ModalVouncher from "../Modal/ModalVouncher";
import { useCallback, useState } from "react";
import { deleteVouncher } from "@/slice/vouncherSlice";
import SpinnerShopee from "../Spinner/SpinnerShopee";
import { requestAdmin } from "@/service/axiosRequest";
import { LoadingType, setLoading } from "@/slice/loadingSlice";
type SettingVouncherProps = {
    topContent: string
}


const SettingVouncher = ({ topContent }: SettingVouncherProps) => {
    const [modal, setModal] = useState({
        active: false,
        index: -1,
        type: ''
    })
    const [loading, SetIsLoading] = useState(false)
    const dispatch = useDispatch()
    const vounchers = useSelector((state: RootState) => state.vouncher.vouncher)
    const CloseModal = useCallback(() => {
        setModal((prev) => ({ ...prev, active: false }))
    }, [])
    const DeleteVouncher = async (id: string) => {
        try {
            SetIsLoading(true)
            const res = await requestAdmin.delete(`/delete-vouncher/${id}`)
            if (res.status == 403) {
                SetIsLoading(false)
                return dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Bạn không phải admin!' }))

            }
            dispatch(deleteVouncher(id))
            SetIsLoading(false)
            dispatch(setLoading({ active: true, text: 'Xóa vouncher thành công!', type: LoadingType.SUCCESS }))

        } catch (e) {
            console.log(e)
            SetIsLoading(false)
            dispatch(setLoading({ active: true, text: 'Xóa vouncher thất bại!', type: LoadingType.ERROR }))

        }
    }
    return (
        <>
            {loading && <SpinnerShopee />}
            {modal.active && <ModalVouncher setIsLoading={SetIsLoading} type={modal.type} CloseModal={CloseModal} vouncher={vounchers[modal.index]} />}
            <div className="min-h-screen max-md:w-[90%] w-[75%] bg-red-200 flex items-center overflow-y-auto  flex-col pb-10">

                <div className="h-20 select-none w-full bg-[#F8F8F8] flex items-center justify-center border-b-1">
                    <p className={` text-[25px] font-bold `}>{topContent}</p>
                </div>
                <div className="p-30 max-md:p-5 w-full h-fit flex flex-col items-center">
                    <ButtonOrange
                        onClick={() => setModal({ index: -1, active: true, type: 'create' })}
                        text="Tạo vouncher" extraClass="p-5 w-50 self-center select-none" />

                    {vounchers.map((vouncher, i) => {

                        const maxDiscount = ConvertToVND(parseInt(vouncher.maxDiscount))
                        const time = new Date(vouncher.expire).getTime();
                        const formatDate = new Date(time)
                        const day = String(formatDate.getDate()).padStart(2, '0')
                        const month = String(formatDate.getMonth() + 1).padStart(2, '0')
                        const year = String(formatDate.getFullYear())

                        return (
                            <div key={i} className="cursor-pointer w-full items-stretch min-h-50  my-10 flex shadow-[4px_4px_7px_rgba(0,0,0,0.2)] max-md:h-25 flex-row"


                            >
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
                                        <ButtonOrange text="Điều chỉnh" extraClass="p-3" onClick={() => setModal({ index: i, active: true, type: 'change' })} />
                                        <ButtonLightRed text="Xóa" extraClass="p-3" onClick={() => { DeleteVouncher(vouncher.id ?? '') }} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    );
}

export default SettingVouncher;