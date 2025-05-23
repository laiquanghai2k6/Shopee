'use client'
import Ticket from '../../../public/ticket.png'
import Wallet from '../../../public/wallet.png'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import ModalVouncherClient from '../Modal/ModalVouncherClient'
import ModalPayment from '../Modal/ModalPayment'
import { LoadingType, setLoading } from '@/slice/loadingSlice'

const AdsShow = ({ Loading }: { Loading: Function }) => {
  const [indexAds, setIndexAds] = useState(1)
  const dispatch = useDispatch()
  const [modal, setModal] = useState({
    active: false
  })
  const userId = useSelector((state: RootState) => state.user.user.id)

  const [modalPayment, setModalPayment] = useState(false)
  const [isPending, startTransition] = useTransition()
  const closeModal = useCallback(() => {
    setModal({ active: false })
  }, [])
  const banner = useSelector((state: RootState) => state.banner.banner)


  useEffect(() => {
    if (isPending) Loading(true)
    else Loading(false)
  }, [isPending])
  useEffect(() => {
    const time = setInterval(() => {
      setIndexAds((prev) => {

        if (prev == banner.bgNavigate.length) {
          const currentElement = document.getElementById(`slide-1`)
          currentElement?.scrollIntoView({
            block: 'nearest',
            inline: 'start',
          })
          return 1
        } else {
          const currentElement = document.getElementById(`slide-${prev + 1}`)
          currentElement?.scrollIntoView({
            block: 'nearest',
            inline: 'start',
          })
          return prev + 1
        }
      })
    }, 3000)
    return () => {
      clearInterval(time)
    }
  }, [indexAds])
  const closeModals = () => setModalPayment(false)
  return (
    <>
      {modal.active && <ModalVouncherClient closeModal={closeModal} />}
      {modalPayment && <ModalPayment Loading={Loading} closeModal={closeModals} startTransition={startTransition} />}
      <div className="overflow-hidden bg-white h-95 max-md:h-auto text-white select-none flex flex-col items-center  ">
        <div className="w-290 max-h-60 flex flex-row gap-2 mt-7 max-md:mt-5 max-md:mx-2  max-md:flex-col max-md:w-[100%] max-md:max-h-280 max-md:h-130   ">

          <div className="h-full max-md:mx-2 max-md:h-20 h-1 max-md:grow-6 max-md:h-10 flex relative grow-12 basis-0 hover:scale-102
          transition-transform
          duration-300 "  >
            <div className="flex touch-none scroll-snap-x scroll-snap-mandatory scroll-smooth overflow-x-auto
          size-full
  
        [-ms-overflow-style:none] select-none
        [scrollbar-width:none] "
            >
              {banner.bgNavigate.map((image, i) => {

                return (

                  (image != '' && <img key={`img-nav-${i}`} src={image} className="cursor-pointer flex-[1_0_100%] object-cover scroll-snap-start h-full w-full" id={`slide-${i + 1}`} />)
                )
              })}
              <div className="absolute bottom-0 flex gap-3 z-10 mb-5 left-[50%]">
                {Array.from({ length: banner.bgNavigate.length }, (_, i) => {

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
            {banner.bg1 != '' && <img src={banner.bg1} className="h-[48%] aspect-[16/9] hover:scale-102
          transition-transform
          duration-300 w-full object-cover cursor-pointer " />}
            {banner.bg2 != '' && <img src={banner.bg2} className="h-[48%] aspect-[16/9] hover:scale-102
          transition-transform
          duration-300 w-full object-cover cursor-pointer " />}

          </div>
        </div>
        <div className="bg-white-700 flex flex-row w-290 h-full items-center justify-around max-md:w-[100%] max-md:h-20 max-md:mt-2 ">
          <div className="flex flex-col justify-center items-center">
            <div onClick={() => {
              if (userId == '')
                return dispatch(setLoading({ active: true, text: 'Vui lòng đăng nhập', type: LoadingType.ERROR }))
              setModal({ active: true })
            }} className="bg-white rounded-xl size-10 border-2 border-gray-200 items-center justify-center flex cursor-pointer">
              <img className="size-[80%]" src={typeof Ticket == 'string' ? Ticket : Ticket.src} />
            </div>
            <p className="text-black">Nhận mã giảm giá</p>


          </div>
          <div className="flex flex-col justify-center items-center">
            <div onClick={() => {
              if (userId == '')
                return dispatch(setLoading({ active: true, text: 'Vui lòng đăng nhập', type: LoadingType.ERROR }))
              setModalPayment(true)
            }} className="bg-white rounded-xl size-10 border-2 border-gray-200 items-center justify-center flex cursor-pointer">
              <img className="size-[80%]" src={typeof Wallet == 'string' ? Wallet : Wallet.src} />
            </div>
            <p className="text-black" >Nạp tiền vào ví</p>

          </div>


        </div>

      </div >
    </>

  );
}

export default AdsShow;