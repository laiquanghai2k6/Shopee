'use client'
import { Role } from '@/hooks/useUser';
import Close from '../../../public/close.png'
import ButtonLightRed from '../Button/ButtonLightRed';
import ButtonOrange from '../Button/ButtonOrange';
import { useState } from 'react';

type ModalUserProps = {
    CloseModal: Function,
    Save: Function,
    id: string
}

const ModalUser = ({ CloseModal, Save, id }: ModalUserProps) => {
    const [select, setSelect] = useState<Role>(Role.CLIENT)
    return (
        <div className="fixed min-h-screen z-11000 select-none min-w-screen justify-center flex bg-black/30  items-center p-3  h-30 w-50 border-1 bg-[#f5f5f5] shadow-[0px_0px_4px_rgba(0,0,0,0.5)]">
            <div className="w-150 max-md:w-[95%]  relative h-fit bg-[#f5f5f5] flex mt-[10vh] p-2 select-none flex-col">
                <div className="flex justify-end mr-3 h-7 w-full ">
                    <img src={typeof Close == 'string' ? Close : Close.src} className="size-7 cursor-pointer" onClick={() => CloseModal()} />
                </div>
                <select className='w-full h-10 bg-red-200 cursor-pointer' name="" id="" value={select} onChange={(e) => setSelect(e.target.value as Role)}>
                    <option value={Role.CLIENT}>
                        Khách hàng
                    </option>
                    <option value={Role.ADMIN}>
                        Admin
                    </option>

                </select>
                <div className="flex flex-row justify-between mt-5">

                    <ButtonLightRed extraClass="w-[40%] h-10" text="Hủy" onClick={() => CloseModal()} />
                    <ButtonOrange extraClass="w-[40%] h-10" text="Lưu" onClick={() => { Save(id,select) }} />
                </div>
            </div>
        </div>
    );
}

export default ModalUser;