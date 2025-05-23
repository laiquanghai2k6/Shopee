'use client';
import { memo } from "react";
import NavBar from "./NavBar";
import { usePathname } from "next/navigation";


const NavWrapper=()=>{
    const pathName = usePathname()
    
    if(pathName == '/login' || pathName == '/admin') return null
    return <NavBar />
}

export default memo(NavWrapper)