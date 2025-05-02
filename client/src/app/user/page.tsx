'use client'
import Input from "@/components/Input/Input";
import ItemText from "@/components/NavBar/ItemText";
import Default from '../../../public/default-image.png'
const UserSetting = () => {
    return (
        <div className="min-h-screen bg-[#f5f5f5] w-full flex justify-center">
            <div className="w-200 p-5 bg-white flex flex-col h-fit rounded-sm mt-5">
                <p className="text-[20px]">Hồ sơ của tôi</p>
                <div className="h-[1px] mt-3 w-full border-t-[1px] border-gray-200"></div>
                <div className="flex flex-row">
                    <div className="flex flex-col w-[20%] h-fit ">
                        <p className="mt-5">Tên đăng nhập</p>
                        <p className="mt-14">Email</p>
                    </div>
                    <div className="flex flex-col w-[40%] h-fit">
                        <Input defaultValue={'lqhzz'} placeholder="Nhập tên đăng nhập" />
                        <p className="mt-10">yortvrluer@gmail.com</p>
                    </div>
                    <div className="border-[1px] border-gray-300 select-none flex w-[40%] flex-col ml-5 h-70 justify-center items-center">
                        <div className="size-20 rounded-full bg-gray-200">
                            <img src={typeof Default == 'string' ? Default : Default.src} className="size-full object-cover" />
                        </div>
                        <div onClick={()=>document.getElementById('user-image')?.click()} className="w-25 h-10 mt-3 hover:bg-gray-200 select-none border-[1px] border-gray-300 text-gray-500 cursor-pointer flex justify-center items-center">
                            <p>Chọn ảnh</p>
                        </div>
                        <input id="user-image" type="file" className="hidden" />
                        <p className="w-[80%] h-fit mt-3 text-gray-500">Dụng lượng file tối đa 1 MB.
                        Định dạng:.JPEG, .PNG</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSetting;