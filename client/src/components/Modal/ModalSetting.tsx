'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ModalSettingProp = {
    openSettingModal: boolean,
    closeModalSetting:Function
}


const ModalSetting = ({ openSettingModal,closeModalSetting }: ModalSettingProp) => {
    const [shouldRenderModal, setShouldRenderModal] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (openSettingModal) {
            setShouldRenderModal(true)
        } else {
            const timeout = setTimeout(() => setShouldRenderModal(false), 100)
            return () => clearTimeout(timeout)
        }
    }, [openSettingModal])
    const GoToAccount = ()=>{
        closeModalSetting()
        router.push('/user')
    }
    const GoToHistory = ()=>{
        closeModalSetting()
        router.push('/history')
    }
    return (
        <>
            {
                shouldRenderModal && (

                    <div className={`shadow-[0px_0px_7px_rgba(0,0,0,0.2)] transition-all absolute origin-top-right ${openSettingModal ? 'appearCart' : 'disappearCart'} z-[10000]  w-40 h-fit top-[100%] right-0 bg-white`}>
                        <div className="w-full h-full flex flex-col">
                            <div onClick={()=>GoToAccount()} className="hover:bg-gray-300 max-md:active:bg-gray-300 p-4 flex items-center group  ">
                                <p className=" text-[15px] text-black group-hover:text-[#00bfa5] max-md:group-active:text-[#00bfa5]">Tài khoản của tôi</p>
                            </div>
                            <div onClick={()=>GoToHistory()} className="hover:bg-gray-300 max-md:active:bg-gray-300 p-4 flex items-center group ">

                                <p className="group-hover:text-[#00bfa5] max-md:group-active:text-[#00bfa5] text-[15px] text-black">Lịch sử mua</p>
                            </div>

                            <div className="hover:bg-gray-300 p-4 flex max-md:active:bg-gray-300 items-center group">

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