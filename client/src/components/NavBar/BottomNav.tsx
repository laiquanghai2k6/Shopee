'use client'
import { useRef, useEffect, useState, useCallback, useTransition, useMemo } from 'react';
import ShopeeIcon from '../../../public/shopee-icon.png';
import Search from '../../../public/search.png';
import { Abel } from 'next/font/google';
import Cart from '../../../public/cart.png';
import { useRouter } from 'next/navigation';
import ModalCart from '../Modal/ModalCart';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { debounce } from '../Admin/SettingUsers';
import { SearchTitle, useSearchProduct } from '@/hooks/useSearchProduct';
import { toSlug } from '../Product/ProductCardOverview';

const abel = Abel({ subsets: ['latin'], weight: '400' });

// const TrendingItem = [

//   'Áo thun ôm body',
//   'Áo thun ',
//   'Áo thun ôm body',
//   'Áo thun ôm body',
//   'Áo thun ôm body',
//   'Áo thun ôm body',
//   'Áo thun ôm body',
//   'Áo thun ôm body',
//   'Áo thun ôm body',
//   'Áo thun ôm body',
//   'Áo thun ôm bodyádsa',

// ];
type BottomNavProp = {
  Loading: Function
}

const BottomNav = ({ Loading }: BottomNavProp) => {
  // const trendingRef = useRef<HTMLDivElement>(null)
  const [openCartModal, setOpenCartModal] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [inputSearch, setInputSearch] = useState('')
  const [inputSearchDebounce, setInputSearchDebounce] = useState('')
  const CartItems = useSelector((state: RootState) => state.userCart.userCart)

  const GoToCart = () => {
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    
    if (!hasMouse) {

      setOpenCartModal(false)
    } 
      startTransition(() => {

        router.push('/cart')
      })
    
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
  const changeDebounce = (value: string) => {
    setInputSearchDebounce(value)
  }
  const debounceSearch = useMemo(() => {
    return debounce(changeDebounce, 200)
  }, [])
  const goInToSlug = (t:SearchTitle)=>{
    const slug = toSlug(t.title)
    setInputSearch('')
    setInputSearchDebounce('')
    startTransition(()=>{
      router.push(`${slug}-${t.id}`)
    })
  }
  const goInSearch = (t:string)=>{
    setInputSearch('')
    setInputSearchDebounce('')
    startTransition(()=>{
      router.push(`/search/${t}`)
    })
  }
  const handleToggleCartModal = () => {
  setOpenCartModal((prev) => !prev);
};
  const { isLoading, data } = useSearchProduct(inputSearchDebounce)
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

          <div className="relative bg-white w-full h-10 max-md:h-8 mt-2 rounded-t-sm select-none">
            <input
              value={inputSearch}
              onChange={(e) => {
                setInputSearch(e.target.value)
                debounceSearch(e.target.value)
              }}
              onKeyDown={(e)=>{
                if(e.key == 'Enter'){
                  goInSearch(inputSearchDebounce)
                }
              }}
              className="border-0 w-full outline-none p-1.5 text-lg max-md:text-sm max-md:p-1.5"
              placeholder="Giảm đến 50%"
            />
            {inputSearchDebounce !='' && (
              <div className='absolute w-full p-3  rounded-b-sm  h-fit bg-[#f5f5f5] z-10000 flex flex-col flex-wrap'>
                {data?.length == 0 && (
                  <div className='w-full flex justify-center'>
                    <p>Không có sản phẩm</p>
                  </div>
                )}
                {data?.map((t,i) => {
                  return (
                    <div key={i} onClick={()=>{goInToSlug(t)}} className=' p-2 hover:bg-gray-300 cursor-pointer'>
                      <p className='line-clamp-1'>{t?.title}</p>
                    </div>

                  )
                })}
              </div>

            )}
            <div className="absolute right-0 top-0  w-22.5 max-md:w-12.5 h-full bg-white flex justify-center items-center rounded-sm">
              <div onClick={()=>{
                goInSearch(inputSearchDebounce)
              }} className="navbar bg-red-200 w-[90%] h-[90%] rounded-sm flex items-center justify-center cursor-pointer hover:opacity-90">
                <img className="size-7 max-md:size-5" src={typeof Search === 'string' ? Search : Search.src} />
              </div>
            </div>
          </div>


        </div>


        <div
          onMouseEnter={() => setOpenCartModal(true)
          }
          onMouseLeave={() => setOpenCartModal(false)}
            onClick={()=>handleToggleCartModal()} 
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
