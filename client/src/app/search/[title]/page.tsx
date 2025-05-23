import { NotFound } from "@/app/[slug]/page"
import { InfoProduct } from "@/components/Modal/ModalProduct"
import SearchClient from "@/components/Product/SearchClient"
import { requestProduct } from "@/service/axiosRequest"

type SearchTitleProp = {
    params: {
        title: string
    }
}


export const generateMetadata = async ({ params }: SearchTitleProp) => {
    const { title } = await params
    const decodedTitle = decodeURIComponent(title);
    if (!title) {
        return {
            title: "Sản phẩm không hợp lệ",
            description: "Sản phẩm không tồn tại hoặc ID không đúng định dạng.",
        };
    }
    return {
        title: `Tìm kiếm ${decodedTitle}`
    }
}
const SearchTitle = async ({ params }: SearchTitleProp) => {
    const { title } = await params
    const decodedTitle = decodeURIComponent(title);

    const searchTitle = decodedTitle.normalize("NFD")                   
        .replace(/[\u0300-\u036f]/g, "")    
        .replace(/\s+/g, ' ')                
        .trim()                              
        .toLowerCase();
    try {
        const res = await requestProduct.get(`/search-product?title=${searchTitle}`)
        if (res.data.length == 0) {
            return NotFound()
        }
        return <SearchClient products={res.data as InfoProduct[]} title={decodedTitle} />
    } catch (e) {
        console.log(e)
        return NotFound()
    }
}
export default SearchTitle
