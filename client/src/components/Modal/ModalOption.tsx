
'use client'
import { useState } from "react";
import ButtonLightRed from "../Button/ButtonLightRed";
import ButtonOrange from "../Button/ButtonOrange";
import Input from "../Input/Input";
import { Detail, InfoProduct } from "./ModalProduct";
type ModalOptionProp = {
    CloseModal: Function
    setAddProductsOption: Function,
    infoProduct: InfoProduct,
    type: string,
    index: number,
    indexOption: number,
    indexDetail: number
}
export type Option = {
    name: string,

}

export type ProductOptions = {
    name: string,
    options: Option[],

}

const ModalOption = ({ CloseModal, index, indexDetail, indexOption, setAddProductsOption, type, infoProduct }: ModalOptionProp) => {
    const [name, setName] = useState('')
    const [option, setOption] = useState<Option>({

        name: indexOption == -1 ||infoProduct.productOptions ==undefined  ? '' : infoProduct.productOptions[index].options[indexOption].name
    })
    const [detail, setDetail] = useState<Detail>({
        name: indexDetail == -1 ||infoProduct.detail ==undefined? '' : infoProduct.detail[indexDetail].name,
        value: indexDetail == -1 ||infoProduct.detail ==undefined? '' : infoProduct.detail[indexDetail].value
    })
    const Save = () => {
        console.log(type)
        switch (type) {
            case 'product-option':
                const productOption: ProductOptions = {
                    name: name,
                    options: []
                }
                const temp = infoProduct
                if(temp.productOptions)
                temp.productOptions.push(productOption)
                setAddProductsOption(temp)
                break
            case 'option':
                const tmp = infoProduct
                const optionTemp: Option = {

                    name: option.name
                }
                if(tmp.productOptions)
                tmp.productOptions[index]?.options.push(optionTemp)
                setAddProductsOption(tmp)
                break
            case 'change-option':


                const temp1 = infoProduct
                const optionTemp1: Option = {

                    name: option.name
                }
                if(temp1.productOptions)
                temp1.productOptions[index].options[indexOption] = optionTemp1
                setAddProductsOption(temp1)
                break
            case 'create-detail':

                const temp2 = infoProduct
                const detail1: Detail = detail
                if(temp2.detail)

                temp2.detail.push(detail1)
                setAddProductsOption(temp2)
                break
            case 'change-detail':
                const temp3 = infoProduct
                const detail2: Detail = detail
                if(temp3.detail)

                temp3.detail[indexDetail] = detail2
                setAddProductsOption(temp3)
                break
        }

        CloseModal()
    }
    const renderer = () => {
        console.log('type:', type)
        switch (type) {
            case 'product-option':
                return (
                    <>
                        <p>Tên phân loại</p>
                        <Input autoFocus onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                Save();
                            }
                        }} value={name} onChange={(e) => setName(e.target.value)} />
                        <div className="flex flex-row justify-between mt-5">

                            <ButtonLightRed extraClass="w-[40%] h-10" text="Hủy" onClick={() => CloseModal()} />
                            <ButtonOrange extraClass="w-[40%] h-10" text="Lưu" onClick={() => { Save() }} />
                        </div>
                    </>
                )
            case 'option':
                return (
                    <>
                        <p>Giá trị</p>
                        <Input autoFocus onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                Save();
                            }
                        }} value={option.name} onChange={(e) => setOption((prev) => ({ ...prev, name: e.target.value }))} />


                        <div className="flex flex-row justify-between mt-5">

                            <ButtonLightRed extraClass="w-[40%] h-10" text="Hủy" onClick={() => CloseModal()} />
                            <ButtonOrange extraClass="w-[40%] h-10" text="Lưu" onClick={() => { Save() }} />
                        </div>
                    </>
                )
            case 'change-option':
                return (
                    <>
                        <p>Giá trị</p>
                        <Input autoFocus onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                Save();
                            }
                        }} value={option.name} onChange={(e) => setOption((prev) => ({ ...prev, name: e.target.value }))} />



                        <div className="flex flex-row justify-between mt-5">

                            <ButtonLightRed extraClass="w-[40%] h-10" text="Hủy" onClick={() => CloseModal()} />
                            <ButtonOrange extraClass="w-[40%] h-10" text="Lưu" onClick={() => { Save() }} />
                        </div>
                    </>
                )
            case 'create-detail':
                return (

                    <>
                        <p>Tên:</p>
                        <Input autoFocus onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                Save();
                            }
                        }} value={detail.name} onChange={(e) => setDetail((prev) => ({ ...prev, name: e.target.value }))} />
                        <p>Giá trị: </p>
                        <Input onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                Save();
                            }
                        }} value={detail.value} onChange={(e) => setDetail((prev) => ({ ...prev, value: e.target.value }))} />


                        <div className="flex flex-row justify-between mt-5">

                            <ButtonLightRed extraClass="w-[40%] h-10" text="Hủy" onClick={() => CloseModal()} />
                            <ButtonOrange extraClass="w-[40%] h-10" text="Lưu" onClick={() => { Save() }} />
                        </div>
                    </>
                )
            case 'change-detail':
                return (
                    <>
                        <p>Tên:</p>
                        <Input autoFocus onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                Save();
                            }
                        }} value={detail.name} onChange={(e) => setDetail((prev) => ({ ...prev, name: e.target.value }))} />
                        <p>Giá trị: </p>
                        <Input onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                Save();
                            }
                        }} value={detail.value} onChange={(e) => setDetail((prev) => ({ ...prev, value: e.target.value }))} />


                        <div className="flex flex-row justify-between mt-5">

                            <ButtonLightRed extraClass="w-[40%] h-10" text="Hủy" onClick={() => CloseModal()} />
                            <ButtonOrange extraClass="w-[40%] h-10" text="Lưu" onClick={() => { Save() }} />
                        </div>
                    </>
                )

        }
    }
    return (
        <div className="fixed min-h-screen z-11000 select-none min-w-screen justify-center flex bg-black/30  items-center p-3  h-30 w-50 border-1 bg-[#f5f5f5] shadow-[0px_0px_4px_rgba(0,0,0,0.5)]">
            <div className="w-150 overflow-y-auto relative h-fit bg-[#f5f5f5] flex mt-[10vh] p-2 select-none flex-col">
                {renderer()}
            </div>
        </div>
    );
}

export default ModalOption;