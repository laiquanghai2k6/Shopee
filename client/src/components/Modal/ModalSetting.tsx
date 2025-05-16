'use client'
import { requestUser } from "@/service/axiosRequest";
import { setToken } from "@/slice/accessTokenSlice";
import { setUser } from "@/slice/userSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type ModalSettingProp = {
    openSettingModal: boolean,
    closeModalSetting: Function
}


const ModalSetting = ({ openSettingModal, closeModalSetting }: ModalSettingProp) => {
    const [shouldRenderModal, setShouldRenderModal] = useState(false)
    const dispatch = useDispatch()
    const accessToken = useSelector((state: RootState) => state.accessToken.accessToken)
    const router = useRouter()
    useEffect(() => {
        if (openSettingModal) {
            setShouldRenderModal(true)
        } else {
            const timeout = setTimeout(() => setShouldRenderModal(false), 100)
            return () => clearTimeout(timeout)
        }
    }, [openSettingModal])
    const GoToAccount = () => {
        closeModalSetting()
        router.push('/user')
    }
    const GoToHistory = () => {
        closeModalSetting()
        router.push('/history')
    }
    const LogOut = async () => {

        try {
            console.log('in sign out')
            const r = await requestUser.get('/sign-out')
            console.log('sign outed')
            dispatch(setUser({ email: '', image: '', id: '' }))
            dispatch(setToken({ accessToken: '' }))
            router.push('/login')

        } catch (e) {
            console.log(e)
        }

    }
    const GoToEditMode = ()=>{
            router.push('/admin')

    }
    return (
        <>
            {
                shouldRenderModal && (

                    <div className={`shadow-[0px_0px_7px_rgba(0,0,0,0.2)] transition-all absolute origin-top-right ${openSettingModal ? 'appearCart' : 'disappearCart'} z-[10000]  w-40 h-fit top-[100%] right-0 bg-white`}>
                        <div className="w-full h-full flex flex-col">
                            <div onClick={() => GoToAccount()} className="hover:bg-gray-300 max-md:active:bg-gray-300 p-4 flex items-center group  ">
                                <p className=" text-[15px] text-black group-hover:text-[#00bfa5] max-md:group-active:text-[#00bfa5]">Tài khoản của tôi</p>
                            </div>
                            <div onClick={() => GoToHistory()} className="hover:bg-gray-300 max-md:active:bg-gray-300 p-4 flex items-center group ">

                                <p className="group-hover:text-[#00bfa5] max-md:group-active:text-[#00bfa5] text-[15px] text-black">Lịch sử mua</p>
                            </div>

                            <div onClick={() => GoToEditMode()} className="hover:bg-gray-300 max-md:active:bg-gray-300 p-4 flex items-center group ">

                                <p className="group-hover:text-[#00bfa5] max-md:group-active:text-[#00bfa5] text-[15px] text-black"> Chỉnh gian hàng</p>
                            </div>
                            <div onClick={() => LogOut()} className="hover:bg-gray-300 p-4 flex max-md:active:bg-gray-300 items-center group">

                                <p className="group-hover:text-[#00bfa5] max-md:group-active:text-[#00bfa5] text-[15px] text-black">Đăng xuất</p>
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    );
}

export default ModalSetting;