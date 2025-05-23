'use client'
import { useState } from 'react'
import StarOrange from './../../../public/star-orange.png'
import Default from '../../../public/default-image.png'


export enum OptionComment{
    ALL='all',
    FIVE='five',
    FOUR='four',
    THREE="three",
    TWO='two',
    ONE='one',
    IMAGE='image'
}
const CommentProduct = () => {

    const [optionComment,setOptionComment] = useState<OptionComment>(OptionComment.ALL)
    const currentDate = new Date().toISOString().slice(0,16).replace('T',' ')
    const text = `Sốp rep thân thiện (ko như sốp 2 số nào đó), bao bọc hàng kĩ, nhưng mà hộp em hơi móp bên trong như video ạ :< Giao hàng nhanh như The flash ( dự kiến 24-29/4 nhưng mới 14 đã tới) mô hình đủ quà tặng và runner (không như hãng M nào đó 🐧)`
    return (
        <div className="w-full h-auto bg-white mt-5">
            <div className="flex p-7  min-h-10 flex-col">
                <div className="w-full h-15  flex items-center">
                    <p className="ml-3 text-[20px]">ĐÁNH GIÁ SẢN PHẨM</p>
                </div>
                <div className="w-full h-40 p-5 bg-red-50 flex flex-row justify-around items-center">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center">
                            <p className="text-[35px] text-[#ee4d2d]">5</p>
                            <p className="text-[20px] text-[#ee4d2d] ml-2">trên 5</p>
                        </div>
                        <div className="flex flex-row items-center">
                            {Array.from({length:5},(_,i)=>(
                                <img key={i} src={typeof StarOrange =='string' ? StarOrange : StarOrange.src} className='size-6' />
                            ))}

                        </div>
                    </div>
                    <div className='grow-1 h-full ml-20 flex-wrap flex flex-row items-center gap-2'>
                            <div onClick={()=>{setOptionComment(OptionComment.ALL)}} className={`w-25 cursor-pointer h-8 bg-white border-1 rounded-[2px] ${optionComment == OptionComment.ALL ? 'border-[#ee4d2d] text-[#ee4d2d]' : 'border-gray-200'}  flex items-center justify-center`}>
                                <p>Tất cả</p>
                            </div>
                            <div onClick={()=>{setOptionComment(OptionComment.FIVE)}} className={`w-25 cursor-pointer h-8 bg-white border-1 rounded-[2px] ${optionComment == OptionComment.FIVE ? 'border-[#ee4d2d] text-[#ee4d2d]' : 'border-gray-200'}  flex items-center justify-center`}>
                                <p>5 sao</p>
                            </div>
                            <div onClick={()=>{setOptionComment(OptionComment.FOUR)}} className={`w-25 cursor-pointer h-8 bg-white border-1 rounded-[2px] ${optionComment == OptionComment.FOUR ? 'border-[#ee4d2d] text-[#ee4d2d]' : 'border-gray-200'}  flex items-center justify-center`}>
                                <p>4 sao</p>
                            </div>
                            <div onClick={()=>{setOptionComment(OptionComment.THREE)}} className={`w-25 cursor-pointer h-8 bg-white border-1 rounded-[2px] ${optionComment == OptionComment.THREE ? 'border-[#ee4d2d] text-[#ee4d2d]' : 'border-gray-200'}  flex items-center justify-center`}>
                                <p>3 sao</p>
                            </div>
                            <div onClick={()=>{setOptionComment(OptionComment.TWO)}} className={`w-25 cursor-pointer h-8 bg-white border-1 rounded-[2px] ${optionComment == OptionComment.TWO ? 'border-[#ee4d2d] text-[#ee4d2d]' : 'border-gray-200'}  flex items-center justify-center`}>
                                <p>2 sao</p>
                            </div>
                            <div onClick={()=>{setOptionComment(OptionComment.ONE)}} className={`w-25 cursor-pointer h-8 bg-white border-1 rounded-[2px] ${optionComment == OptionComment.ONE ? 'border-[#ee4d2d] text-[#ee4d2d]' : 'border-gray-200'}  flex items-center justify-center`}>
                                <p>1 sao</p>
                            </div>
                            <div onClick={()=>{setOptionComment(OptionComment.IMAGE)}} className={`w-25 cursor-pointer h-8 bg-white border-1 rounded-[2px] ${optionComment == OptionComment.IMAGE ? 'border-[#ee4d2d] text-[#ee4d2d]' : 'border-gray-200'}  flex items-center justify-center`}>
                                <p>Có hình ảnh</p>
                            </div>
                    </div>

                </div>
                <div className='flex flex-col w-full min-h-30 h-auto'>
                    <div className='flex flex-row mt-3 pb-10 border-b-1'>
                        <div className='size-10 rounded-full bg-[#f5f5f5]'>
                            <img src={typeof Default == 'string' ? Default :Default.src} className='size-full object-cover rounded-full' alt="" />
                        </div>
                        <div className='size-full flex-col ml-3'>
                            <p>Lại Hải</p>
                            <div className="flex flex-row items-center">
                            {Array.from({length:5},(_,i)=>(
                                <img key={i} src={typeof StarOrange =='string' ? StarOrange : StarOrange.src} className='size-3.5' />
                            ))}

                        </div>
                        <div className='mt-2'>
                            <p className='text-[13px]'>{currentDate}</p>
                        </div>
                        <div className='mt-2'>
                            <p>{text}</p>

                        </div>
                        </div>
                    </div>
                    <div className='flex flex-row mt-3 pb-10 border-b-1'>
                        <div className='size-10 rounded-full bg-[#f5f5f5]'>
                            <img src={typeof Default == 'string' ? Default :Default.src} className='size-full object-cover rounded-full' alt="" />
                        </div>
                        <div className='size-full flex-col ml-3'>
                            <p>Lại Hải</p>
                            <div className="flex flex-row items-center">
                            {Array.from({length:5},(_,i)=>(
                                <img key={i} src={typeof StarOrange =='string' ? StarOrange : StarOrange.src} className='size-3.5' />
                            ))}

                        </div>
                        <div className='mt-2'>
                            <p className='text-[13px]'>{currentDate}</p>
                        </div>
                        <div className='mt-2'>
                            <p>{text}</p>

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentProduct;