

import CommentProduct from '@/components/Buying/CommentProduct';
import DescriptionProduct from '@/components/Buying/DescriptionProduct';
import DetailProduct from '@/components/Buying/DetailProduct';
import ProductBuyingClient from '@/components/Buying/ProductBuyingClient'

type ProductBuyingProps = {
    params: {
        slug: string;
    };
};
export type Comment = {
    star:number,user:string,text:string
}
export type Color = {
    image?:string,
    text:string,
    key?:number
}
export type Sizes = {
    size:string,
    key?:number
}
export type ProductDetail = {
    image:string,
    starsAvg:number,
    comment:Comment[],
    sold:number,price:number,
    discount:number,
    sizes:Sizes[],
    colors:Color[]
}

const fakeProductDetail:ProductDetail = {
    image:'https://i.ibb.co/27FXrK58/test3.png',
    starsAvg: 4.9,
    comment: [
        { star: 3, user: 'lqh', text: 'affsdf' },
        { star: 4.6, user: 'lqhw', text: 'wa' }

    ],
    sold: 38,
    price: 2000000,
    discount: 20,
    sizes:[
        {size:'Size S < 46Kg'},
        {size:'Size M < 53kg'}
    ],
    colors:[
        {image:'https://i.ibb.co/WNvHzvxX/image.png',text:'Trắng - Tay dài'},
        {image:'https://i.ibb.co/Gv1vJYQ7/image.png',text:'Đen - Tay ngắn'},
        {image:'',text:'Xám - Tay ngắn'},
        {image:'https://i.ibb.co/WNvHzvxX/image.png',text:'Trắng - Tay dài'},
        {image:'https://i.ibb.co/Gv1vJYQ7/image.png',text:'Đen - Tay ngắn'},
        {image:'',text:'Xám - Tay ngắn'},
        {image:'https://i.ibb.co/WNvHzvxX/image.png',text:'Trắng - Tay dài'},
        {image:'https://i.ibb.co/Gv1vJYQ7/image.png',text:'Đen - Tay ngắn'},
        {image:'',text:'Xám - Tay ngắn'},
        {image:'https://i.ibb.co/WNvHzvxX/image.png',text:'Trắng - Tay dài'},
        {image:'https://i.ibb.co/Gv1vJYQ7/image.png',text:'Đen - Tay ngắn'},
        {image:'',text:'Xám - Tay ngắn'}, {image:'https://i.ibb.co/WNvHzvxX/image.png',text:'Trắng - Tay dài'},
        {image:'https://i.ibb.co/Gv1vJYQ7/image.png',text:'Đen - Tay ngắn'},
        {image:'',text:'Xám - Tay ngắn'},
        {image:'https://i.ibb.co/WNvHzvxX/image.png',text:'Trắng - Tay dài'},
        {image:'https://i.ibb.co/Gv1vJYQ7/image.png',text:'Đen - Tay ngắn'},
        {image:'',text:'Xám - Tay ngắn'},
        {image:'https://i.ibb.co/WNvHzvxX/image.png',text:'Trắng - Tay dài'},
        {image:'https://i.ibb.co/Gv1vJYQ7/image.png',text:'Đen - Tay ngắn'},
    ]
}

const ProductBuying = async ({ params }: ProductBuyingProps) => {
    const { slug } = await params;
  
    return (
        <div className="flex min-h-screen justify-center  w-full  h-auto bg-[#f5f5f5] overflow-y-auto max-xl:w-[100%]">
            <div className="w-290 max-xl:w-[100%] h-auto bg-[#f5f5f5] flex flex-col mt-10 select-none pb-10">
               <ProductBuyingClient fakeProductDetail={fakeProductDetail} />
               <DetailProduct />
               <DescriptionProduct />
               <CommentProduct />
            </div>
         
        </div>
    );
}

export default ProductBuying;