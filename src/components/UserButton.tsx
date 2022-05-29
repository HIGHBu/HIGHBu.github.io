import {
    UserOutlined
} from '@ant-design/icons'
import { Button, Form, FormProps, Input, message, Modal, Tooltip } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiModifyProfile, userProfile } from '../api/user'
import { AppDispatch, RootState } from '../store/store'
import { unsetGuest } from '../store/userSlice'
import { changeNameAvatar, generateTicket, registerError, registerPassword, registerPending, registerSubmit, registerSuccess, registerTitle, registerUsername, updateAccount } from '../text'
function UserToolTip(){
    const profile=useSelector<RootState,userProfile>((state)=>state.userSlice.profile)
    const uid=useSelector<RootState,string>((state)=>state.userSlice.uid)
    const isGuest=useSelector<RootState,boolean>((state)=>state.userSlice.isGuest)
    const [update,setupdate]=useState(false)
    const dispatch=useDispatch<AppDispatch>()
    const showUpdate=()=>{
        setupdate(true)
    }
    const hideUpdate=()=>{
        setupdate(false)
    }
    const handleSubmit=async({username,password}:{username:string,password:string})=>{
        message.info(registerPending)
        const res=await apiModifyProfile(uid,{
            ...profile,
            username,
            password
        })
        if(res==='ok'){
            message.success(registerSuccess)
            dispatch(unsetGuest())
            hideUpdate()
        }
        else
            message.error(registerError)
    }
    return (
        <div className="user-tooltip-content">
            <h2>{profile.nickname}</h2>
                <div>
                    {isGuest?<a className="main-text" onClick={showUpdate} >{updateAccount}</a>:<a className="main-text">{changeNameAvatar}</a>}
                    <a className="main-text">{generateTicket}</a>
                </div>
                <Modal
                    visible={update}
                    title={registerTitle}
                    onCancel={hideUpdate}
                    footer={null}
                >
                    <Form
                        labelCol={{span: 5,offset: 4}}
                        wrapperCol={{span:11}}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label={registerUsername}
                            name="username"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label={registerPassword}
                            name="password"
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                {registerSubmit}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
        </div>
    )
}
function UserButton(){
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