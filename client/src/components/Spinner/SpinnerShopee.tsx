import { useEffect } from "react";

const SpinnerShopee = () => {

    return (
        <div className="fixed bg-white/20 min-h-[100vh] h-auto w-[100vw] flex top-0 z-10000 overflow-hidden justify-center items-center select-none">
            <div className="flex size-40 bg-white items-center justify-center flex-row" >
                <div className="flex flex-row w-[50%] justify-around" id="box">

                    <span className="size-3 bg-[#ee4d2d] rounded-full bounce">

                    </span>
                    <span className="size-3 bg-[#ee4d2d] rounded-full bounce delay-200 " style={{ animationDelay: '0.05s' }}>

                    </span>
                    <span className="size-3 bg-[#ee4d2d] rounded-full bounce delay-400" style={{ animationDelay: '0.1s' }}>

                    </span>
                </div>
            </div>
        </div>
    );
}

export default SpinnerShopee;