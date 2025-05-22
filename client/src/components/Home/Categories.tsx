'use client'

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
export type Category = {
    id: string
    name: string,
    image: string
}

export type CategoryProp = {
    setCategory: Function,
    category: Category
}

const Categories = ({ setCategory, category }: CategoryProp) => {

    const categories = useSelector((state: RootState) => state.categories.category)

    return (
        <div className="min-h-80 bg-[#f5f5f5] h-auto w-full flex justify-center max-md:min-h-120 pb-10 ">

            <div className="flex flex-col w-290 bg-white mt-5 rounded-sm">
                <p className="text-[20px] text-gray-500 pl-2 pt-2">Danh mục</p >
                <div className="min-h-[100px] pb-4 h-auto grid grid-cols-8 max-md:grid-cols-4 mt-2 select-none ">
                    {categories?.map((categoryM, i) => {
                        if (categoryM.name == category.name) {
                            return (
                                <div  key={`img category:${i}`} className="border-[1px] min-h-25 bg-gray-200 flex-col border-gray-200 shadow-none hover:shadow-[4px_4px_7px_rgba(0,0,0,0.2)] hover:scale-103 text-center transition-transform duration-350 cursor-pointer flex justify-between items-center">
                                    <div className="w-10 h-[60%] ">
                                        {categoryM.image != '' && <img src={categoryM.image} alt="category" className="w-full h-full object-contain" />}
                                    </div>
                                    <div className="text-wrap h-auto text-[15px] mb-1 break-words leading-tight">

                                        <p>{categoryM.name}</p>
                                    </div>
                                </div>
                            )
                        } else
                            return (

                                <div onClick={() => setCategory(categoryM)} key={`img category:${i}`} className="border-[1px] min-h-25 flex-col border-gray-200 shadow-none hover:shadow-[4px_4px_7px_rgba(0,0,0,0.2)] hover:scale-103 text-center transition-transform duration-350 cursor-pointer flex justify-between items-center">
                                    <div className="w-10 h-[60%] ">
                                        {categoryM.image != '' && <img src={categoryM.image} alt="category" className="w-full h-full object-contain" />}
                                    </div>
                                    <div className="text-wrap h-auto text-[15px] mb-1 break-words leading-tight">

                                        <p>{categoryM.name}</p>
                                    </div>
                                </div>
                            )
                    })}




                </div>
            </div>


        </div>
    );
}

export default Categories;