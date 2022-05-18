import { CloseOutlined, DislikeOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Action } from "../api/action";
import { allComments } from "../text";
function Comment(props: {item: Action}){
    const {item}=props
    return (<div className='comment-item'>
        <Avatar size={32} icon={<UserOutlined />} className='comment-avatar'/>
        <div className='comment-body'>
            <div className='comment-header'>
                <span className='comment-user'>
                    {item.uid}
                </span>
                <span className='comment-date'>
                    {new Date(item.created_at).toLocaleString().slice(5,14)}
                </span>
            </div>
            <p className='comment-text'>
                {item.comment_text}
            </p>
            <div className='comment-footer'>
                <LikeOutlined/>
                <span className='comment-likes'>
                    {item.comment_likes}
                </span>
                <DislikeOutlined/>
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
            {items.map(item=><Comment key={item.id} item={item}/>)}
        </div>
    </div>)
}
export default AllComments