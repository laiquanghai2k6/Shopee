'use client';
import { memo } from "react";
import NavBar from "./NavBar";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";


const NavWrapper=()=>{
    const pathName = usePathname()
    if(pathName == '/login') return null
    return <NavBar />
}

export default memo(NavWrapper)