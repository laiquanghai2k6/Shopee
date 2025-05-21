import { InfoProduct } from "../Modal/ModalProduct"

export type ProductDetail = {
    key: string,
    value: string | number
}
const fakeProductDetail: ProductDetail[] = [
    { key: 'Kho', value: 3432 },
    { key: 'Xuất xứ', value: 'Việt Nam' },
    { key: 'Chiều dài tay áo', value: "Dài tay" },
    { key: 'Cổ áo', value: 'Cổ chữ V' },
    { key: 'Chất liệu', value: 'Cotton' },
    { key: 'Mẫu', value: 'Trơn' },
    { key: 'Mùa', value: 'Mùa thu' },
    { key: 'Gửi từ', value: 'TP. Hồ Chí Minh' },

]
type DetailProductProps = {
    data: InfoProduct
}

const DetailProduct = ({data}:DetailProductProps) => {

    return (
        <div className="w-full h-auto bg-white mt-5 rounded-sm flex flex-col">
            <div className="flex p-7  min-h-160 flex-col">
                <div className="w-full h-15 bg-[#f5f5f5] flex items-center">
                    <p className="ml-3 text-[20px]">CHI TIẾT SẢN PHẨM</p>
                </div>
                <div className="flex flex-row w-full min-h-10 mt-5 ml-3">
                    <div className="h-full w-50">
                        <p className="text-[20px] text-[#515557]">Danh mục</p>
                    </div>
                    <div>
                        <p className="text-[20px]">5964</p>
                    </div>
                </div>
                {data?.detail?.map((detail,i) => {
                    return (
                        <div key={i} className="flex flex-row w-full min-h-10 mt-5 ml-3">
                            <div className="h-full w-50">
                                <p className="text-[20px] text-[#515557]">{detail.name}</p>
                            </div>
                            <div>
                                <p className="text-[20px]">{detail.value}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DetailProduct;