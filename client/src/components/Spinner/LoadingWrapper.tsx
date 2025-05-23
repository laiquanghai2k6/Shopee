'use client'

import { Loading, LoadingType, setLoading, turnOff } from "@/slice/loadingSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Success from '../../../public/success.png'
import Error from '../../../public/Error.png'
import Wait from '../../../public/wait.png'



const LoadingWrapper = () => {
    const loading = useSelector((state:RootState)=>state.loading.loading)
    const dispatch = useDispatch()
    const [shouldLoading,setShouldLoading] = useState(false)
    useEffect(()=>{
        if(loading.active == true){
            setShouldLoading(true)
            const turnOn = setTimeout(()=>{
                dispatch(turnOff())
            },1000)
            return()=>{clearTimeout(turnOn)}
        }else{
            const turnOff = setTimeout(()=>{
            setShouldLoading(false)
            },390)
            return ()=>{clearTimeout(turnOff)}
        }
    },[loading.active])
    
    if(shouldLoading){

        return ( 
            <div className={`fixed ${loading.active ? 'loadingDown':'loadingUp' } rounded-lg flex top-0 right-0 w-100 min-h-25
             ${loading.type == LoadingType.ERROR && 'bg-red-500'}
             ${loading.type == LoadingType.SUCCESS && 'bg-green-400'}
             ${loading.type == LoadingType.PENDING && 'bg-yellow-500'}
             items-center justify-center
             mt-3 mr-3 z-22000 select-none
             `}>
                <div className="flex flex-row w-full h-20 pl-10 items-center">
                    {loading.type == LoadingType.SUCCESS && <img src={typeof Success =='string' ? Success:Success.src } className="size-10" />}
                    {loading.type == LoadingType.ERROR && <img src={typeof Error =='string' ? Error:Error.src } className="size-10" />}
                    {loading.type == LoadingType.PENDING && <img src={typeof Wait =='string' ? Wait:Wait.src } className="size-10" />}
                    <p className="text-[#f5f5f5] ml-3">{loading.text}</p>
                </div>
            </div>
         );
    }else return <></>
}
 
export default LoadingWrapper;