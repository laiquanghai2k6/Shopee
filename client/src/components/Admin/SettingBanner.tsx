'use client'
// import { Abel } from 'next/font/google';
import Add from '../../../public/Add.png'
import ModalBanner from "@/components/Modal/ModalBanner"
import React, {  useCallback, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {  setBanner } from '@/slice/bannerSlice';
import { CreateImage } from '../Modal/ModalCategory';
import SpinnerShopee from '../Spinner/SpinnerShopee';
import { LoadingType, setLoading } from '@/slice/loadingSlice';
import { requestAdmin } from '@/service/axiosRequest';
// const abel = Abel({ subsets: ['latin'], weight: '400' });

type SettingBanner = {
    topContent: string
}
const SettingBanner = ({ topContent }: SettingBanner) => {
    const [indexBanner, setIndexBanner] = useState(1)
    const [loading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const banner = useSelector((state: RootState) => state.banner)
    const dispatch = useDispatch()
    const [isEnter, setIsEnter] = useState({
        bgLogin: false,
        bannerMain: false,
        banner1: false,
        banner2: false,
    })

    const enterBgLogin = () => {
        setIsEnter((prev) => ({ ...prev, bgLogin: true }))
    }
    const leaveBgLogin = () => {
        setIsEnter((prev) => ({ ...prev, bgLogin: false }))

    }
    const closeBanner = useCallback(() => {
        setModal(false)
    }, [])

    const SaveBanner = async (type: string, value: string, bannerNav?: string[]) => {
        switch (type) {
            case 'bgLogin':

                const res1 = await requestAdmin.patch(`/update-banner`, { ...banner.banner, bgLogin: value })
                if (res1.status == 403) {
                    setIsLoading(false)
                    return dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Bạn không phải admin!' }))

                }
                dispatch(setBanner({ ...banner.banner, bgLogin: value }))

                break;

            case 'bgNav':
                try {
                    setIsLoading(true)

                    const res2 = await requestAdmin.patch(`/update-banner`, { ...banner.banner, bgNavigate: bannerNav })
                    if (res2.status == 403) {
                        setIsLoading(false)
                        return dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Bạn không phải admin!' }))

                    }

                    dispatch(setBanner({ ...banner.banner, bgNavigate: bannerNav ?? [] }))
                    setIsLoading(false)
                    dispatch(setLoading({ active: true, text: 'Tải ảnh lên thành công', type: LoadingType.SUCCESS }))
                } catch (e) {
                    console.log(e)
                    setIsLoading(false)
                    dispatch(setLoading({ active: true, text: 'Tải ảnh thất bại', type: LoadingType.ERROR }))
                }

                break;

            case 'bg1':
                const res3 = await requestAdmin.patch(`/update-banner`, { ...banner.banner, bg1: value })
                if (res3.status == 403) {
                    setIsLoading(false)
                    return dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Bạn không phải admin!' }))

                }
                dispatch(setBanner({ ...banner.banner, bg1: value }))

                break;

            case 'bg2':
                const res4 = await requestAdmin.patch(`/update-banner`, { ...banner.banner, bg2: value })
                if (res4.status == 403) {
                    setIsLoading(false)
                    return dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Bạn không phải admin!' }))

                }
                dispatch(setBanner({ ...banner.banner, bg2: value }))



                break;
            default:
                return;
        }
        closeBanner()
    }
    const HandlerImage = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        if (!e.target?.files?.[0].type.startsWith('image'))
            return dispatch(setLoading({active:true,text:'Vui lòng chọn ảnh',type:LoadingType.ERROR}))
        try {
            setIsLoading(true)
            const url = await CreateImage(e.target?.files?.[0] as File, 'banner')
             if (url.status === 413) {
                       
                       return dispatch(setLoading({active:true,text:'Ảnh quá lớn',type:LoadingType.ERROR}))
                   }
            SaveBanner(type, url)
            setIsLoading(false)
            dispatch(setLoading({ active: true, text: 'Tải ảnh lên thành công', type: LoadingType.SUCCESS }))
        } catch (e) {
            console.log(e)
            setIsLoading(false)
            dispatch(setLoading({ active: true, text: 'Tải ảnh thất bại', type: LoadingType.ERROR }))


        }
    }

    return (
        <>
            {loading && <SpinnerShopee />}
            {modal && <ModalBanner setIsLoading={setIsLoading} bgNavigate={banner.banner.bgNavigate} SaveBanner={SaveBanner} closeBanner={closeBanner} />}

            <div className="min-h-screen w-[75%] max-md:w-[90%] bg-[#f5f5f5] flex items-center overflow-y-auto  flex-col pb-10">

                <div className="h-20 select-none w-full bg-[#F8F8F8] flex items-center justify-center border-b-1">
                    <p className={` text-[25px] font-bold `}>{topContent}</p>
                </div>

                <div className="w-full select-none bg-[#f5f5f5]  min-h-300">
                    <div className="flex flex-row justify-start w-full my-5 ml-2">

                        <p className="text-[25px]">Đổi ảnh nền ở màn hình đăng nhập:</p>
                    </div>
                    <div onClick={() => {
                        document.getElementById('bg-login')?.click()
                    }} className="w-full flex p-5 aspect-[16/9] select-none bg-[#f5f5f5] cursor-pointer" onMouseEnter={() => enterBgLogin()} onMouseLeave={() => leaveBgLogin()}>
                        {isEnter.bgLogin ? (
                            <div className={`size-full bg-cover opacity-90  bg-center flex items-center justify-center`} style={{ backgroundImage: `url(${banner.banner.bgLogin})` }}>
                                <div className="flex flex-row gap-3 items-center">
                                    <img src={typeof Add == 'string' ? Add : Add.src} className="size-10" />
                                    <p className="text-[25px]">Đổi ảnh</p>

                                </div>
                            </div>
                        ) : (

                            <img src={banner.banner.bgLogin} className="size-full object-cover" />
                        )}
                        <input className="hidden" id="bg-login" type="file" onChange={async (e) => HandlerImage(e, 'bgLogin')} />
                    </div>
                    <div className="flex flex-row justify-start w-full my-5 ml-2">

                        <p className="text-[25px]">Đổi ảnh banner điều hướng:</p>
                    </div>
                    <div onClick={() => {
                        setModal(true)
                    }} className="w-full p-5 relative aspect-[16/9] select-none bg-[#f5f5f5]  select-none cursor-pointer" onMouseEnter={() => setIsEnter((prev) => ({ ...prev, bannerMain: true }))} onMouseLeave={() => setIsEnter((prev) => ({ ...prev, bgLogin: false }))}>

                        <div className={`size-full  transition-transform
                                 duration-300  bg-cover opacity-90 bg-center flex items-center justify-center`} >
                            <div className="flex size-full [scrollbar-width:none] [-ms-overflow-style:none] flex-row scroll-snap-x scroll-snap-mandatory scroll-smooth overflow-x-auto">
                                {banner.banner.bgNavigate.map((img, i) => {
                                    return (

                                        <img key={`img-nav-setting-${i}`} src={img}
                                            id={`slide-setting-${i + 1}`}
                                            className="size-full object-cover
                                             cursor-pointer
                                             scroll-snap-start
                                             size-full
                                             flex-[1_0_100%]
                                             " />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="absolute bottom-0 flex gap-3 z-10 mb-5 left-[50%] max-md:left-[40%] ">
                            {Array.from({ length: banner.banner.bgNavigate.length }, (_, i) => {

                                if (indexBanner == i + 1) {
                                    return (
                                        <div key={`nav-to-${i}`} className="size-5 max-md:size-3 mb-3 navbar rounded-full cursor-pointer"></div>
                                    )
                                } else {
                                    return (
                                        <div key={`nav-to-${i}`} className="size-5 max-md:size-3 mb-3 bg-gray-500 opacity-75 hover:opacity-100 rounded-full cursor-pointer" onClick={(e) => {
                                            const currentElement = document.getElementById(`slide-setting-${i + 1}`)
                                            e.stopPropagation()
                                            currentElement?.scrollIntoView({
                                                block: 'nearest',
                                                inline: 'start',
                                            })
                                            setIndexBanner(i + 1)
                                        }}></div>
                                    )
                                }


                            })}

                        </div>

                    </div>
                    <div className="flex flex-row justify-start w-full my-5 ml-2">

                        <p className="text-[25px]">Đổi ảnh banner con:</p>
                    </div>
                    <div onClick={() => {
                        document.getElementById('bg-banner1')?.click()
                    }} className="w-[50%] p-5 aspect-[16/9] select-none bg-[#f5f5f5] cursor-pointer" onMouseEnter={() => setIsEnter((prev) => ({ ...prev, banner1: true }))} onMouseLeave={() => setIsEnter((prev) => ({ ...prev, banner1: false }))}>
                        {isEnter.banner1 ? (
                            <div className={`size-full bg-cover opacity-90 bg-center flex items-center justify-center`} style={{ backgroundImage: `url(${banner.banner.bg1})` }}>
                                <div className="flex flex-row gap-3 items-center">
                                    <img src={typeof Add == 'string' ? Add : Add.src} className="size-10" />
                                    <p className="text-[25px]">Đổi ảnh</p>

                                </div>
                            </div>
                        ) : (

                            <img src={banner.banner.bg1} className="size-full object-cover" />
                        )}
                        <input className="hidden" id="bg-banner1" type="file" onChange={(e) => HandlerImage(e, 'bg1')} />
                    </div>
                    <div onClick={() => {
                        document.getElementById('bg-banner2')?.click()
                    }} className="w-[50%] p-5 aspect-[16/9] select-none bg-[#f5f5f5] cursor-pointer" onMouseEnter={() => setIsEnter((prev) => ({ ...prev, banner2: true }))} onMouseLeave={() => setIsEnter((prev) => ({ ...prev, banner2: false }))}>
                        {isEnter.banner2 ? (
                            <div className={`size-full bg-cover opacity-90 bg-center flex items-center justify-center`} style={{ backgroundImage: `url(${banner.banner.bg2})` }}>
                                <div className="flex flex-row gap-3 items-center">
                                    <img src={typeof Add == 'string' ? Add : Add.src} className="size-10" />
                                    <p className="text-[25px]">Đổi ảnh</p>

                                </div>
                            </div>
                        ) : (

                            <img src={banner.banner.bg2} className="size-full object-cover" />
                        )}
                        <input className="hidden" id="bg-banner2" onChange={(e) => HandlerImage(e, 'bg2')} type="file" />
                    </div>

                    <div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingBanner;