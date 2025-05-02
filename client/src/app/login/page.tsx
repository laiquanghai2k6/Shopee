'use client'
import ShopeeIcon from '../../../public/shopee-orange.png'
import EyeOpen from '../../../public/eye-open.png'
import EyeClose from '../../../public/eye-close.png'
import Google from '../../../public/google.png'
import { Abel } from 'next/font/google';
import { useState } from 'react';
import ButtonOrange from '@/components/Button/ButtonOrange';
import Input from '@/components/Input/Input'

const abel = Abel({ subsets: ['latin'], weight: '400' });
export type Login = {
    email:string,
    password:string,
    eye:boolean
}
export type Register = {
    email:string,
    password:string,
    confirmPassword:string
}
enum Route{
    LOGIN='login',
    REGISTER='register'
}
const Login = () => {
    const [routeState,setRouteState] = useState<Route>(Route.LOGIN)
    const [registerForm,setRegisterForm] = useState<Register>({
        email:'',
        password:'',
        confirmPassword:''
    })
    const [loginForm,setLoginForm] = useState<Login>({
        email:'',
        password:'',
        eye:false
    })
    return (
        <div className="min-h-screen flex flex-col">
            <div className="bg-white h-25">
                <div className="flex flex-row h-full max-w-7xl mx-auto select-none cursor-pointer items-center 
                ">
                    <div className="size-10 max-md:size-5 ">
                        <img
                            className="w-full h-full object-contain"
                            src={typeof ShopeeIcon === 'string' ? ShopeeIcon : ShopeeIcon.src}
                        />
                    </div>
                    <p className={`${abel.className} max-md:hidden text-[35px] font-bold max-md:text-[20px] text-[#ee4d2d] ml-2`}>Shopee</p>
                    <p className={` text-[25px] ml-5`}>Đăng nhập</p>
                </div>
               
            </div>
            <div className={`grow-1 bg-no-repeat bg-contain bg-center bg-[#d0011b] flex items-center justify-end `}  style={{
                backgroundImage: `url('/shopee-banner.jpg')`
             }}>
                {routeState == Route.LOGIN ? (

                <div className='flex p-10 rounded-sm flex-col bg-white w-110 h-150 mr-40'>
                    <div className='flex flex-row h-5 w-full items-center justify-center'>
                        <p className='text-[20px]'>Đăng nhập</p>
                    </div>
                    <Input value={loginForm.email} onChange={(e)=>setLoginForm((prev)=>({...prev,email:e.target.value}))} type="email" placeholder='Email'/>
                    <div className='relative w-full h-10 mt-5'>
                        <input value={loginForm.password} onChange={(e)=>setLoginForm((prev)=>({...prev,password:e.target.value}))}  type={`${loginForm.eye ? 'text':'password'}`} placeholder='Mật khẩu' className='pr-13 size-full select-none p-3  rounded-sm outline-none border-[1px] border-gray-400 focus:border-black' />
                        <div className='absolute right-[5%] top-[25%] size-5 cursor-pointer select-none' onClick={()=>setLoginForm(prev=>({...prev,eye:!prev.eye}))}>
                            {loginForm.eye ? (
                                <img src={typeof EyeClose== 'string' ? EyeClose : EyeClose.src} className='size-full' alt="" />
                            ):(
                                <img src={typeof EyeOpen== 'string' ? EyeOpen : EyeOpen.src} className='size-full' alt="" />
                            )}
                        </div>
                    </div>
                    <ButtonOrange text='Đăng nhập' extraClass='w-full p-2 mt-7 rounded-sm' />
                    <div className='flex justify-end mt-2'>
                        <p className='text-blue-500 hover:underline cursor-pointer'>Quên mật khẩu</p>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='border-[1px] border-gray-300 h-[1px] w-[40%]'></div>
                        <p className='text-gray-500'>Hoặc</p>
                        <div className='border-[1px] border-gray-300 h-[1px] w-[40%]'></div>
                    </div>
                    <div className='flex select-none mt-5 flex-row cursor-pointer hover:opacity-70 items-center justify-center border-[1px] border-gray-400 w-full h-15'>
                            <img src={typeof Google == 'string' ? Google : Google.src} className='size-8'/>
                            <p className='text-[25px] ml-3'>Google</p>
                    </div>
                    <div className='w-full select-none h-10 mt-5 flex items-center justify-center'>
                            <p>Bạn chưa có tài khoản?</p>
                            <p  onClick={()=>setRouteState(Route.REGISTER)} className='hover:underline text-[#ee4d2d] ml-2 cursor-pointer'>Đăng ký</p>
                    </div>
                </div>
                ):(
                    <div className='flex p-10 rounded-sm flex-col bg-white w-110 h-150 mr-40'>
                    <div className='flex flex-row h-5 w-full items-center justify-center'>
                        <p className='text-[20px]'>Đăng ký</p>
                    </div>
                    <Input value={registerForm.email} onChange={(e)=>setRegisterForm((prev)=>({...prev,email:e.target.value}))} type="email" placeholder='Email'/>
                    <Input value={registerForm.password} onChange={(e)=>setRegisterForm((prev)=>({...prev,password:e.target.value}))}  type={`${loginForm.eye ? 'text':'password'}`} placeholder='Mật khẩu'/>
                    <Input value={registerForm.confirmPassword} onChange={(e)=>setRegisterForm((prev)=>({...prev,confirmPassword:e.target.value}))}  type={`${loginForm.eye ? 'text':'password'}`} placeholder='Xác nhận mật khẩu'  />
            
                    <ButtonOrange text='Đăng ký' extraClass='w-full p-2 mt-7 rounded-sm' />

                    <div className='w-full select-none h-10 mt-5 flex items-center justify-center'>
                            <p>Bạn đã có tài khoản?</p>
                            <p onClick={()=>setRouteState(Route.LOGIN)} className='hover:underline text-[#ee4d2d] ml-2 cursor-pointer'>Đăng nhập</p>
                    </div>
                </div>
                )}

            </div>
        </div>
    );
}

export default Login;