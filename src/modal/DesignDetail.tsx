import { DoubleRightOutlined, LeftOutlined, ShareAltOutlined, SmileOutlined, StarOutlined } from "@ant-design/icons"
import { commentPlaceholder, showMoreComment } from "../text"
import demoPic from '../assets/APP.png'
import { Input, Pagination } from "antd"
const { TextArea } = Input
function DesignDetail(){
    return (
    <div className='modal-design-detail'>
        <div className='left-col'>
            <div className='comment-danmaku'>

            </div>
            <a className='show-more text'>
                {showMoreComment}
                <DoubleRightOutlined />
            </a>
            <img src={demoPic}/>
            <div className="comment-group">
                <TextArea placeholder={commentPlaceholder} showCount maxLength={20} className='text'/>
                <button type='button'>
                    <SmileOutlined/>
                </button>
            </div>
        </div>
        <div className="right-col">
            <img src={demoPic}/>
            <div className="nav-and-action">
                <div/>
                <Pagination total={5}/>
                <div className="actions">
                    <button type='button'>
                        <StarOutlined/>
                    </button>
                    <button type='button'>
                        <ShareAltOutlined/>
                    </button>
                </div>
            </div>
        </div>
        <button type='button' className='back-button'>
            <LeftOutlined />  
        </button>
    </div>)
}
export default DesignDetail