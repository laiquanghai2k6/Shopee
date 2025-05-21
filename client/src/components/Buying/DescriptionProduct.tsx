import { InfoProduct } from "../Modal/ModalProduct";


type DescriptionProductProps={
    data:InfoProduct
}





const DescriptionProduct = ({data}:DescriptionProductProps) => {

    return ( 
        <div className="w-full h-auto bg-white  rounded-sm flex flex-col">
        <div className="flex p-7  min-h-10 flex-col">
            <div className="w-full h-15 bg-[#f5f5f5] flex items-center">
                <p className="ml-3 text-[20px]">MÔ TẢ SẢN PHẨM</p>
            </div>
            <div className="min-h-10 h-auto w-full mt-5">
                <p className="h-fit w-full whitespace-pre-line">{data.description}</p>

            </div>
        </div>
    </div>
     );
}
 
export default DescriptionProduct;