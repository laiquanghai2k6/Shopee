'use client'
import { LoadingType, setLoading } from "@/slice/loadingSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



const PaymentSuccess = () => {
    const searchParams = useSearchParams();
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector((state:RootState)=>state.user.user)
     useEffect(() => {
    // const fetchStatus = async () => {
    //   const orderId = searchParams.get('orderId');
    //   if (orderId) {
    //     const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/order/${orderId}`);
    //     if(res.data.status == 'paid')
    //     dispatch(setLoading({active:true,text:'Thanh toán thành công',type:LoadingType.SUCCESS}))
    //     else if(res.data.status == 'pending')
    //     dispatch(setLoading({active:true,text:'Thanh toán thành công',type:LoadingType.SUCCESS}))
    //     else 
    //     dispatch(setLoading({active:true,text:'Thanh toán thất bại',type:LoadingType.ERROR}))

    //   }
    // };
     const fetchStatus = async () => {
      const orderId = searchParams.get("orderId");
      if (!orderId) {
        dispatch(setLoading({
          active: true,
          text: "Thiếu mã đơn hàng",
          type: LoadingType.ERROR,
        }));
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/order/${orderId}`
        );
        if (res.data.status === "paid" || res.data.status === "pending") {
          console.log('res.data',res.data)
          dispatch(setLoading({
            active: true,
            text: "Thanh toán thành công",
            type: LoadingType.SUCCESS,
          }));
        } else {
          dispatch(setLoading({
            active: true,
            text: "Thanh toán thất bại",
            type: LoadingType.ERROR,
          }));
        }
      } catch (err) {
        dispatch(setLoading({
          active: true,
          text: "Lỗi khi kiểm tra đơn hàng",
          type: LoadingType.ERROR,
        }));
      }

   
      router.push('/')
    };

    fetchStatus();
  }, []);

    return ( 
        <></>
     );
}

 
export default PaymentSuccess ;