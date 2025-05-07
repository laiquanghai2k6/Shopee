'use client'
import HomeShop from '@/components/Home/HomeShop';
import './globals.css';

import NavBar from "@/components/NavBar/NavBar";
import { useEffect } from 'react';
import { requestUser } from '@/service/axiosRequest';



export default function Home() {

  return (
    <>
      <HomeShop />
    </>

  );
}
