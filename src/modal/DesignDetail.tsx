import { DoubleRightOutlined, LeftOutlined, ShareAltOutlined, SmileOutlined, StarOutlined } from "@ant-design/icons"
import { commentPlaceholder, showMoreComment } from "../text"
import { Input, Pagination, Tooltip } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { hideDisignDetail } from "../store/modalSlice"
import { AppDispatch, RootState } from "../store/store"
import { Exhibit } from "../api/exhibit"
const { TextArea } = Input
function EmojiTooltip(){
    return (<div>
        <span>😀</span>
        <span>🤔</span>
        <span>🙁</span>
        <span>😓</span>
    </div>)
}
function DesignDetail(){
    const dispatch=useDispatch<AppDispatch>()
    const handleClose=()=>dispatch(hideDisignDetail())
    const item=useSelector<RootState,Exhibit>(state=>state.exhibitSlice.items.find(v=>v.id===state.modalSlice.exhibitId)!)
    return (
    <div className='modal-design-detail'>
        <div className='left-col'>
            <div className='comment-danmaku'>

            </div>
            <a className='show-more text'>
                {showMoreComment}
                <DoubleRightOutlined />
            </a>
            <img src={item?.avatar}/>
            <div className="comment-group">
                <TextArea placeholder={commentPlaceholder} showCount maxLength={20} className='text'/>
                <Tooltip title={EmojiTooltip} trigger='hover' overlayClassName='emoji-bar'>
                    <button type='button'>
                        <SmileOutlined/>
                    </button>
                </Tooltip>
            </div>
        </div>
        <div className="right-col">
            <img src={item?.pics[0]}/>
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
        <button type='button' className='back-button' onClick={handleClose}>
            <LeftOutlined />  
        </button>
    </div>)
}
export default DesignDetail