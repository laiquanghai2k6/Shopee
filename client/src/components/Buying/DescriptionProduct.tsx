const DescriptionProduct = () => {
    const text = `Chất liệu vải thun coton co dãn 4 chiều
🌸 BẢNG SIZE
• Size S: dưới 46kg
• Size M: dưới 53kg
Màu sắc: Đen, Xám, Trắng
Xưởng may LÂM TÚ cam kết
- Hàng xác nhận trước 16h00 giao qua đơn vị vận chuyển trong ngày
- Sản phẩm giống chính xác mô tả
- Hỗ trợ đổi trả 100% nếu lỗi sản phẩm từ shop`
    return ( 
        <div className="w-full h-auto bg-white  rounded-sm flex flex-col">
        <div className="flex p-7  min-h-10 flex-col">
            <div className="w-full h-15 bg-[#f5f5f5] flex items-center">
                <p className="ml-3 text-[20px]">MÔ TẢ SẢN PHẨM</p>
            </div>
            <div className="min-h-10 h-auto w-full mt-5">
                <p className="h-fit w-full whitespace-pre-line">{text}</p>

            </div>
        </div>
    </div>
     );
}
 
export default DescriptionProduct;