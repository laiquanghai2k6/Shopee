'use client'

import { LoadingType, setLoading } from "@/slice/loadingSlice";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const PaymentSuccess = () => {
    const searchParams = useSearchParams();
    const dispatch = useDispatch()
    const router = useRouter()
     useEffect(() => {
    const fetchStatus = async () => {
      const orderId = searchParams.get('orderId');
      if (orderId) {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/order/${orderId}`);
        if(res.data.status == 'paid')
        dispatch(setLoading({active:true,text:'Thanh toán thành công',type:LoadingType.SUCCESS}))
        else if(res.data.status == 'pending')
        dispatch(setLoading({active:true,text:'Thanh toán thành công',type:LoadingType.SUCCESS}))
        else 
        dispatch(setLoading({active:true,text:'Thanh toán thất bại',type:LoadingType.ERROR}))

      }
    };
        router.push('/')

    fetchStatus();
  }, []);

    return ( 
        <></>
     );
}

 
export default PaymentSuccess ;