import { ButtonHTMLAttributes } from "react";

interface ButtonOrangeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    extraClass?: string,
    basicColor?: string,
    basicText?: string,
    isDisable?: boolean
}

const ButtonOrange = ({ text, isDisable = false, extraClass, basicColor = '#ee4d2d', basicText = 'white', ...others }: ButtonOrangeProps) => {
    return (
        <>
            {
                isDisable ? (
                    <button disabled className={`text-black bg-gray-200   ${extraClass}`} {...others}>
                        {text}
                    </button >
                ) : (

                    <button className={`text-${basicText} bg-[${basicColor}] hover:opacity-80 cursor-pointer max-md:active:opacity-80 ${extraClass}`} {...others}>
                        {text}
                    </button>
                )}
        </>
    );
}

export default ButtonOrange;