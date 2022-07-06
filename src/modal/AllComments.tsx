import { CloseOutlined, DislikeOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useEffect, useState } from "react";
import { Action } from "../api/action";
import { apiFetchProfile } from "../api/user";
import { allComments } from "../glob";
import { emojilist } from "./DesignDetail";
function Comment(props: {item: Action}){
    const {item}=props
    const [name,setn]=useState('')
    const [avatar,seta]=useState('')
    const avatars=import.meta.glob('../assets/avatar/*.png')
    useEffect(()=>{
        apiFetchProfile(item.uid).then(res=>{
            setn(res.username)
            return res.avatar
        }).then(avatar=>avatars[`../assets/avatar/${avatar}.png`]()).then(res=>{
            seta(res.default)
        })
    },[])
    return (<div className='comment-item'>
        <Avatar size={32} icon={avatar===""?<UserOutlined />:<img src={avatar}></img>} className='comment-avatar'/>
        <div className='comment-body'>
            <div className='comment-header'>
                <span className='comment-user'>
                    {name}
                </span>
                <span className='comment-date'>
                    {new Date(item.created_at).toLocaleString().slice(5,14)}
                </span>
            </div>
            <p className='comment-text'>
                {item.emoji && emojilist[item.emoji-1]}{item.comment_text}
            </p>
            <div className='comment-footer'>
                <LikeOutlined className='like-button'/>
                <span className='comment-likes'>
                    {item.comment_likes}
                </span>
                <DislikeOutlined className='dislike-button'/>
            </div>
        </div>
    </div>)
}
function AllComments(props:{items:Action[],onClose:React.MouseEventHandler<HTMLSpanElement>}){
    const {items,onClose}=props
    return (<div id="all-comments">
        <div id="header">
            <h1>{allComments}</h1>
            <CloseOutlined onClick={onClose}/>
        </div>
        <div id="content">
            {items.map(item=><Comment key={'comm'+item.id} item={item}/>)}
        </div>
    </div>)
}
export default AllComments