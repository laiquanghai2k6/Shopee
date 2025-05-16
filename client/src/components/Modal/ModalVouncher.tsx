'use client'
import { addVouncher, changeVouncher, Vouncher } from '@/slice/vouncherSlice';
import Close from '../../../public/close.png'
import Input from '../Input/Input';
import { useRef, useState } from 'react';
import { ConvertToVND } from '@/app/cart/page';

import ButtonOrange from '../Button/ButtonOrange';
import { useDispatch } from 'react-redux';
import { requestAdmin } from '@/service/axiosRequest';
import { LoadingType, setLoading } from '@/slice/loadingSlice';
import SpinnerShopee from '../Spinner/SpinnerShopee';
type ModalVouncherProps = {
    CloseModal: Function,
    vouncher: Vouncher,
    type: string,
    setIsLoading:Function
}
const ModalVouncher = ({ CloseModal, vouncher,setIsLoading, type }: ModalVouncherProps) => {
    const time = type == 'change' ? vouncher.expire : Date.now();
    const formatDate = new Date(time)
    const day = String(formatDate.getDate()).padStart(2, '0')
    const month = String(formatDate.getMonth() + 1).padStart(2, '0')
    const year = String(formatDate.getFullYear())
    const maxDiscount = type == 'change' ? ConvertToVND(parseInt(vouncher.maxDiscount)) : '0'
    const [date, setDate] = useState({
        day,
        month,
        year
    })
    const dispatch = useDispatch()
    const [maxDiscountInput, setMaxDiscountInput] = useState(maxDiscount);
    const [discountInput, setDiscountInput] = useState(type == 'change' ? vouncher.discount : '');


    const Save = async () => {
        const timeString = `${date.year}-${date.month}-${date.day}`
        if (maxDiscountInput == '' || discountInput == '')
            return alert('Vui lòng điền đầy đủ!')

        if (maxDiscountInput.length > 13)
            return alert('Sô tiền giảm quá lớn!')
        if (discountInput.length >= 3 && discountInput != '100')
            return alert('Giảm tối đa 100%')

        const timeDate = new Date(timeString)
        const maxDiscountNum = maxDiscountInput.replaceAll('.', '')
        if (type == 'change') {
            const newVouncher: Vouncher = {
                id: vouncher.id,
                discount: discountInput,
                maxDiscount: maxDiscountNum,
                expire: timeDate
            }
            try{
                setIsLoading(true)
                await requestAdmin.patch('/update-vouncher',newVouncher)
                dispatch(changeVouncher(newVouncher))
                setIsLoading(false)
                dispatch(setLoading({active:true,type:LoadingType.SUCCESS,text:'Điều chỉnh vouncher thành công!'}))
            }catch(e){
                console.log(e)
                setIsLoading(false)
                dispatch(setLoading({active:true,type:LoadingType.ERROR,text:'Điều chỉnh vouncher thất bại!'}))

            }
        }else{
             const newVouncher: Vouncher = {
                
                discount: discountInput,
                maxDiscount: maxDiscountNum,
                expire: timeDate
            }
            try{
                setIsLoading(true)
               
                const res = await requestAdmin.post('/create-vouncher',newVouncher)
               console.log(res)
               dispatch(addVouncher(res.data as Vouncher))
                if(res.status == 400){
                dispatch(setLoading({active:true,type:LoadingType.ERROR,text:'Tạo vouncher thất bại!'}))

                }else
                dispatch(setLoading({active:true,type:LoadingType.SUCCESS,text:'Tạo vouncher thành công!'}))
                setIsLoading(false)
            }catch(e){
                console.log(e)
                setIsLoading(false)
                dispatch(setLoading({active:true,type:LoadingType.ERROR,text:'Tạo vouncher thất bại!'}))

            }
        }

        CloseModal()

    }
    return (
        <>
 
        <div className="h-full min-w-screen bg-black/50  z-10000 flex fixed items-start select-none  justify-center">
            <div className="w-200 max-h-150 bg-[#f5f5f5] flex mt-[10vh] p-2 select-none flex-col">
                <div className="flex justify-end mr-3 h-7 w-full ">
                    <img src={typeof Close == 'string' ? Close : Close.src} className="size-7 cursor-pointer" onClick={() => CloseModal()} />
                </div>
                <div className='flex flex-row gap-3 h-15 items-center '>
                    <p className='w-fit whitespace-nowrap  flex items-center '>Giảm giá:</p>
                    <Input type='number' onChange={

                        (e) => {
                            const raw = e.target.value.replace(/\D/g, '')
                            setDiscountInput(raw)

                        }} extraClassParent='mb-5' extraClass='mt-0' value={discountInput} />
                    <p >%</p>
                </div>
                <div className='flex flex-row gap-3 h-15 items-center '>
                    <p className='w-fit whitespace-nowrap  flex items-center '>Giảm giá tối đa:</p>
                    <Input onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '')
                        const formatted = new Intl.NumberFormat('vi-VN').format(Number(raw));
                        setMaxDiscountInput(formatted);
                    }} extraClassParent='mb-5' extraClass='mt-0' type='text' value={maxDiscountInput} />
                    <p >VNĐ</p>
                </div>
                <div className='flex flex-row gap-3 h-15 items-center '>
                    <p className='w-fit whitespace-nowrap  flex items-center '>Hạn sử dụng:</p>
                    <select className='cursor-pointer border-1' onChange={(e) => setDate((prev) => ({ ...prev, day: e.target.value }))} value={date.day}>
                        {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map((v) => {
                            return (
                                <option key={v} value={v}>
                                    {v}
                                </option>
                            )
                        })}
                    </select>
                    <select className='cursor-pointer border-1' onChange={(e) => setDate((prev) => ({ ...prev, month: e.target.value }))} value={date.month}>
                        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((v) => {
                            return (
                                <option key={v} value={v}>
                                    {v}
                                </option>
                            )
                        })}
                    </select>
                    <select className='cursor-pointer border-1' onChange={(e) => setDate((prev) => ({ ...prev, year: e.target.value }))} value={date.year}>
                        {Array.from({ length: 100 }, (_, i) => String(2030 - i)).map((v) => {
                            return (
                                <option key={v} value={v}>
                                    {v}
                                </option>
                            )
                        })}
                    </select>

                </div>
                <ButtonOrange  text='Lưu' onClick={() => Save()} extraClass='p-3 select-none' />
            </div>
        </div>
         </>
    );
}

export default ModalVouncher;