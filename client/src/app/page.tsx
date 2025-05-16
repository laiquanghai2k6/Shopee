'use client'
import HomeShop from '@/components/Home/HomeShop';
import './globals.css';

import NavBar from "@/components/NavBar/NavBar";
import { useEffect } from 'react';
import { requestUser } from '@/service/axiosRequest';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';



export default function Home() {
 
  return (
    <>
      <HomeShop />
    </>

  );
}
