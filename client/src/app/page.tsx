'use client'
import Image from "next/image";
import './globals.css';
import test from '../../public/test2.png'
import test2 from '../../public/imgtest.jpg'
import NavBar from "@/components/NavBar/NavBar";
import { useState } from "react";

const images = [
  test,
  test2
]
export default function Home() {
  const [indexAds, setIndexAds] = useState(1)
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-red h-auto bg-red-400">

        <div className="overflow-hidden bg-white h-95 max-md:h-450 text-white select-none flex flex-column  justify-center ">
          <div className="w-290 max-h-50 flex flex-row gap-2 mt-7  max-md:mx-2  max-md:flex-col max-md:w-[100%] max-md:max-h-280 max-md:h-130   ">

            <div className="h-full max-md:h-20 h-1 max-md:grow-6 max-md:h-10 flex relative grow-12 basis-0 "  >
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
            <div className="flex flex-col grow-6 basis-0 gap-[4%] max-h-50 ">
              <img src={typeof test == 'string' ? test : test.src} className="h-[48%] w-full object-cover cursor-pointer " />
              <img src={typeof test == 'string' ? test : test.src} className="h-[48%] w-full object-cover cursor-pointer " />

            </div>
          </div>


        </div >
      </div>

    </>

  );
}
