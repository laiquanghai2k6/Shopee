import { ButtonHTMLAttributes } from "react";

interface ButtonLightRedProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string,
    image?: string,
    extraClass?:string
}

const ButtonLightRed = ({ text, image='',extraClass, ...others }: ButtonLightRedProps) => {
    return (
        <button className={`text-[#ee4d2d] border-1 border-[#ee4d2d] bg-red-100 hover:opacity-80 cursor-pointer ${extraClass}`} {...others}>
            <div className="flex flex-row items-center justify-center">
                {image !='' && <img src={image} className="w-5 h-5" />}
                {text != '' && <p className="ml-1">{text}</p>}
            </div>
        </button>
    );
}

export default ButtonLightRed;