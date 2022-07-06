import { DoubleRightOutlined, LeftOutlined, ShareAltOutlined, SmileOutlined, StarFilled, StarOutlined } from "@ant-design/icons"
import { commentPlaceholder, noComment, showMoreComment } from "../glob"
import { Button, Input, message, Pagination, Tooltip } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { hideDisignDetail } from "../store/modalSlice"
import { AppDispatch, RootState } from "../store/store"
import { Exhibit } from "../api/exhibit"
import { Action, likeExhibit, shareExhibit, submitComment, visitExhibit } from "../api/action"
import { useEffect, useMemo, useState } from "react"
import { updateActions } from "../store/actionSlice"
import { TextAreaProps } from "antd/lib/input"
import AllComments from "./AllComments"
import { useNavigate } from "react-router-dom"
import copy from 'copy-to-clipboard'
import { UpdateFavorite } from "../store/userSlice"
const { TextArea } = Input
export const emojilist=['😀','🤔','🙁','😓']
function DesignDetail(){
    const dispatch=useDispatch<AppDispatch>()
    const handleClose=()=>dispatch(hideDisignDetail())
    const [emojiid,setemoji]=useState(0)
    const itemId=useSelector<RootState,string>(state=>state.modalSlice.exhibitId)
    const item=useSelector<RootState,Exhibit>(state=>state.exhibitSlice.items.find(v=>v.id===itemId)!)
    const all_comments=useSelector<RootState,Record<string, Action[]> >(state=>state.actionSlice.items)
    const comments=useMemo(()=>all_comments[itemId] || [],[itemId,all_comments])
    const favor_list=useSelector<RootState,string[]>(state=>state.userSlice.favor)
    const uid=useSelector<RootState,string>(state=>state.userSlice.uid)
    const [favored,setf]=useState(false)
    useEffect(()=>{
        dispatch(updateActions(itemId))
        visitExhibit({
            eid: itemId
        })
        setf(favor_list.indexOf(itemId)>=0)
    },[itemId])
    const [commentInput,setCommentInput]=useState('')
    const handleChange:Required<TextAreaProps>['onChange']=(event)=>{
        setCommentInput(event.target.value || '')
    }
    const handleSubmit:Required<TextAreaProps>['onPressEnter']=(event)=>{
        submitComment({
            eid: itemId,
            comment_text: commentInput,
            emoji: emojiid || null
        }).then(()=>{
            dispatch(updateActions(itemId))
        })
        setCommentInput('')
        setemoji(0)
        event.preventDefault()
    }

    const [showmore,setshowmore]=useState(false)
    const handleShowMore=()=>{
        if(comments.length)
            setshowmore(true)
    }
    const handleCloseShowMore=()=>{
        setshowmore(false)
    }
    const handleFavorite=()=>{
        setf(true)
        likeExhibit({
            eid: itemId
        }).then(()=>dispatch(UpdateFavorite(uid)))
    }
    const navigate = useNavigate();
    const handleCopy=()=>{
        copy('http://next.zju.edu.cn/gallery_ui/show/'+item.pics[0].slice(0,-6))
        shareExhibit({eid:itemId})
        message.success('链接已复制到粘贴板')
    }
    const [current,setcurrent]=useState(1)
    return (
    <div className='modal-design-detail'>
        <div className='left-col'>
            {showmore && <AllComments onClose={handleCloseShowMore} items={comments}/>}
            <div className={'comment-danmaku '+(showmore && 'blurred')}>
                {comments.length==0 && <span id='no-comment'>{noComment}</span>}
                {comments.slice(0,3).map(item=>(<div key={'comment'+item.id}><span className='main-text'>{item.emoji && emojilist[item.emoji-1]}{item.comment_text}</span></div>))}
            </div>
            <a className={'show-more text '+(showmore && 'blurred')} onClick={handleShowMore}>
                {showMoreComment}
                <DoubleRightOutlined />
            </a>
            <img src={'exhibits/'+item?.avatar} className={('poster-avatar '+(showmore?'blurred':''))}/>
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
                <Tooltip title={(<div>
                    {
                        emojilist.map((emoji,index)=>
                            <span key={'emoji'+index} onClick={()=>setemoji(index+1)}>{emoji}</span>
                        )
                    }
                </div>)} trigger='hover' overlayClassName='emoji-bar'>
                    <button type='button'>
                        {
                            emojiid==0?
                                <SmileOutlined/>:
                                emojilist[emojiid-1]
                        }
                    </button>
                </Tooltip>
            </div>
        </div>
        <div className="right-col">
            {current<=item?.pics.length?
                <img src={'exhibits/'+item?.pics[current-1]} style={{
                    height: 504,
                    width: 896
                }}/>
            :
                <iframe src={"//player.bilibili.com/player.html?bvid="+item?.videos[current-item?.pics.length-1].match(/video\/([a-zA-Z0-9]*)[\?$]/)![1]}
                    scrolling="no"
                    //border="0"
                    frameBorder="no"
                    //frameSpacing="0"
                    allowFullScreen={true}
                />
            }
            <div className="nav-and-action">
                <div/>
                <Pagination total={item?.pics.length+item?.videos.length} pageSize={1} current={current} onChange={page=>setcurrent(page)}/>
                <div className="actions">
                    <button type='button' onClick={handleFavorite}>
                        {
                            favored?<StarFilled/>:<StarOutlined/>
                        }
                    </button>
                    <Tooltip title={
                        (<div className='flex' style={{
                            lineHeight: '100%',
                            alignItems: 'center',
                            backgroundColor: 'white'
                        }}>
                            <span className='flex-shrink-0 text-black'>作品链接</span>
                            <Input
                                disabled
                                value={'http://next.zju.edu.cn/gallery_ui/show/'+item.pics[0].slice(0,-6)}
                                suffix={<Button type='primary' onClick={handleCopy}>复制</Button>}
                                size={'small'}
                            />
                        </div>)}
                        overlayInnerStyle={{
                            backgroundColor: 'white'
                        }}
                    >
                        <button type='button'>
                            <ShareAltOutlined/>
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
        <button type='button' className='back-button' onClick={handleClose}>
            <LeftOutlined />  
        </button>
    </div>)
}
export default DesignDetail