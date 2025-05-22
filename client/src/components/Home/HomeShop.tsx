'use-client'

import { useState } from "react";
import SuggestProduct from "../Product/SuggestProduct";
import AdsShow from "./AdsShow";
import FlashSale from "./FlashSale";
import Categories, { Category } from "./Categories";
import SpinnerShopee from "../Spinner/SpinnerShopee";

const HomeShop = () => {
    const [category,setCategory] = useState<Category>({
        id:'',
        image:'',
        name:''
    })
    const [loading,Loading] = useState(false)

    return (  
        <div className="h-auto overflow-y-auto bg-[#f5f5f5]  flex flex-col">
            {loading && <SpinnerShopee />}
            <AdsShow Loading={Loading} />
    

            <Categories setCategory={setCategory } category={category} />
            <FlashSale Loading={Loading} />
            <SuggestProduct category={category} />
        </div>
        // <div></div>
    );
}
 
export default HomeShop;