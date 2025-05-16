'use client'

import SettingBanner from "@/components/Admin/SettingBanner"
import SettingProduct from "@/components/Admin/SettingProduct"
import SideBar from "@/components/Admin/SideBar"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Back from '../../../public/back.png'
import SettingVouncher from "@/components/Admin/SettingVouncher"
import SettingUsers from "@/components/Admin/SettingUsers"


const items = ['Điều chỉnh Banner', 'Điều chỉnh gian hàng', 'Điều chỉnh vouncher', 'Xem doanh thu',"Cài đặt người dùng"]

const Admin = () => {
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentUser = useSelector((state: RootState) => state.user.user.email)
    useEffect(() => {
        if (currentUser == '') {
            router.push('/')
        }
    }, [currentUser])
    const BackToHome = ()=>{
        router.push('/')
    }
    const setIndex = useCallback((i: number) => {
        setCurrentIndex(i)
    }, [])
    const renderer = () => {
        switch (currentIndex) {
            case 0:
                return <SettingBanner topContent={items[currentIndex]} />

            case 1:
                return <SettingProduct topContent={items[currentIndex]} />
            case 2:
                return <SettingVouncher topContent={items[currentIndex]}/>
            case 3:
                return <div>{items[currentIndex]}</div>
            case 4:
                return <SettingUsers topContent={items[currentIndex]} />
            default:
                return <SettingBanner topContent={items[currentIndex]} />
                
        }
    }

    if (currentUser == '') return null
    else
        return (
            <div className="flex relative flex-row w-full">
                <div className="absolute top-0 left-0 size-9 mt-2 cursor-pointer  z-100 flex " onClick={()=>BackToHome()}>

                    <img src={typeof Back == 'string' ? Back : Back.src} className="size-full"  />
                </div>
                <SideBar setCurrentIndex={setIndex} items={items} currentIndex={currentIndex} />
                {
                    renderer()
                }

            </div>
        );
}

export default Admin;