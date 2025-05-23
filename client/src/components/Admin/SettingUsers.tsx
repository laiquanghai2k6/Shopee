'use client'
import { Role, UserClient, useUser } from "@/hooks/useUser";
import Input from "../Input/Input";
import SpinnerShopee from "../Spinner/SpinnerShopee";
import { useCallback, useMemo, useState } from "react";
import ModalUser from "../Modal/ModalUser";
import { requestAdmin } from "@/service/axiosRequest";
import { useDispatch } from "react-redux";
import { LoadingType, setLoading } from "@/slice/loadingSlice";
import { useQueryClient } from "@tanstack/react-query";

type SettingUsersProps = {
    topContent: string
}
export const debounce = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
    let timeOut: NodeJS.Timeout | undefined = undefined
    return (...args: Parameters<T>) => {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            callback(...args)
        }, delay)
    }
}


const SettingUsers = ({ topContent }: SettingUsersProps) => {
    const [debounceInput, setDebounceInput] = useState('')
    const [input, setInput] = useState('')
    const { isLoading, data } = useUser(debounceInput)
    const dispatch = useDispatch()
    const [loading, setIsLoading] = useState(false)
    const queryClient = useQueryClient();
    const [modal, setModal] = useState({
        active: false,
        id: ''
    })
    const closeModal = useCallback(() => {
        setModal((prev) => ({ ...prev, active: false }))
    }, [])
    const Save = async (id: string, role: Role) => {
        try {
            setIsLoading(true)
            const res = await requestAdmin.patch(`/update-user/${id}`, { role: role })
            if (res.status == 403) {
                setIsLoading(false)
                return dispatch(setLoading({ active: true, type: LoadingType.ERROR, text: 'Bạn không phải admin!' }))

            }
            setIsLoading(false)
            queryClient.setQueryData(['users', debounceInput], (oldData: UserClient[]) => {
                const temp = [...oldData]
                const idx = temp.findIndex((u) => u.id == id)
                temp[idx].role = role
                return temp
            })
            dispatch(setLoading({ active: true, text: 'Cập nhật người dùng thành công!', type: LoadingType.SUCCESS }))
        } catch (e) {
            console.log(e)
            setIsLoading(false)
            dispatch(setLoading({ active: true, text: 'Lỗi cập nhật người dùng!', type: LoadingType.ERROR }))


        }
        closeModal()
    }
    const changeDebounce = (value: string) => {
        setDebounceInput(value)
    }
    const debounceSearch = useMemo(() => {
        return debounce(changeDebounce, 200)
    }, [])
    return (
        <>
            {isLoading || loading && <SpinnerShopee />}
            {modal.active && <ModalUser id={modal.id} Save={Save} CloseModal={closeModal} />}
            <div className="min-h-screen overflow-x-hidden w-[75%] max-md:w-[90%]  flex items-center overflow-y-auto  flex-col pb-10">
                <div className="h-20 select-none w-full bg-[#F8F8F8] flex items-center justify-center border-b-1">
                    <p className={` text-[25px] font-bold `}>{topContent}</p>
                </div>
                <div className="p-30 max-md:p-5 w-full h-fit flex flex-col items-center">
                    <Input value={input} onChange={(e) => {
                        setInput(e.target.value)
                        debounceSearch(e.target.value)
                    }} extraClassParent="select-none" placeholder="Tìm kiếm người dùng" />
                    <div className="flex flex-col items-center h-200 bg-blue-200 mt-5 overflow-y-auto overflow-x-hidden w-full">

                        {data?.map((user, i) => {
                            return (
                                <div key={i} className=" bg-[#f5f5f5] w-[80%]  min-h-25 px-10 max-md:px-1 items-center justify-between  my-5 flex shadow-[0px_0px_7px_rgba(0,0,0,0.2)] max-md:h-25 flex-row">
                                    <p>{user.email}</p>
                                    <div onClick={() => setModal({ active: true, id: user.id })} className="h-fit hover:border-1  cursor-pointer rounded-md w-fit p-1 bg-red-200 flex items-center justify-center">

                                        <p>{user.role == 'client' ? 'Khách hàng' : 'Admin'}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingUsers;