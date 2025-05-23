'use client'
import Default from '../../../public/default-image.png'
import React, { useEffect, useState } from "react";
import { requestUser } from "@/service/axiosRequest";
import { useDispatch, useSelector } from "react-redux";
import { LoadingType, setLoading } from "@/slice/loadingSlice";
import { RootState } from "@/store/store";
import SpinnerShopee from "@/components/Spinner/SpinnerShopee";
import { uploadUserImage } from "@/slice/userSlice";
import { CreateImage } from "@/components/Modal/ModalCategory";
import { ConvertToVND } from "../cart/page";
const UserSetting = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const [currentFile, setCurrentFIle] = useState<File | undefined>(undefined)
    const [currentImage, setCurrentImage] = useState('')
    const [loading, Loading] = useState(false)
    useEffect(() => {
        if (user) {
            setCurrentImage(user.image)
        }
    }, [user])
    const dispatch = useDispatch()
    const ChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            // const data = new FormData()
            // data.append('file', event.target?.files?.[0] as File)
            // data.append('folder', 'user-image')
            // console.log('data',data)
            Loading(true)
            const response = await CreateImage(event.target?.files?.[0] as File,'user-image')
            const dataForm = {
                id: user.id,
                url: response
            }
            if (response.status === 413) {
                Loading(false)

                return dispatch(setLoading({ active: true, text: 'Ảnh quá lớn', type: LoadingType.ERROR }))
            }
            const res = await requestUser.post('/user-image', dataForm)

            Loading(false)
            dispatch(uploadUserImage(response))
            dispatch(setLoading({ active: true, text: 'Tải ảnh thành công', type: LoadingType.SUCCESS }))
            setCurrentFIle(currentFile)
            setCurrentImage(response)
        } catch (e: any) {
            Loading(false)
            dispatch(setLoading({ active: true, text: 'Lỗi tải ảnh', type: LoadingType.ERROR }))
            console.log(e)
        }
    }
    return (
        <div className="min-h-screen bg-[#f5f5f5] w-full flex justify-center">
            {loading && <SpinnerShopee />}
            <div className="w-200 p-5 bg-white flex flex-col h-fit rounded-sm mt-5">
                <p className="text-[20px]">Hồ sơ của tôi</p>
                <div className="h-[1px] mt-3 w-full border-t-[1px] border-gray-200"></div>
                <div className="flex flex-row">
                    <div className="flex flex-col  w-[20%] h-fit ">
                        <p className="mt-10">Email</p>
                        <p className="mt-10">Số dư ví:</p>
                    </div>
                    <div className="flex flex-col w-[40%] h-fit">
                        <p className="mt-10">{user.email}</p>
                        <p className="mt-10">{`${ConvertToVND(user.money)}đ`}</p>

                    </div>
                    <div className="border-[1px] border-gray-300 select-none flex w-[40%] flex-col ml-5 h-70 justify-center items-center">
                        <div className="size-20 rounded-full bg-gray-200">
                            <img src={currentImage == '' ? typeof Default == 'string' ? Default : Default.src : currentImage} className="size-full object-cover" />
                        </div>
                        <div onClick={() => document.getElementById('user-image')?.click()} className="w-25 h-10 mt-3 hover:bg-gray-200 select-none border-[1px] border-gray-300 text-gray-500 cursor-pointer flex justify-center items-center">
                            <p>Chọn ảnh</p>
                        </div>
                        <input value={currentFile ? currentFile.name : ''} id="user-image" type="file" className="hidden" onChange={(e) => ChangeImage(e)} />
                        <p className="w-[80%] h-fit mt-3 text-gray-500">Dụng lượng file tối đa 1 MB.
                            Định dạng:.JPEG, .PNG</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSetting;