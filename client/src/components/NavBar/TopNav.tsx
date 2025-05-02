'use client'
import ItemText from "./ItemText";

import FacebookIcon from '../../../public/facebook.png'
import Notification from '../../../public/bell.png'
import Question from '../../../public/question.png'
import Global from '../../../public/global.png'
import Default from '../../../public/default-image.png'
import { useCallback, useState } from "react";
import ModalSetting from "../Modal/ModalSetting";
const TopNav = () => {
    const [openSettingModal,setOpenSettingModal] = useState(false)
     const closeModalSetting = useCallback(()=>{
        setOpenSettingModal(false)
      },[])
    return (

        <div className="flex flex-row justify-between ">
            <div className="flex flex-row space-x-4 max-lg:hidden ">
                <ItemText text="Kênh bán hàng" />
                <ItemText text="Tải ứng dụng" />
                <ItemText text="Kết nối" type="right" icon={FacebookIcon} />
            </div>
            <div className="flex flex-row space-x-6 justify-center max-md:space-x-4 max-lg:justify-between max-lg:w-full ">
                <ItemText text="Thông báo" type="left" icon={Notification} />
                <ItemText text="Tải ứng dụng" type="left" icon={Question} />
                <ItemText text="Kết nối" type="left" icon={Global} />
                <ItemText extraClass="relative" isOpa={false} text="lqhzzz" type="left" icon={Default} isImage={true} onMouseEnter={()=>setOpenSettingModal(true)} onMouseLeave={()=>setOpenSettingModal(false)} >
                 <ModalSetting openSettingModal={openSettingModal}closeModalSetting={closeModalSetting} />
                    
                </ItemText>
            </div>

        </div>
    );
}

export default TopNav;