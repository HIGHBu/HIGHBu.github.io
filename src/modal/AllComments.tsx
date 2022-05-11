import { CloseOutlined } from "@ant-design/icons";
import { Action } from "../api/action";
import { allComments } from "../text";
function Comment(props: {item: Action}){
    const {item}=props
    return (<div>
        {item.comment_text}
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