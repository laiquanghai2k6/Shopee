import SuggestProduct from "../Product/SuggestProduct";
import AdsShow from "./AdsShow";
import Category from "./Category";
import FlashSale from "./FlashSale";

const HomeShop = () => {
    
    return (  
        <div className="h-auto overflow-y-auto bg-[#f5f5f5]  flex flex-col">
            <AdsShow />
    

            <Category />
            <FlashSale />
            <SuggestProduct />
        </div>
        // <div></div>
    );
}
 
export default HomeShop;