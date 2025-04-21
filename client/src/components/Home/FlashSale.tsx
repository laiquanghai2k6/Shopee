import { useEffect, useState } from "react"
import ProductList from "./ProductList"
import FlashSaleLogo from '../../../public/flash-sale.png'

export type ProductOverview  = {
    id:string,
    title:string,
    price:number,
    discount:number,
    image:string
}
const fakeProduct = [
    {    id:'1',
        title:'Laptop gaming Acer',
        price:20000000,
        discount:10,
        image:'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    },
    {    id:'2',
        title:'Laptop gaming Acer',
        
        price:20000000,
        discount:10,
        image:'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    },
    {    id:'3',
        title:'Laptop gaming Acer',
        
        price:20000000,
        discount:10,
        image:'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    },
    {    id:'4',
        title:'Laptop gaming Acer',
        
        price:20000000,
        discount:10,
        image:'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    },
    {    id:'5',
        title:'Laptop gaming Acer',
        
        price:20000000,
        discount:10,
        image:'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    },
    {    id:'6',
        title:'Laptop gaming Acer',
        
        price:20000000,
        discount:10,
        image:'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    },
    {    id:'7',
        title:'Laptop gaming Acer',
        
        price:20000000,
        discount:10,
        image:'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    },
    {    id:'8',
        title:'Laptop gaming Acer',
        
        price:20000000,
        discount:10,
        image:'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    },
    {    id:'9',
        title:'Laptop gaming Acer',
        
        price:20000000,
        discount:10,
        image:'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    },
    {    id:'10',
        title:'Laptop gaming Acer',
        
        price:20000000,
        discount:10,
        image:'https://th.bing.com/th/id/OIP.Qf2RFcuudbE3JRqkxfae_wHaHa?rs=1&pid=ImgDetMain'
    }
]
const FlashSale = () => {
    let futureTime = 1745214800927


    const [time, setTime] = useState({
        hour: '0',
        minute: '0',
        second: '0'
    })
    const [prevTime, setPrevTime] = useState({
        hour: '0',
        minute: '0',
        second: '0'
    })
    useEffect(() => {
        const calTime = setInterval(() => {
            const current = futureTime - Date.now()

            let hour: string = (Math.floor(current / (1000 * 3600)) % 24).toString()
            let minute: string = (Math.floor(current / (1000 * 60)) % 60).toString()
            let second: string = (Math.floor(current / 1000) % 60).toString()
            if (minute.length < 2) {

                minute = '0' + minute
            }
            if (second.length < 2) {
                second = '0' + second
            }
            if (hour.length < 2 && hour == '0') {
                hour = '0' + hour
            }
            setTime((prev) => {
                setPrevTime(prev)
                return {
                    hour,
                    minute,
                    second
                }
            })
        }, 1000)
        return () => clearInterval(calTime)
    }, [])
    
    return (
        <>
        {time.hour != '0' && time.minute != '0' && time.second != '0' && (

        <div className="flex bg-[#f5f5f5] min-h-80 justify-center select-none">
            <div className="flex w-290 h-full bg-white flex-col">
                <div className="flex flex-row items-center">
                    <div className="h-15 w-30 flex item-center">
                        <img src={typeof FlashSaleLogo == 'string' ? FlashSaleLogo : FlashSaleLogo.src} className="object-contain" />
                    </div>
                    
                        <div key={`${time.hour}:${time.minute}:${time.second}`} className="text-[27px] text-red-700 ml-3 ">
                            <div className="flex flex-row justify-around w-fit gap-2 text-[15px] font-bold">
                                {prevTime.hour != time.hour ? (
                                    <div className="relative size-6  bg-black flex rounded-sm flex-col items-center p-0.5 justify-center text-white box-border ">
                                        <p className="up absolute">{`${prevTime.hour}`}</p>
                                        <p className="down absolute bottom-[-100%]">{`${time.hour}`}</p>
                                    </div>
                                ) : (
                                    <div className="size-6  bg-black flex rounded-sm flex-col items-center p-0.5 justify-center text-white  ">
                                        <p >{`${time.hour}`}</p>
                                    </div>
                                )}

                                {prevTime.minute != time.minute ?(
                                    <div className="relative size-6  bg-black flex rounded-sm flex-col items-center p-0.5 justify-center text-white box-border ">
                                        <p className="up absolute">{`${prevTime.minute}`}</p>
                                        <p className="down absolute bottom-[-100%]">{`${time.minute}`}</p>
                                    </div>
                                ) : (
                                    <div className="relative size-6  bg-black flex rounded-sm flex-col items-center p-0.5 justify-center text-white box-border ">
                                    <p >{`${time.minute}`}</p>
                                </div>
                                )}


                                {prevTime.second != time.second && (
                                    <div className="relative size-6  bg-black flex rounded-sm flex-col items-center p-0.5 justify-center text-white box-border ">
                                        <p className="up absolute">{`${prevTime.second}`}</p>
                                        <p className="down absolute bottom-[-100%]">{`${time.second}`}</p>

                                    </div>
                                )}

                            </div>
                            {/* {`:${time.minute}:${time.second}`} */}
                        </div>
                    
                </div>



                <ProductList product={fakeProduct} />
            </div>

        </div>
        )}
        </>
    );
}

export default FlashSale;