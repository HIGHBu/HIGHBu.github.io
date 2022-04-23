import { DoubleRightOutlined, LeftOutlined, SmileOutlined } from "@ant-design/icons"
import { commentPlaceholder, showMoreComment } from "../text"
import demoPic from '../assets/APP.png'
import { Input } from "antd"
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
                <TextArea placeholder={commentPlaceholder} showCount maxLength={20} className='text' rows={1}/>
                <button type='button'>
                    <SmileOutlined/>
                </button>
            </div>
        </div>
        <button type='button' className='back-button'>
            <LeftOutlined />  
        </button>
    </div>)
}
export default DesignDetail