'use client'
import ItemText from "./ItemText";

import FacebookIcon from '../../../public/facebook.png'
import Notification from '../../../public/bell.png'
import Question from '../../../public/question.png'
import Global from '../../../public/global.png'
import Default from '../../../public/default-image.png'
import { useCallback, useState } from "react";
import ModalSetting from "../Modal/ModalSetting";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { LoadingType, setLoading } from "@/slice/loadingSlice";
import SpinnerShopee from "../Spinner/SpinnerShopee";
const TopNav = ({Loading}:{Loading:Function}) => {
    const router = useRouter()
    const dispatch =useDispatch()
    const currentUser = useSelector((state:RootState)=>{
        return{
            name:state.user.user.email.split('@')[0],
            image:state.user.user.image
        }
    },shallowEqual)
    const [openSettingModal,setOpenSettingModal] = useState(false)
     const closeModalSetting = useCallback(()=>{
        setOpenSettingModal(false)
      },[])
      const ComingSoon = ()=>{
        dispatch(setLoading({active:true,text:'Chức năng sẽ được cập nhật',type:LoadingType.PENDING}))
      }
    return (
<>
        <div className="flex flex-row justify-between ">
            <div className="flex flex-row space-x-4 max-lg:hidden ">
                <ItemText text="Kênh bán hàng" onClick={()=>ComingSoon()}/>
                <ItemText text="Tải ứng dụng" onClick={()=>ComingSoon()} />
                <ItemText text="Kết nối" onClick={()=>ComingSoon()} type="right" icon={FacebookIcon}  />
            </div>
            <div className="flex flex-row space-x-6 justify-center max-md:space-x-4 max-lg:justify-between max-lg:w-full ">
                <ItemText onClick={()=>ComingSoon()}  extraClass="max-md:text-[11px]" text="Thông báo" type="left" icon={Notification} />
                <ItemText onClick={()=>ComingSoon()}  extraClass="max-md:text-[11px]" text="Tải ứng dụng" type="left" icon={Question} />
                <ItemText onClick={()=>ComingSoon()} extraClass="max-md:text-[11px]"  text="Kết nối" type="left" icon={Global} />
                {currentUser.name != '' ? (

                <ItemText extraClass="relative" image={currentUser.image} isOpa={false} text={currentUser.name} type="left" icon={Default} isImage={true} onMouseEnter={()=>setOpenSettingModal(true)} onMouseLeave={()=>setOpenSettingModal(false)} >
                 <ModalSetting Loading={Loading}  openSettingModal={openSettingModal}closeModalSetting={closeModalSetting} />
                    
                </ItemText>
                ):(
                    <ItemText extraClass="max-md:text-[11px]"  text="Đăng nhập" onClick={()=>{router.push('/login')}} />
                )}
            </div>

        </div>
</>

    );
}

export default TopNav;