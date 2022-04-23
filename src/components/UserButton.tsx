import {
    UserOutlined
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { Login } from '../store/userSlice'
import { changeNameAvatar, generateTicket } from '../text'
function UserToolTip(){
    const username=useSelector<RootState,string>((state)=>state.userSlice.username)
    return (
        <div className="user-tooltip-content">
            <p className="subtitle">
                {username}
            </p>
            <div>
                <a className="text">{changeNameAvatar}</a>
                <a className="text">{generateTicket}</a>
            </div>
        </div>
    )
}
function UserButton(){
    const dispatch=useDispatch<AppDispatch>()
    const handleClick=()=>{
        dispatch(Login())
    }
    return (
        <Tooltip
            placement="bottomLeft"
            title={UserToolTip}
            arrowPointAtCenter
            trigger='hover'
            //visible={true}
            overlayClassName='user-tooltip'
        >
            <button type="button" className='user-button' onClick={handleClick}>
                <UserOutlined/>
            </button>
        </Tooltip>
    )
}
export default UserButton