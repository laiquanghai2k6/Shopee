'use client'
import { Category } from "../Home/Categories";
import Close from '../../../public/close.png'
import { useEffect, useRef, useState } from "react";
import Add from '../../../public/Add.png'
import Input from "../Input/Input";
import ButtonOrange from "../Button/ButtonOrange";
import { useDispatch } from "react-redux";
import Square from '../../../public/square.png'
import { addCategory, changeCategory, deleteCategory } from "@/slice/categoriesSlice";
import ButtonLightRed from "../Button/ButtonLightRed";
import { LoadingType, setLoading } from "@/slice/loadingSlice";
import { requestAdmin, requestCategory, requestUser } from "@/service/axiosRequest";
type ModalCategoryProps = {
    currentIndex: number,
    categories: Category[],
    CloseModal: Function,
    type?: string,
    setIsLoading: Function
}
export const CreateImage = async (file: File, folder: string) => {


    const data = new FormData()
    data.append('file', file)
    data.append('folder', folder)
    const res2 = await requestUser.post('/upload-user-image', data)
    if (res2.status === 413) {

        return alert('Ảnh quá lớn')
    }
    return res2.data

}

const ModalCategory = ({ currentIndex, setIsLoading, categories, CloseModal, type = 'change' }: ModalCategoryProps) => {
    const [isEnter, setIsEnter] = useState(false)
    const [currentImage, setCurrentImage] = useState(type == 'change' ? categories[currentIndex]?.image : "")
    const [file, setFile] = useState<File | undefined>(undefined)
    const dispatch = useDispatch()
    const nameRef = useRef<HTMLInputElement | null>(null)
    const Save = async () => {
        if (type == 'change') {
            try {
                let newImage = ''
                setIsLoading(true)
                if (file) {
                    newImage = await CreateImage(file, 'category')
                }
                console.log(file)
                const data = {
                    name: nameRef.current?.value,
                    image: file == undefined ? categories[currentIndex].image : newImage
                }

                const res = await requestAdmin.patch(`/update-category/${categories[currentIndex].id}`, data)
                if (res.status == 403) {
                    setIsLoading(false)
                    return dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Bạn không phải admin!' }))

                }
                if (res.status === 413) {
                    setIsLoading(false)
                    return dispatch(setLoading({ active: true, text: 'Ảnh quá lớn', type: LoadingType.ERROR }))
                }
                dispatch(changeCategory(res.data as Category))
                dispatch(setLoading({ active: true, type: LoadingType.SUCCESS, text: 'Sửa thể loại thành công!' }))
                setIsLoading(false)

            } catch (e) {
                console.log(e)
                setIsLoading(false)
                dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Lỗi thay đổi thể loại!' }))

            }

        } else {
            try {
                let newImage = ''

                setIsLoading(true)
                if (file) {
                    newImage = await CreateImage(file, 'category')
                }
                const data = {
                    name: nameRef.current?.value,
                    image: newImage
                }
                console.log(file)

                const res = await requestAdmin.post(`/create-category`, data)
                if (res.status == 403) {
                    setIsLoading(false)

                    return dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Bạn không phải admin!' }))

                }
                if (res.status === 413) {
                    setIsLoading(false)

                    return dispatch(setLoading({ active: true, text: 'Ảnh quá lớn', type: LoadingType.ERROR }))
                }
                dispatch(addCategory(res.data as Category))
                dispatch(setLoading({ active: true, type: LoadingType.SUCCESS, text: 'Thay đổi thể loại thành công!' }))
                setIsLoading(false)

            } catch (e) {
                console.log(e)
                setIsLoading(false)
                dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Lỗi thay đổi thể loại!' }))

            }

        }
        CloseModal()

    }
    const Delete = () => {
        dispatch(deleteCategory(currentIndex))
        CloseModal()

    }
    return (
        <div className="h-full min-w-screen bg-black/50  z-10000 flex fixed items-start select-none  justify-center">
            <div className="w-200 max-h-150 bg-[#f5f5f5] flex mt-[10vh] p-2 select-none flex-col">
                <div className="flex justify-end mr-3 h-7 w-full ">
                    <img src={typeof Close == 'string' ? Close : Close.src} className="size-7 cursor-pointer" onClick={() => CloseModal()} />
                </div>

                <p className="text-[25px]">Chỉnh ảnh:</p>
                {type == 'change' ? (
                    <>
                        <div className="size-50 cursor-pointer" onClick={() => {
                            document.getElementById('category')?.click()
                        }} onMouseEnter={() => setIsEnter(true)} onMouseLeave={() => setIsEnter(false)}>
                            {isEnter ? (

                                <div className="size-full bg-contain bg-no-repeat opacity-90 bg-center flex items-center justify-center"
                                    style={{ backgroundImage: `url(${currentImage})` }}
                                >
                                    <div className="flex flex-row gap-3 items-center">
                                        <img src={typeof Add == 'string' ? Add : Add.src} className="size-10" />
                                        <p className="text-[25px]">Đổi ảnh </p>

                                    </div>
                                </div>
                            ) : (

                                <img src={currentImage} className="size-full object-contain" />
                            )}
                            <input className="hidden" id="category" type="file" onChange={(e) => {
                                if (!e.target?.files?.[0].type.startsWith('image'))
                                    return dispatch(setLoading({active:true,text:'Vui lòng chọn ảnh',type:LoadingType.ERROR}))
                                setFile(e.target?.files?.[0] as File)
                                const url = URL.createObjectURL(e.target?.files?.[0] as File)
                                setCurrentImage(url)
                            }} />
                        </div>
                        <p className="text-[25px] mt-3">Chỉnh tên:</p>
                        <Input defaultValue={categories[currentIndex]?.name} ref={nameRef} />
                    </>
                ) : (
                    <>
                        <div className="size-50 cursor-pointer" onClick={() => {
                            document.getElementById('category')?.click()
                        }} onMouseEnter={() => setIsEnter(true)} onMouseLeave={() => setIsEnter(false)}>
                            {isEnter ? (
                                (currentImage == "" ? (

                                    <div className="size-full border-[2px] flex items-center justify-center"

                                    >
                                        <div className="flex flex-row gap-3 items-center">
                                            <img src={typeof Add == 'string' ? Add : Add.src} className="size-10" />
                                            <p className="text-[25px]">Đổi ảnh</p>

                                        </div>
                                    </div>
                                ) : (
                                    <div className="size-full  bg-contain bg-no-repeat bg-center flex items-center justify-center"
                                        style={{ backgroundImage: `url(${currentImage})` }}
                                    >
                                        <div className="flex flex-row gap-3 items-center">
                                            <img src={typeof Add == 'string' ? Add : Add.src} className="size-10" />
                                            <p className="text-[25px]">Đổi ảnh </p>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                (currentImage == '' ? (

                                    <div className="size-full border-[2px] ">

                                    </div>
                                ) : (

                                    (currentImage != '' && <img src={currentImage} className="size-full object-contain" />)
                                ))
                            )}
                            <input className="hidden" id="category" type="file" onChange={(e) => {
                                if (!e.target?.files?.[0].type.startsWith('image'))
                                    return dispatch(setLoading({active:true,text:'Vui lòng chọn ảnh',type:LoadingType.ERROR}))
                                setFile(e.target?.files?.[0] as File)
                                const url = URL.createObjectURL(e.target?.files?.[0] as File)
                                setCurrentImage(url)
                            }} />
                        </div>
                        <p className="text-[25px] mt-3">Chỉnh tên:</p>
                        <Input ref={nameRef} />
                    </>
                )}
                {type == 'change' ? (
                    <div className="flex flex-row items-center justify-between">
                        <ButtonLightRed text="Xoá" extraClass="w-[40%] h-12 mt-3 " onClick={() => Delete()} />
                        <ButtonOrange text="Lưu" extraClass="w-[40%] h-12 mt-3 self-center" onClick={() => Save()} />

                    </div>

                ) : (
                    <ButtonOrange text="Lưu" extraClass="w-[40%] h-12 mt-3 self-center" onClick={() => Save()} />

                )}

            </div>
        </div>
    );
}

export default ModalCategory;