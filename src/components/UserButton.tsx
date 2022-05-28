import {
    UserOutlined
} from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { Signin } from '../store/userSlice'
import { changeNameAvatar, generateTicket, updateAccount } from '../text'
function UserToolTip(){
    const username=useSelector<RootState,string>((state)=>state.userSlice.username)
    const isGuest=useSelector<RootState,boolean>((state)=>state.userSlice.isGuest)
    const [update,setupdate]=useState(false)
    const showUpdate=()=>{
        setupdate(true)
    }
    const hideUpdate=()=>{
        setupdate(false)
    }
    const handleSubmit=()=>{

    }
    return (
        <div className="user-tooltip-content">
            <h2>{username}</h2>
                <div>
                    {isGuest?<a className="main-text" onClick={showUpdate} >{updateAccount}</a>:<a className="main-text">{changeNameAvatar}</a>}
                    <a className="main-text">{generateTicket}</a>
                </div>
                <Modal
                    visible={update}
                    title="Title"
                    onOk={handleSubmit}
                    onCancel={hideUpdate}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
        </div>
    )
}
function UserButton(){
    const dispatch=useDispatch<AppDispatch>()
    return (
        <Tooltip
            placement="bottomLeft"
            title={UserToolTip}
            arrowPointAtCenter
            trigger='hover'
            //visible={true}
            overlayClassName='user-tooltip'
        >
            <button type="button" className='user-button'>
                <UserOutlined/>
            </button>
        </Tooltip>
    )
}
export default UserButton