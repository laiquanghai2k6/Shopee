
import { StaticImageData } from 'next/image';
import React from 'react';
interface ItemTextProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string,
    type?: string,
    icon?: string | StaticImageData,
    isImage?: boolean,
    extraClass?:string,
    isOpa?:boolean,
    image?:string
}

const ItemText = ({ text, type, icon,extraClass="",image='', isOpa=true,children,isImage,...other }: ItemTextProps) => {
    return (
        <>
            {!isImage ? (
                <div className={`text-[#fff] text-[clamp(8px,1.5vw,15px)] ${isOpa &&'hover:opacity-70 ' }cursor-pointer font-[500] flex flex-row items-center ${extraClass}`} {...other}>
                    {type == 'left' && icon && <img className='mr-2 max-md:mr-0 max-md:size-4  w-5 h-5 object-contain' src={image == '' ? (typeof icon === 'string' ? icon : icon.src):(image)} />}
                    {text}
                    {type == 'right' && icon && <img className='ml-2 max-md:ml-1 max-md:size-4 w-5 h-5 object-contain' src={image == '' ? (typeof icon === 'string' ? icon : icon.src):(image)} />}
                    {children}
                </div>
            ) : (
                <div className={`${extraClass} text-[#fff] text-[clamp(10px,1.5vw,17px)]   ${isOpa &&'hover:opacity-70 ' } cursor-pointer font-[500] flex flex-row items-center`} {...other}>
                    <div className='w-6 h-6 max-md:size-4 rounded-full bg-white mr-1 max-md:mr-0'>
                        <img className='mr-2 w-full h-full object-contain max-md:mr-0 max-md:size-4' src={typeof icon === 'string' ? icon : icon?.src} />
                    </div>
                    {text}
                    {children}
                </div>
            )}
        </>

    );
}

export default ItemText;