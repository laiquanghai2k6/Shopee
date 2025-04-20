import ItemText from "./ItemText";

import FacebookIcon from '../../../public/facebook.png'
import Notification from '../../../public/bell.png'
import Question from '../../../public/question.png'
import Global from '../../../public/global.png'
import Default from '../../../public/default-image.png'
const TopNav = () => {
    return (

        <div className="flex flex-row justify-between max-lg:justify-center">
            <div className="flex flex-row space-x-4 max-lg:hidden ">
                <ItemText text="Kênh bán hàng" />
                <ItemText text="Tải ứng dụng" />
                <ItemText text="Kết nối" type="right" icon={FacebookIcon} />
            </div>
            <div className="flex flex-row space-x-6 justify-center max-md:space-x-4 ">
                <ItemText text="Thông báo" type="left" icon={Notification} />
                <ItemText text="Tải ứng dụng" type="left" icon={Question} />
                <ItemText text="Kết nối" type="left" icon={Global} />
                <ItemText text="lqhzzz" type="left" icon={Default} isImage={true} />
            </div>

        </div>
    );
}

export default TopNav;