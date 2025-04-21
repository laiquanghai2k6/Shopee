export type ProductCardOverview = {
    image:string,
    priceFormat?:string,
    title:string
    priceFormatDiscount:string
    sellNum?:boolean
}

const ProductCardOverview = ({image,priceFormat,priceFormatDiscount,title,sellNum=false}:ProductCardOverview) => {
    const selled = 43;
    return ( 
        <div className={`max-w-[100%] flex flex-col w-50 rounded-sm text-center bg-white items-center  justify-center cursor-pointer hover:scale-103 transition-transform duration-300`}>
        <div className="size-40 max-md:size-30">
            <img src={image} alt="image product" className="size-full object-cover" />
        </div>
        <p className="text-[25ox]">{`${title}`}</p>
        {priceFormat &&<p className="text-[20px] text-[#ee4d2d] line-through">{`${priceFormat}đ`}</p>}
         <p className="text-[20px] text-[#ee4d2d]">{`${priceFormatDiscount}đ`}</p>
        {sellNum && <p className="text-[15px] self-end ">{`${selled} đã bán`}</p>}
    </div>
     );
}
 


export default ProductCardOverview ;