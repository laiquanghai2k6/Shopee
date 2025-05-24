'use client'
import { useState } from 'react'
import Close from '../../../public/close.png'
import ButtonOrange from '../Button/ButtonOrange'
import axios from 'axios'
import { requestUser } from '@/service/axiosRequest'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { increase, resetUser } from '@/slice/userSlice'
import { LoadingType, setLoading } from '@/slice/loadingSlice'

type ModalPaymentProp = {
    closeModal: Function,
    startTransition: Function,
    Loading:Function
}
const Card = [
    { text: '10.000', value: 10000 },
    { text: '20.000', value: 20000 },
    { text: '50.000', value: 50000 },
    { text: '100.000', value: 100000 },
    { text: '200.000', value: 200000 },
    { text: '500.000', value: 500000 },
    { text: '1.000.000', value: 1000000 },
    { text: '5.000.000', value: 5000000 },


]
const ModalPayment = ({ closeModal, startTransition ,Loading}: ModalPaymentProp) => {
    const [currentCart, setCurrentCard] = useState(-1)
    const userId = useSelector((state:RootState)=>state.user.user.id)
    const [select,setSelect] = useState(1)
    const dispatch = useDispatch()
    const PaymentHandler = async (currentCard:number) => {
        if(currentCard == -1) return dispatch(setLoading({active:true,text:'Vui lòng chọn mệnh giá',type:LoadingType.ERROR}))
        if(select == 2){
            const amount = currentCard == -1 ? Card[0].value / 25973 : Card[currentCard].value / 25973;
            const unit_amount = Math.round(amount * 100);
            
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/create-order`, {
              amount: unit_amount,
              amountVND:Card[currentCard]
            });
            startTransition(()=>{
        
              window.location.href = res.data.url;
            })
        }else{
            try {
                const data = {
                    id:userId,
                    amount:Card[currentCard].value
                }
                Loading(true)
                const res = await requestUser.post('/increase-money',data)
                dispatch(increase(Card[currentCard].value))
                Loading(false)
                dispatch(setLoading({active:true,text:'Thanh toán thành công!',type:LoadingType.SUCCESS}))

            } catch (error) {
                console.log(error)
                Loading(false)
                dispatch(setLoading({active:true,text:'Thanh toán không thành công!',type:LoadingType.ERROR}))

            }
        }
        closeModal()
    }
    return (

        <div className="fixed top-0  h-screen w-screen bg-black/70  z-25000 flex fixed items-center justify-center">
            <div className="w-200 relative  h-140 bg-[#f5f5f5] flex p-4 select-none flex-col">

                <div className="flex flex-row h-7 justify-end w-full cursor-pointer" onClick={() => closeModal()}>
                    <img src={typeof Close == 'string' ? Close : Close.src} className='size-7' />
                </div>
                <div className='h-full w-full flex items-center flex-col'>
                    <p className='text-[25px]'>Chọn mệnh giá</p>
                    <div className='flex flex-wrap flex-row gap-5'>
                        {Card.map((card, i) => {
                            if (currentCart == i) {
                                return (
                                    <div key={i} className='cursor-pointer bg-[#ee4d2d] border-1 p-5 w-fit h-fit hover:opacity-70 rounded-md flex items-center justify-center'>
                                        {card.text}
                                    </div>
                                )
                            } else
                                return (
                                    <div key={i} onClick={()=>setCurrentCard(i)} className='cursor-pointer border-1 p-5 w-fit h-fit hover:opacity-70 bg-white rounded-md flex items-center justify-center'>
                                        {card.text}
                                    </div>

                                )
                        })}
                    </div>
                    <div className='flex flex-col w-full'>
                        <p className='text-[15px]'>Phương thức thanh toán:</p>
                        <label className="label-pay mt-2 flex flex-row items-center cursor-pointer">

                            <input
                                type="radio"
                                name="dot1"
                                value={1}
                                checked={select === 1}
                                onChange={() => setSelect(1)}
                                className="peer hidden"
                            />

                            <span className="w-5 h-5 inline-block rounded-full border-2 border-[#ee4d2d] peer-checked:bg-[#ee4d2d]"></span>
                            <span className="ml-2">{`Thanh toán trực tiếp (Không cần tiền vì đang test)`}</span>
                        </label>
                        <label className="label-pay mt-2 flex flex-row items-center cursor-pointer">
                            <input
                                type="radio"
                                name="dot2"
                                value={2}
                                checked={select === 2}
                                onChange={() => setSelect(2)}
                                className="peer hidden"
                            />
                            <span className="w-5 h-5 inline-block rounded-full border-2 border-[#ee4d2d] peer-checked:bg-[#ee4d2d]"></span>
                            <span className="ml-2">{`Thanh toán bằng ví (number:4242 4242 4242 4242 exp:12/34)`}</span>
                        </label>
                    </div>
                </div>
                <div className='w-full justify-end'>
                        <ButtonOrange extraClass='p-3 w-50' text='Thanh toán' onClick={() => PaymentHandler(currentCart)} />
                </div>
            </div>

        </div>

    );
}

export default ModalPayment;