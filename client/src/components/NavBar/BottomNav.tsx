'use client'
import { useRef, useEffect, useState } from 'react';
import ShopeeIcon from '../../../public/shopee-icon.png';
import Search from '../../../public/search.png';
import { Abel } from 'next/font/google';
import Cart from '../../../public/cart.png';

const abel = Abel({ subsets: ['latin'], weight: '400' });

const TrendingItem = [
    
  'Áo thun ôm body',
  'Áo thun ',
  'Áo thun ôm body',
  'Áo thun ôm body',
  'Áo thun ôm body',
  'Áo thun ôm body',
  'Áo thun ôm body',
  'Áo thun ôm body',
  'Áo thun ôm body',
  'Áo thun ôm body',
  'Áo thun ôm bodyádsa',
  
];

const BottomNav = () => {
    const trendingRef = useRef<HTMLDivElement>(null)
    const [trendingVisible,setTrendingVisible] = useState<string[]>([])
    useEffect(()=>{
        const totalWidth = trendingRef.current?.offsetWidth ?? 0
        let currentWidth = 0
        const fakeTrendingElement = document.createElement('span')
        fakeTrendingElement.style.visibility = 'hidden'
        fakeTrendingElement.style.position = 'absolute'
        document.body.appendChild(fakeTrendingElement)
        const tempVisible = []
        const l = TrendingItem.length
        for(let i = 0; i <l;i++){
            fakeTrendingElement.innerText = TrendingItem[i]
            const itemWidth = fakeTrendingElement.offsetWidth+12
            if(currentWidth +itemWidth <=totalWidth ){
                tempVisible.push(TrendingItem[i])
                currentWidth +=itemWidth
            }
        }
        setTrendingVisible(tempVisible)
    },[])
  return (
    <div className="flex flex-row justify-between mt-2 max-md:mt-0 max-md:grow-1  ">

      <div className="flex flex-row select-none cursor-pointer items-center ">
        <div className="size-10 max-md:size-5 ">
          <img
            className="w-full h-full object-contain"
            src={typeof ShopeeIcon === 'string' ? ShopeeIcon : ShopeeIcon.src}
          />
        </div>
        <p className={`${abel.className} max-md:hidden text-[30px] max-md:text-[20px] text-white ml-2`}>Shopee</p>
      </div>


      <div className="flex flex-col min-w-0 flex-grow mx-10 max-md:mx-2 max-md:h-full justify-center">
   
        <div className="relative bg-white w-full h-10 max-md:h-8 mt-2 rounded-sm select-none">
          <input
            className="border-0 w-full outline-none p-1.5 text-lg max-md:text-sm max-md:p-1.5"
            placeholder="Giảm đến 50%"
          />
          <div className="absolute right-0 top-0  w-22.5 max-md:w-12.5 h-full bg-white flex justify-center items-center rounded-sm">
            <div className="navbar w-[90%] h-[90%] rounded-sm flex items-center justify-center cursor-pointer hover:opacity-90">
              <img className="size-7 max-md:size-5" src={typeof Search === 'string' ? Search : Search.src} />
            </div>
          </div>
        </div>

  
        <div
         ref={trendingRef}
          className="flex flex-row space-x-3 whitespace-nowrap mt-1 max-md:hidden"
        >
          {trendingVisible.map((item, index) => (
            <p key={index} className="text-white text-md max-md:text-sm">
              {item}
            </p>
          ))}
        </div>
      </div>


      <div className="flex justify-center items-center w-30 max-md:w-10 select-none ">
        <img
          className="size-10 max-md:size-7 cursor-pointer"
          src={typeof Cart === 'string' ? Cart : Cart.src}
        />
      </div>
    </div>
  );
};

export default BottomNav;
