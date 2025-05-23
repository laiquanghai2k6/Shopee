'use client'

import SettingBanner from "@/components/Admin/SettingBanner"
import SettingProduct from "@/components/Admin/SettingProduct"
import SideBar from "@/components/Admin/SideBar"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState, useTransition } from "react"
import { useSelector } from "react-redux"
import Back from '../../../public/back.png'
import SettingVouncher from "@/components/Admin/SettingVouncher"
import SettingUsers from "@/components/Admin/SettingUsers"
import SettingRevenue from "@/components/Admin/SettingRevenue"
import Menu from '../../../public/menu.png'
import SpinnerShopee from "@/components/Spinner/SpinnerShopee"
import Image from "next/image"

const items = ['Điều chỉnh Banner', 'Điều chỉnh gian hàng', 'Điều chỉnh vouncher', 'Xem doanh thu', "Cài đặt người dùng", "Trở về"]

const Admin = () => {
    const router = useRouter()
    const [openSidebar, setOpenSidebar] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentUser = useSelector((state: RootState) => state.user.user.email)
    useEffect(() => {
        if (currentUser == '') {
            router.push('/')
        }
    }, [currentUser])
    const BackToHome = () => {
        startTransition(() => {

            router.push('/')
        })
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
                return <SettingVouncher topContent={items[currentIndex]} />
            case 3:
                return <SettingRevenue topContent={items[currentIndex]} />
            case 4:
                return <SettingUsers topContent={items[currentIndex]} />
            default:
                return <SettingBanner topContent={items[currentIndex]} />

        }
    }
    useEffect(() => {
        if (currentIndex === 5) {
            BackToHome();
        }
    }, [currentIndex]);

    if (currentUser == '') return null
    else
        return (
            <div className="flex relative flex-row w-full h-screen">
                {isPending && <SpinnerShopee />}
                {openSidebar && 
                <div className="absolute  top-0 left-0 size-9 mt-2 cursor-pointer  z-2001 flex " onClick={() => setOpenSidebar(false)}>
                    <Image alt="Back" src='/back.png' fill />
                   
                </div>}
                {openSidebar &&
                    <>
                        <SideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}  setCurrentIndex={setIndex} items={items} currentIndex={currentIndex} />

                    </>
                }
                <div className="max-lg:hidden w-[25%]">
                <SideBar  openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}  setCurrentIndex={setIndex} items={items} currentIndex={currentIndex} />
                </div>
                {!openSidebar ? (

                    <div className="w-[10%] lg:hidden bg-[#19232b] flex justify-start">
                        <div className="relative  size-9 ">

                        <Image alt="side-bar" src='/menu.png' fill 
                        className="object-cover cursor-pointer"
                        onClick={() => {
                            setOpenSidebar(true)
                        }} />
                        </div>

                    </div>
                ) : (
                    <div className="w-[10%] bg-[#19232b] flex justify-center">


                    </div>
                )}
                {

                    renderer()
                }

            </div>
        );
}

export default Admin;