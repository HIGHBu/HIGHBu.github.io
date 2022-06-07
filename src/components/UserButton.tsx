import {
    UserOutlined
} from '@ant-design/icons'
import { Avatar, Button, Form, FormProps, Input, message, Modal, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiModifyProfile, userProfile } from '../api/user'
import { AppDispatch, RootState } from '../store/store'
import { unsetGuest, UpdateProfile } from '../store/userSlice'
import { changeNameAvatar, emptyNickname, emptyPassword, emptyUsername, generateTicket, nicknameLabel, nicknamePending, nicknameSubmit, nicknameSuccess, registerError, registerPassword, registerPending, registerSubmit, registerSuccess, registerTitle, registerUsername, regularUsername, unknownError, updateAccount } from '../text'
function UserToolTip(){
    const profile=useSelector<RootState,userProfile>((state)=>state.userSlice.profile)
    const uid=useSelector<RootState,string>((state)=>state.userSlice.uid)
    const isGuest=useSelector<RootState,boolean>((state)=>state.userSlice.isGuest)
    const [update,setupdate]=useState(false)
    const [nickname,setnickname]=useState(false)
    const dispatch=useDispatch<AppDispatch>()
    const showUpdate=()=>{
        setupdate(true)
    }
    const hideUpdate=()=>{
        setupdate(false)
    }
    const showNickname=()=>{
        setnickname(true)
    }
    const hideNickname=()=>{
        setnickname(false)
    }
    const handleSubmit=async({username,password}:{username:string,password:string})=>{
        const hideSubmit=message.loading(registerPending)
        const res=await apiModifyProfile(uid,{
            ...profile,
            username,
            password
        })
        hideSubmit()
        if(res==='ok'){
            message.success(registerSuccess)
            dispatch(unsetGuest())
            hideUpdate()
        }
        else
            message.error(registerError)
    }
    const handleNicknameSubmit=async({nickname}:{nickname:string})=>{
        const hideSubmit=message.loading(nicknamePending)
        const res=await apiModifyProfile(uid,{
            ...profile,
            nickname
        })
        hideSubmit()
        if(res==='ok'){
            message.success(nicknameSuccess)
            dispatch(UpdateProfile(uid))
            hideNickname()
        }
        else
            message.error(unknownError)

    }
    return (
        <div className="user-tooltip-content">
            <h2>{profile.nickname}</h2>
                <div>
                    {isGuest?
                        <a className="main-text" onClick={showUpdate} >{updateAccount}</a>
                        :
                        <a className="main-text" onClick={showNickname}>{changeNameAvatar}</a>
                    }
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
                            rules={[{
                                required: true, message: emptyUsername
                            },{
                                //type: 'regexp',
                                pattern: /^[a-zA-Z0-9_]*$/,
                                message: regularUsername
                            }]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label={registerPassword}
                            name="password"
                            rules={[{ required: true, message: emptyPassword }]}
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
                <Modal
                    visible={nickname}
                    title={changeNameAvatar}
                    onCancel={hideNickname}
                    footer={null}
                >
                    <Form
                        labelCol={{span: 5,offset: 4}}
                        wrapperCol={{span:11}}
                        onFinish={handleNicknameSubmit}
                    >
                        <Form.Item
                            label={nicknameLabel}
                            name="nickname"
                            rules={[{ required: true, message: emptyNickname }]}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                {nicknameSubmit}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
        </div>
    )
}
function UserButton(){
    const avatar=useSelector<RootState,string>(state=>state.userSlice.profile.avatar)
    const avatars=import.meta.glob('../assets/avatar/*.png')
    const [asrc,setasrc]=useState("")
    useEffect(()=>{
        avatars[`../assets/avatar/${avatar}.png`]().then(res=>{
            setasrc(res.default)
        })
    },[])
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
                <Avatar size={50} icon={asrc===""?<UserOutlined />:<img src={asrc}></img>} />
            </button>
        </Tooltip>
    )
}
export default UserButton