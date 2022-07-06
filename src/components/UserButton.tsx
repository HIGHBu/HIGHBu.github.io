import {
    CloseOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Avatar, Button, Form, FormProps, Input, message, Modal, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiModifyProfile, userProfile } from '../api/user'
import { AppDispatch, RootState } from '../store/store'
import { unsetGuest, UpdateFavorite, UpdateProfile } from '../store/userSlice'
import { changeNameAvatar, emptyNickname, emptyPassword, emptyUsername, generateTicket, nicknameLabel, nicknamePending, nicknameSubmit, nicknameSuccess, registerError, registerPassword, registerPending, registerSubmit, registerSuccess, registerTitle, registerUsername, regularUsername, unknownError, updateAccount } from '../glob'
function Ticket(){
    const nickname=useSelector<RootState,string>(state=>state.userSlice.profile.nickname)
    const viewnum=useSelector<RootState,number>(state=>state.userSlice.visit_count)
    const likenum=useSelector<RootState,number>(state=>state.userSlice.like_count)
    return (<div style={{
        display:'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection:'column',
        height: 450,
        marginRight: 30
    }}>
        <div>
            {nickname}
        </div>
        <div>
            {`观看了${viewnum}个精彩展品`}
        </div>
        <div>
            {`收藏了${likenum}个趣味设计`}
        </div>
    </div>)
}
function UserToolTip(){
    const profile=useSelector<RootState,userProfile>((state)=>state.userSlice.profile)
    const uid=useSelector<RootState,string>((state)=>state.userSlice.uid)
    const isGuest=useSelector<RootState,boolean>((state)=>state.userSlice.isGuest)
    const [update,setupdate]=useState(false)
    const [nickname,setnickname]=useState(false)
    const [ticket,setticket]=useState(false)
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
    const showTicket=async ()=>{
        await dispatch(UpdateFavorite(uid))
        await dispatch(UpdateProfile(uid))
        setticket(true)
    }
    const hideTicket=()=>{
        setticket(false)
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
                    <a className="main-text" onClick={showTicket}>{generateTicket}</a>
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
                <Modal
                    visible={ticket}
                    footer={null}
                    onCancel={hideTicket}
                    width={700}
                    bodyStyle={{
                        backgroundImage: 'url("ticket.png")',
                        backgroundSize: 'cover'
                    }}
                    //</div>modalRender={()=>(
                    //    <Ticket onClose={hideTicket}/>
                    //)}
                >
                    <Ticket/>
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