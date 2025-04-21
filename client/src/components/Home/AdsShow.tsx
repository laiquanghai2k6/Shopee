'use client'
import Ticket from '../../../public/ticket.png'
import test from '../../../public/test2.png'
import test2 from '../../../public/imgtest.jpg'
import Wallet from '../../../public/wallet.png'
import { useState } from 'react'
const images = [
  test,
  test2
]
const AdsShow = () => {
  const [indexAds, setIndexAds] = useState(1)

  return (

    <div className="overflow-hidden bg-white h-95 max-md:h-auto text-white select-none flex flex-col items-center  ">
      <div className="w-290 max-h-60 flex flex-row gap-2 mt-7 max-md:mt-5 max-md:mx-2  max-md:flex-col max-md:w-[100%] max-md:max-h-280 max-md:h-130   ">

        <div className="h-full max-md:mx-2 max-md:h-20 h-1 max-md:grow-6 max-md:h-10 flex relative grow-12 basis-0         hover:scale-102
          transition-transform
          duration-300 "  >
          <div className="flex scroll-snap-x scroll-snap-mandatory scroll-smooth overflow-x-auto
          size-full
  
        [-ms-overflow-style:none] select-none
        [scrollbar-width:none] "
          >
            {images.map((image, i) => {

              return (

                <img key={`img-nav-${i}`} src={typeof image == 'string' ? image : image.src} className="cursor-pointer flex-[1_0_100%] object-cover scroll-snap-start h-full w-full" id={`slide-${i + 1}`} />
              )
            })}
            <div className="absolute bottom-0 flex gap-3 z-10 mb-5 left-[50%]">
              {Array.from({ length: images.length }, (_, i) => {

                if (indexAds == i + 1) {
                  return (
                    <div key={`nav-${i}`} className="size-3  navbar rounded-full cursor-pointer"></div>
                  )
                } else {
                  return (
                    <div key={`nav-${i}`} className="size-3  bg-gray-500 opacity-75 hover:opacity-100 rounded-full cursor-pointer" onClick={(e) => {
                      const currentElement = document.getElementById(`slide-${i + 1}`)
                      e.stopPropagation()

                      currentElement?.scrollIntoView({
                        block: 'nearest',
                        inline: 'start',
                      })
                      setIndexAds(i + 1)
                    }}></div>
                  )
                }


              })}

            </div>
          </div>


        </div>
        <div className="flex flex-col max-md:mx-2  grow-6 basis-0 gap-[4%] max-h-60 ">
          <img src={typeof test == 'string' ? test : test.src} className="h-[48%] hover:scale-102
          transition-transform
          duration-300 w-full object-cover cursor-pointer " />
          <img src={typeof test == 'string' ? test : test.src} className="h-[48%] hover:scale-102
          transition-transform
          duration-300 w-full object-cover cursor-pointer " />

        </div>
      </div>
      <div className="bg-white-700 flex flex-row w-290 h-full items-center justify-around max-md:w-[100%] max-md:h-20 max-md:mt-2 ">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white rounded-xl size-10 border-2 border-gray-200 items-center justify-center flex cursor-pointer">
            <img className="size-[80%]" src={typeof Ticket == 'string' ? Ticket : Ticket.src} />
          </div>
          <p className="text-black">Nhận mã giảm giá</p>


        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white rounded-xl size-10 border-2 border-gray-200 items-center justify-center flex cursor-pointer">
            <img className="size-[80%]" src={typeof Wallet == 'string' ? Wallet : Wallet.src} />
          </div>
          <p className="text-black" >Nạp tiền vào ví</p>

        </div>


      </div>

    </div >

  );
}

export default AdsShow;