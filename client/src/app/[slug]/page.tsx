

import CommentProduct from '@/components/Buying/CommentProduct';
import DescriptionProduct from '@/components/Buying/DescriptionProduct';
import DetailProduct from '@/components/Buying/DetailProduct';
import ProductBuyingClient from '@/components/Buying/ProductBuyingClient'
import { InfoProduct } from '@/components/Modal/ModalProduct';
import ProductClient from '@/components/Product/ProductClient';
import { requestProduct } from '@/service/axiosRequest';
import { useQuery } from '@tanstack/react-query';
import { Metadata } from 'next';

type ProductBuyingProps = {
    params: {
        slug: string;
    };
};
export type Comment = {
    star: number, user: string, text: string
}
export type Color = {
    image?: string,
    text: string,
    key?: number
}
export type Sizes = {
    size: string,
    key?: number
}
export type ProductDetail = {
    image: string,
    starsAvg: number,
    comment: Comment[],
    sold: number, price: number,
    discount: number,
    sizes: Sizes[],
    colors: Color[]
}


export async function generateMetadata({ params }: ProductBuyingProps): Promise<Metadata> {
    const { slug } = await  params;
    const id = slug.split("-").slice(-5).join('-');

    if (!id) {
        return {
            title: "Sản phẩm không hợp lệ | Shopee Clone",
            description: "Sản phẩm không tồn tại hoặc ID không đúng định dạng.",
        };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_URL}/get-one-product/${id}`, { cache: 'no-store', })
    const product = await res.json();
    return {
        title: `${product.title ?? 'Shopee Clone'} `,

    };
}
const fetchProductById = async (id: string): Promise<InfoProduct> => {

   const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_URL}/get-one-product/${id}`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return data as InfoProduct;
}
export const NotFound = ()=>{
    return(
        <div className='min-h-screen bg-[#f5f5f5] flex justify-center'>
            <p className='text-[30px] mt-5'>Không tìm thấy sản phẩm</p>
        </div>
    )
}
const PageSlug = async ({ params }: ProductBuyingProps) => {
    const { slug } = await params;
    const parts = slug.split('-');
    if (parts.length < 5) return NotFound();
    const uuidParts = parts.slice(-5);
    const uuid = uuidParts.join('-');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) return NotFound()
    try {
        const product = await fetchProductById(uuid ?? '');
        return <ProductClient data={product}/>
    } catch (e) {
        console.log(e)
        return NotFound()
    }
}




export default PageSlug