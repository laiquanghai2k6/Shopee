'use-client'
import { useState } from "react";
import BottomNav from "./BottomNav";
import TopNav from "./TopNav";
import SpinnerShopee from "../Spinner/SpinnerShopee";

const NavBar = () => {
      const [loading,Loading] = useState(false)

    return (
        <>
        {loading && <SpinnerShopee />}
        <div className="navbar min-h-[120px] h-auto flex flex-row justify-center max-md:min-h-[40px] ">
            <div className="flex flex-col w-290 max-md:mx-5 py-2 h-full max-md:py-0.5 select-none">
                <TopNav Loading={Loading}/>
                <BottomNav Loading={Loading} />
            </div>
        </div>
        </>
    );
}

export default NavBar;