
import { StaticImageData } from 'next/image';
type ItemTextProps = {
    text?: string,
    type?: string,
    icon?: string | StaticImageData,
    isImage?: boolean
}

const ItemText = ({ text, type, icon, isImage }: ItemTextProps) => {
    return (
        <>
            {!isImage ? (
                <div className="text-[#fff] text-[clamp(8px,1.5vw,15px)] hover:opacity-70 cursor-pointer font-[500] flex flex-row items-center">
                    {type == 'left' && icon && <img className='mr-2 w-5 h-5 object-contain' src={typeof icon === 'string' ? icon : icon.src} />}
                    {text}
                    {type == 'right' && icon && <img className='ml-2 w-5 h-5 object-contain' src={typeof icon === 'string' ? icon : icon.src} />}
                </div>
            ) : (
                <div className="text-[#fff] text-[clamp(10px,1.5vw,17px)] hover:opacity-70 cursor-pointer font-[500] flex flex-row items-center">
                    <div className='w-6 h-6 rounded-full bg-white mr-1'>
                        <img className='mr-2 w-full h-full object-contain' src={typeof icon === 'string' ? icon : icon?.src} />
                    </div>
                    {text}
                </div>
            )}
        </>

    );
}

export default ItemText;