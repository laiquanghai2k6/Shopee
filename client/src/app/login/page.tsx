'use client'
import { Abel } from 'next/font/google';
import { useEffect, useState } from 'react';
import ButtonOrange from '@/components/Button/ButtonOrange';
import Input from '@/components/Input/Input'
import { requestUser } from '@/service/axiosRequest'
import SpinnerShopee from '@/components/Spinner/SpinnerShopee'
import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/slice/userSlice'
import { setToken } from '@/slice/accessTokenSlice'
import { RootState } from '@/store/store'
import { AxiosError } from 'axios'
import Image from 'next/image'
const abel = Abel({ subsets: ['latin'], weight: '400' });
export type Login = {
    email: string,
    password: string,
    eye: boolean
}
export type Register = {
    email: string,
    password: string,
    confirmPassword: string
}
enum Route {
    LOGIN = 'login',
    REGISTER = 'register'
}
const Login = () => {
    const currentUser = useSelector((state: RootState) => state.user.user.email)

    const [routeState, setRouteState] = useState<Route>(Route.LOGIN)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const router = useRouter()
    useEffect(() => {
        if (currentUser != '') {
            router.push('/')
        }
    }, [currentUser])

    useEffect(() => {
        setError('')
    }, [routeState])
    const [registerForm, setRegisterForm] = useState<Register>({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loginForm, setLoginForm] = useState<Login>({
        email: '',
        password: '',
        eye: false
    })

    const SignInHandler = async () => {
        const dataLogin = {
            email: loginForm.email,
            password: loginForm.password
        }
        try {
            setLoading(true)
            const res = await requestUser.post('/sign-in', dataLogin)
            dispatch(setUser(res.data.user))
            dispatch(setToken({ accessToken: res.data.accessToken }))

            router.push('/')
            setLoading(false)
            setError('')
        } catch (e: unknown) {
            const err = e as AxiosError<any>;
            setError(err?.response?.data?.message?.[0]);
            setLoading(false)

            console.log(e)
        }
    }
    const SignUpHandler = async () => {
        const dataSignUp = {
            email: registerForm.email,
            password: registerForm.password,
            confirmPassword: registerForm.confirmPassword
        }
        try {
            setLoading(true)
            const res = await requestUser.post('/sign-up', dataSignUp)
            dispatch(setUser(res.data.user))
            dispatch(setToken({ accessToken: res.data.accessToken }))
            router.push('/')
            setLoading(false)
            setError('')
        } catch (e: unknown) {
            const err = e as AxiosError<any>;
            setError(err?.response?.data?.message[0])
            setLoading(false)

            console.log(e)
        }
    }
    const StartOAuth = async () => {
        try {
            const res = await requestUser.get('/google')
            console.log(res)

        } catch (e) {
            console.log(e)
        }
    }
    const banner = useSelector((state: RootState) => state.banner.banner)

    return (
        <div className="min-h-screen flex flex-col">
            {loading && <SpinnerShopee />}
            <div className="bg-white h-25 max-md:h-15 select-none">
                <div className="flex flex-row h-full max-w-7xl mx-auto select-none cursor-pointer items-center 
                ">
                    <div className="size-10 max-md:size-7 relative">
                        <Image 
                        alt='shopee'
                        src={'/shopee-orange.png'}
                        fill
                        />
                      
                    </div>
                    <p className={`${abel.className} max-md:hidden text-[35px] font-bold max-md:text-[20px] text-[#ee4d2d] ml-2`}>Shopee</p>
                    <p className={` text-[25px] ml-5`}>Đăng nhập</p>
                </div>

            </div>
            <div className={`aspect-[16/9] max-md:w-full grow-1 bg-no-repeat bg-contain bg-center bg-[#d0011b] flex items-center justify-end max-md:justify-center `} style={{
                backgroundImage: `url(${banner.bgLogin})`
            }}>
                {routeState == Route.LOGIN ? (

                    <div className='flex p-10 rounded-sm flex-col bg-white w-110 max-md:w-[90%] max-md:mr-0 h-150 max-md:h-fit mr-40 select-none'>
                        <div className='flex flex-row h-5 w-full items-center justify-center'>
                            <p className='text-[20px]'>Đăng nhập</p>
                        </div>
                        <Input value={loginForm.email} onKeyDown={(e)=>{
                                if(e.key == 'Enter'){
                                    SignInHandler()
                                }
                            }} onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))} type="email" placeholder='Email' />
                        <div className='relative w-full h-10 mt-5'>
                            <input onKeyDown={(e)=>{
                                if(e.key == 'Enter'){
                                    SignInHandler()
                                }
                            }} value={loginForm.password} onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))} type={`${loginForm.eye ? 'text' : 'password'}`} placeholder='Mật khẩu' className='pr-13 size-full select-none p-3  rounded-sm outline-none border-[1px] border-gray-400 focus:border-black' />
                            <div className='absolute right-[5%] top-[25%] size-5 cursor-pointer select-none' onClick={() => setLoginForm(prev => ({ ...prev, eye: !prev.eye }))}>
                                {loginForm.eye ? (
                                    <Image alt='eye' src={'/eye-close.png'} fill  />
                                   
                                ) : (
                                    <Image alt='eye' src={'/eye-open.png'} fill  />

                                )}
                            </div>
                        </div>
                        {error && <p className='text-red-600 self-center mt-2'>{error}</p>}
                        <ButtonOrange text='Đăng nhập' extraClass='w-full p-2 mt-7 rounded-sm' onClick={() => SignInHandler()} />
                        <div className='flex justify-end mt-2'>
                            <p className='text-blue-500 hover:underline cursor-pointer'>Quên mật khẩu</p>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='border-[1px] border-gray-300 h-[1px] w-[40%]'></div>
                            <p className='text-gray-500'>Hoặc</p>
                            <div className='border-[1px] border-gray-300 h-[1px] w-[40%]'></div>
                        </div>
                        <a onClick={() => StartOAuth()} href={`${process.env.NEXT_PUBLIC_USER_URL}/google`} className='flex select-none mt-5 flex-row cursor-pointer hover:opacity-70 items-center justify-center border-[1px] border-gray-400 w-full h-15'>
                            <Image alt='eye' src={'/google.png'} width={32} height={32}  />
                           
                            <p className='text-[25px] ml-3'>Google</p>
                        </a>
                        <div className='w-full select-none h-10 mt-5 flex items-center justify-center'>
                            <p>Bạn chưa có tài khoản?</p>
                            <p onClick={() => setRouteState(Route.REGISTER)} className='hover:underline text-[#ee4d2d] ml-2 cursor-pointer'>Đăng ký</p>
                        </div>
                    </div>
                ) : (
                    <div className='flex p-10 rounded-sm flex-col bg-white w-110 max-md:w-[90%] max-md:h-fit max-md:mr-0 h-150 mr-40'>
                        <div className='flex flex-row h-5 w-full items-center justify-center'>
                            <p className='text-[20px]'>Đăng ký</p>
                        </div>
                        <Input value={registerForm.email} onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))} type="email" placeholder='Email' />
                        <Input value={registerForm.password} onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))} type={`${loginForm.eye ? 'text' : 'password'}`} placeholder='Mật khẩu' />
                        <Input value={registerForm.confirmPassword} onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))} type={`${loginForm.eye ? 'text' : 'password'}`} placeholder='Xác nhận mật khẩu' />
                        {error && <p className='text-red-600 self-center mt-2'>{error}</p>}

                        <ButtonOrange onClick={() => SignUpHandler()} text='Đăng ký' extraClass='w-full p-2 mt-7 rounded-sm' />

                        <div className='w-full select-none h-10 mt-5 flex items-center justify-center'>
                            <p>Bạn đã có tài khoản?</p>
                            <p onClick={() => setRouteState(Route.LOGIN)} className='hover:underline text-[#ee4d2d] ml-2 cursor-pointer'>Đăng nhập</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Login;