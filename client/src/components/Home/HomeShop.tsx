import SuggestProduct from "../Product/SuggestProduct";
import AdsShow from "./AdsShow";
import Category from "./Category";
import FlashSale from "./FlashSale";

const HomeShop = () => {
    
    return (  
        <div className="h-auto max-md:min-h-500 min-h-screen overflow-y-auto bg-red-400 flex flex-col">
            <AdsShow />
            <Category />
            <FlashSale />
            <SuggestProduct />
        </div>
        // <div></div>
    );
}
 
export default HomeShop;