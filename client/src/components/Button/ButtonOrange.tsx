import { ButtonHTMLAttributes } from "react";

interface ButtonOrangeProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text:string,
    extraClass?:string,
    basicColor?:string,
    basicText?:string
}

const ButtonOrange = ({text,extraClass,basicColor='#ee4d2d',basicText='white',...others}:ButtonOrangeProps) => {
    return ( 
        <button className={`text-${basicText} bg-[${basicColor}] hover:opacity-80 cursor-pointer max-md:active:opacity-80 ${extraClass}`} {...others}>
            {text}
        </button>
     );
}
 
export default ButtonOrange;