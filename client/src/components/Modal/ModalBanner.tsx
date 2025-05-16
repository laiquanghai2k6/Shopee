'use client'
import { Fragment, useEffect, useState } from 'react'
import Close from '../../../public/close.png'
import Input from '../Input/Input'
import ButtonOrange from '../Button/ButtonOrange'
import { CreateImage } from './ModalCategory'
import { useDispatch } from 'react-redux'
import { LoadingType, setLoading } from '@/slice/loadingSlice'


type ModalBannerProps = {
    closeBanner: Function
    bgNavigate: string[],
    SaveBanner: Function,
setIsLoading:Function

}

const ModalBanner = ({ closeBanner,setIsLoading, bgNavigate, SaveBanner }: ModalBannerProps) => {

    const [bgNavigateState,setBgNavigateState] = useState(bgNavigate)
    const dispatch = useDispatch()
    const CloseBannerSetting = () => {
        closeBanner()
    }
    useEffect(() => {
        const gallery = document.getElementById("gallery");
        if (!gallery) return;
        let draggingEl: HTMLImageElement | null = null;
        let tempEl: HTMLImageElement | null = null;
        let originX = 0, originY = 0
        const galleryStyle = getComputedStyle(gallery);
        const galleryWidth = gallery.clientWidth;

        const columnGap = parseFloat(galleryStyle.columnGap); 

        const itemWidth = 200; 
        const totalItemWidth = itemWidth + columnGap;

        const cols = Math.floor(galleryWidth / totalItemWidth);
        const placeholder = document.createElement("div");
        placeholder.className = "placeholder";
        const dragStart = (e: DragEvent) => {

            const dragEvent = e as DragEvent;
            const target = dragEvent.target as HTMLImageElement;
            if (target?.classList.contains("image")) {
                draggingEl = target;
                gallery.insertBefore(placeholder, draggingEl.nextSibling);
                if (dragEvent.dataTransfer) {
                    const galleryRect = gallery.getBoundingClientRect();
                    const x = e.clientX - galleryRect.left;

                    const y = e.clientY - galleryRect.top;

                    originX = Math.min(Math.floor(x / 220), cols - 1);
                    originY = Math.floor(y / (110 + 10));
                    dragEvent.dataTransfer.effectAllowed = "move";
                    const canvas = document.createElement("canvas");
                    canvas.width = 200;
                    canvas.height = 112.5;
                    const ctx = canvas.getContext("2d")!;
                    ctx.drawImage(target, 0, 0, canvas.width, canvas.height);
                    dragEvent.dataTransfer.setDragImage(canvas, canvas.width / 2, canvas.height / 2);

                }
                requestAnimationFrame(() => {
                    draggingEl!.style.display = 'none';
                });


            }

        }
        const dragOver = (e: DragEvent) => {


            e.preventDefault();
            const children = [...gallery.children].filter(el => el.tagName == 'IMG');
            const galleryRect = gallery.getBoundingClientRect();
            const x = e.clientX - galleryRect.left;

            const y = e.clientY - galleryRect.top;

            const col = Math.min(Math.floor(x / 220), cols - 1);
            const row = Math.floor(y / (110 + 10));
            let index = row * cols + col;
            if (index > children.length - 1) index = children.length - 1;

            children.forEach(el => {
                el.classList.remove("push-left", "push-right", "push-up", "push-down");
            });

            if (originY == row && originX > col) {
                gallery.insertBefore(placeholder, children[index]);
                console.log(1)
            } else if (originY == row && originX < col) {
                gallery.insertBefore(placeholder, children[index].nextSibling);
                console.log(2)
            }
            else if (originY != row && originX < col) {

                console.log(3)
                if (originY < row) {

                    gallery.insertBefore(placeholder, children[index + 1]);
                } else {
                    gallery.insertBefore(placeholder, children[index])
                }
            }
            else if (originY != row && originX > col) {
                if (originY < row) {

                    gallery.insertBefore(placeholder, children[index].nextSibling);
                } else {
                    gallery.insertBefore(placeholder, children[index]);
                }
                console.log(4)


            } else if (originY != row && originX == col) {
                if (originY < row) {

                    gallery.insertBefore(placeholder, children[index + 1]);
                } else {
                    gallery.insertBefore(placeholder, children[index]);

                }
                console.log(5)
            } else {
                gallery.insertBefore(placeholder, children[index]);

                console.log(6)
            }


            children.forEach(el => {
                const elIndex = children.indexOf(el);
                if (elIndex < index) {
                    if (Math.floor(elIndex / cols) === Math.floor(index / cols)) {
                        el.classList.add("push-left");
                    }
                } else if (elIndex > index) {
                    if (Math.floor(elIndex / cols) === Math.floor(index / cols)) {
                        el.classList.add("push-right");
                    }
                }
            });


        }
        const dragDrop = (e: DragEvent) => {


            e.preventDefault();
            if (draggingEl) {
                gallery.insertBefore(draggingEl, placeholder);


            }
            draggingEl!.style.removeProperty('display');

            cleanup();

        }
        const dragEnd = (e: DragEvent) => {
            if (draggingEl) {
                draggingEl!.style.removeProperty('display');

                cleanup();
            }


        }

        function cleanup() {
            if (draggingEl)
                draggingEl.style.opacity = '1'

            placeholder.remove();
            if (gallery) {

                [...gallery.children].forEach(el => el.classList.remove("push-left", "push-right", "push-up", "push-down"));
            }
            draggingEl = null;
        }
        gallery.addEventListener("dragstart", dragStart);
        gallery.addEventListener("dragover", dragOver);
        gallery.addEventListener("drop", dragDrop);
        gallery.addEventListener("dragend", dragEnd);

        console.log('galerry:', gallery)
        return () => {
            gallery?.removeEventListener("dragstart", dragStart);
            gallery?.removeEventListener("dragover", dragOver);
            gallery?.removeEventListener("drop", dragDrop);
            gallery?.removeEventListener("dragend", dragEnd);
        };
    }, [])
    const ChangeNav = () => {
        const gallery = document.getElementById('gallery')
        if (gallery) {

            const childrend = [...gallery.children].filter((el) => el.tagName == 'IMG').map((el) => (el as HTMLImageElement).src)
            console.log('gallery', childrend)
        }
    }
    return (
        <div className="h-full w-screen bg-black/50  z-10000 flex fixed items-center justify-center">
            <div className="w-250 overflow-auto h-150 bg-[#f5f5f5] flex p-4 select-none flex-col">

                <div className="flex flex-row h-7 justify-end w-full cursor-pointer" onClick={() => CloseBannerSetting()}>
                    <img src={typeof Close == 'string' ? Close : Close.src} className='size-7' />
                </div>
                <p className='text-[20px]'>Chỉnh ảnh:</p>
                <div id='gallery' className='w-[80%] grid grid-cols-[repeat(auto-fit,200px)] gap-5 border-1 p-2'>

                    {bgNavigateState.map((img, i) => {
                        return (
                            <Fragment key={i}>
                                <img onClick={() => document.getElementById(`banner-${i}`)?.click()} src={img} draggable className='image hover:shadow-[0px_0px_7px_rgba(0,0,0,0.5)] cursor-pointer aspect-[16/9] object-cover size-full' />
                                <input onChange={async (e) => {
                                    if (!e.target?.files?.[0].type.startsWith('image'))
                                    return alert('Vui lòng chọn ảnh')
                                    try{
                                        setIsLoading(true)
                                        const url =await  CreateImage(e.target?.files?.[0],'banner')
                                        setBgNavigateState((prev)=>{
                                            const temp = [...prev]
                                            temp[i] = url
                                            return temp
                                        })

                                        setIsLoading(false)
                                        dispatch(setLoading({active:true,text:'Tải ảnh thành công!',type:LoadingType.SUCCESS}))

                                    }catch(e){
                                        console.log(e)
                                        setIsLoading(false)
                                        dispatch(setLoading({active:true,text:'Tải ảnh không thành công!',type:LoadingType.ERROR}))


                                    }

                                }} id={`banner-${i}`} className='hidden' type='file' />


                            </Fragment>

                        )
                    })}
                </div>

                <div className='flex flex-row w-full  items-center'>

                    <p className='text-[20px] mt-3 min-w-45 '>Thêm ảnh mới:</p>
                    <div onClick={() => document.getElementById(`banner-create-z`)?.click()} className='w-[300px] aspect-[16/9] cursor-pointer hover:shadow-[0px_0px_7px_rgba(0,0,0,0.5)] border-1 mt-5'>
                  
                    </div>
                      <input
                    id={`banner-create-z`} className='hidden' type='file'
                    onChange={async (e) => {
                                    if (!e.target?.files?.[0].type.startsWith('image'))
                                    return alert('Vui lòng chọn ảnh')
                                    try{
                                        setIsLoading(true)
                                        const url =await  CreateImage(e.target?.files?.[0],'banner')
                                        setBgNavigateState((prev)=>([...prev,url]))

                                        setIsLoading(false)
                                        dispatch(setLoading({active:true,text:'Tải ảnh thành công!',type:LoadingType.SUCCESS}))

                                    }catch(e){
                                        console.log(e)
                                        setIsLoading(false)
                                        dispatch(setLoading({active:true,text:'Tải ảnh không thành công!',type:LoadingType.ERROR}))


                                    }

                                }}
                    />
                </div>
                <ButtonOrange onClick={() => { SaveBanner('bgNav','1',bgNavigateState) }} text='Luư' extraClass='w-[50%] h-15 mt-3 self-center' />

            </div>
        </div>
    );
}

export default ModalBanner;