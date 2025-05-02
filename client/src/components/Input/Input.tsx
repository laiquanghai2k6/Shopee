import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    extraClass?:string
}

const Input = ({extraClass="",children,...other}:InputProps) => {
    return (
        <div className='w-full h-10 mt-5'>
            {children}
            <input className={`size-full p-3 rounded-sm outline-none border-[1px] p-1 border-gray-400 focus:border-black ${extraClass}`} {...other} />
        </div>
    );
}

export default Input;