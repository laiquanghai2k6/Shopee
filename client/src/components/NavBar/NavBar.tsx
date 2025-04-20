import BottomNav from "./BottomNav";
import TopNav from "./TopNav";

const NavBar = () => {
    return (
        <div className="navbar h-[120px] flex flex-row justify-center max-md:min-h-[40px] ">
            <div className="flex flex-col w-290 max-md:mx-5 py-2 h-full max-md:py-0.5 overflow-hidden">
                <TopNav />
                <BottomNav />
            </div>
        </div>
    );
}

export default NavBar;