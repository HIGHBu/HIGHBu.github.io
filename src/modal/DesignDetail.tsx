import { DoubleRightOutlined, LeftOutlined, ShareAltOutlined, SmileOutlined, StarOutlined } from "@ant-design/icons"
import { commentPlaceholder, showMoreComment } from "../text"
import { Input, Pagination, Tooltip } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { hideDisignDetail } from "../store/modalSlice"
import { AppDispatch, RootState } from "../store/store"
import { Exhibit } from "../api/exhibit"
import { Action, submitComment } from "../api/action"
import { useEffect, useState } from "react"
import { updateActions } from "../store/actionSlice"
import { TextAreaProps } from "antd/lib/input"
import AllComments from "./AllComments"
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
    const itemId=useSelector<RootState,string>(state=>state.modalSlice.exhibitId)
    const item=useSelector<RootState,Exhibit>(state=>state.exhibitSlice.items.find(v=>v.id===itemId)!)
    const comments=useSelector<RootState,Action[]>(state=>state.actionSlice.items[itemId] || [])
    useEffect(()=>{
        dispatch(updateActions(itemId))
    },[itemId])
    const [commentInput,setCommentInput]=useState('')
    const handleChange:Required<TextAreaProps>['onChange']=(event)=>{
        setCommentInput(event.target.value || '')
    }
    const handleSubmit:Required<TextAreaProps>['onPressEnter']=(event)=>{
        submitComment({
            eid: itemId,
            comment_text: commentInput
        }).then(()=>{
            dispatch(updateActions(itemId))
        })
        setCommentInput('')
        event.preventDefault()
    }

    const [showmore,setshowmore]=useState(false)
    const handleShowMore=()=>{
        setshowmore(true)
    }
    const handleCloseShowMore=()=>{
        setshowmore(false)
    }

    return (
    <div className='modal-design-detail'>
        <div className='left-col'>
            {showmore && <AllComments onClose={handleCloseShowMore} items={comments}/>}
            <div className='comment-danmaku'>
                {!showmore && comments.slice(0,3).map(item=>(<div key={item.id}><span className='main-text'>{item.comment_text}</span></div>))}
            </div>
            <a className='show-more text' onClick={handleShowMore}>
                {showMoreComment}
                <DoubleRightOutlined />
            </a>
            <img src={item?.avatar}/>
            <div className="comment-group">
                <TextArea
                    placeholder={commentPlaceholder}
                    showCount
                    maxLength={20}
                    className='text'
                    value={commentInput}
                    onChange={handleChange}
                    onPressEnter={handleSubmit}
                />
                <Tooltip title={EmojiTooltip} trigger='hover' overlayClassName='emoji-bar'>
                    <button type='button'>
                        <SmileOutlined/>
                    </button>
                </Tooltip>
            </div>
        </div>
        <div className="right-col">
            {/* <img src={item?.pics[0]}/> */}
            <iframe src="//player.bilibili.com/player.html?aid=807745738&bvid=BV1J34y1z7WU&cid=471414089&page=1"
                scrolling="no"
                //border="0"
                frameBorder="no"
                //frameSpacing="0"
                allowFullScreen={true}
            />
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