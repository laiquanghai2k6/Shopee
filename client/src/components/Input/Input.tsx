import React, { ForwardedRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    extraClass?:string,
    extraClassParent?:string,
    extraClassParentWidth?:string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({extraClass="",extraClassParentWidth='full',extraClassParent="",children,...other}:InputProps,ref?: ForwardedRef<HTMLInputElement>) => {
    return (
        <div className={`w-${extraClassParentWidth} h-10  mt-5 ${extraClassParent}`}>
            {children}
            <input ref={ref}   className={`size-full p-3 rounded-sm outline-none border-[1px] p-1 border-gray-400 focus:border-black ${extraClass}`} {...other} />
        </div>
    );
})
Input.displayName = 'Custom Input'
export default Input;