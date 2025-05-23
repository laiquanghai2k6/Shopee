'use client'
import { RootState } from "@/store/store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";


type SideBarProps = {
    items: string[],
    currentIndex: number,
    setCurrentIndex: (index: number) => void
    setOpenSidebar:  (open: boolean) => void;
    openSidebar: boolean
}

const SideBar = ({ items,setOpenSidebar, openSidebar, currentIndex, setCurrentIndex }: SideBarProps) => {
    const currentRef = useRef<(HTMLDivElement | null)[]>([])
    const sidebarRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setOpenSidebar(false);
            }
        };

        if (openSidebar) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSidebar])
    
    return (
        <div ref={sidebarRef} className="flex w-[75%] sidebar  max-md:fixed max-md:z-2000  p-3 relative fixed h-screen flex-col bg-[#19232b] select-none md:rouded-md  ">
            <div className="h-30 w-full  flex justify-center items-center ">
                <p className="text-[#f5f6fa]  text-[30px]">Menu</p>
            </div>
            <div className={`absolute py-7 z-0 ml-[2.5%] w-[95%] left-0 h-12 transition-all duration-300  `}
                style={{ top: `${12 + 120 + currentIndex * 56}px `, height: `${currentRef.current[currentIndex]?.offsetHeight}px`, backgroundColor: 'rgba(40, 49, 73, 0.5)', }}

            >
            </div>
            {items.map((item, i) => {
                return (
                    <div key={i} ref={(el) => { currentRef.current[i] = el }} className="py-7 z-10 flex items-center w-full select-none h-12 cursor-pointer" onClick={() => setCurrentIndex(i)}>
                        <p className="text-[#f5f6fa] text-[20px] ml-3 truncate ">{item}</p>
                    </div>
                )
            })}



        </div>
    );
}

export default SideBar;