'use client'
import { useRef, useEffect, useState, useCallback, useTransition } from 'react';
import ShopeeIcon from '../../../public/shopee-icon.png';
import Search from '../../../public/search.png';
import { Abel } from 'next/font/google';
import Cart from '../../../public/cart.png';
import { useRouter } from 'next/navigation';
import ModalCart from '../Modal/ModalCart';
import { ProductOverview } from '../Home/FlashSale';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import SpinnerShopee from '../Spinner/SpinnerShopee';

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
type BottomNavProp = {
  Loading: Function
}

const BottomNav = ({ Loading }: BottomNavProp) => {
  const trendingRef = useRef<HTMLDivElement>(null)
  const [trendingVisible, setTrendingVisible] = useState<string[]>([])
  const [openCartModal, setOpenCartModal] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const CartItems = useSelector((state: RootState) => state.userCart.userCart)
  useEffect(() => {
    const totalWidth = trendingRef.current?.offsetWidth ?? 0
    let currentWidth = 0
    const fakeTrendingElement = document.createElement('span')
    fakeTrendingElement.style.visibility = 'hidden'
    fakeTrendingElement.style.position = 'fixed'
    document.body.appendChild(fakeTrendingElement)
    const tempVisible = []
    const l = TrendingItem.length
    for (let i = 0; i < l; i++) {
      fakeTrendingElement.innerText = TrendingItem[i]
      const itemWidth = fakeTrendingElement.offsetWidth + 12
      if (currentWidth + itemWidth <= totalWidth) {
        tempVisible.push(TrendingItem[i])
        currentWidth += itemWidth
      }
    }
    setTrendingVisible(tempVisible)
  }, [])
  const GoToCart = () => {
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    if (!hasMouse) {

      setOpenCartModal(!openCartModal)
    } else {
      startTransition(() => {

        router.push('/cart')
      })
    }
  }
  const GoToHome = () => {
    startTransition(() => {

      router.push('/')

    })
  }
  const closeModalCart = useCallback(() => {
    setOpenCartModal(false)
  }, [])
  useEffect(() => {
    if (isPending) {
      Loading(true)

    } else Loading(false)
  }, [isPending])
  return (
    <>

      <div className="flex flex-row justify-between mt-2 max-md:mt-0 max-md:pb-1 max-md:grow-1 select-none h-auto ">

        <div className="flex flex-row select-none cursor-pointer items-center " onClick={() => GoToHome()}>
          <div className="size-10 max-md:size-7 ">
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
              <p key={index} className="text-white text-md max-md:text-sm cursor-pointer hover:underline">
                {item}
              </p>
            ))}
          </div>
        </div>


        <div
          onMouseEnter={() => setOpenCartModal(true)
          }
          onMouseLeave={() => setOpenCartModal(false)}
          className="flex justify-center items-center w-30 max-md:w-10 select-none relative  cursor-pointer">
          <div onClick={() => GoToCart()} className='size-10 max-md:size-7 cursor-pointer relative'>
            <div className='absolute bg-white top-0 right-[-20%] rounded-full size-5 max-md:size-3.5 max-md:text-[13px] flex justify-center items-center text-[#ee4d2d]'>
              {CartItems.length}
            </div>
            <img

              className="size-full"
              src={typeof Cart === 'string' ? Cart : Cart.src}
            />
          </div>

          <ModalCart Loading={Loading} openCartModal={openCartModal} closeModalCart={closeModalCart} productCart={CartItems} />

        </div>
      </div>
    </>

  );
};

export default BottomNav;
