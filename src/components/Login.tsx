import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Checkbox, Input, Tooltip } from 'antd'
import { MouseEventHandler, useState } from 'react'
import { useDispatch } from 'react-redux'
import bg from '../assets/card-bg.png'
import { updateExhibits } from '../store/exhibitSlice'
import { AppDispatch } from '../store/store'
import { Signin } from '../store/userSlice'
import { agreement, guestLogin,loginNamePlaceholder,loginPasswordPlaceholder,loginTypePrompt1,loginTypePrompt2,loginWelcome,startVisit,userLogin } from '../text'
import { WelcomeProps } from './Welcome'
function Prompt(){
    return (<div>
        <p>{loginTypePrompt1}</p>
        <p>{loginTypePrompt2}</p>
    </div>)
}
function UserLogin(){
    return (<div>
        <Avatar size={50} icon={<UserOutlined />} />
        <h1>{loginWelcome}</h1>
        <Input placeholder={loginNamePlaceholder} />
        <Input.Password placeholder={loginPasswordPlaceholder} />
    </div>)
}
function GuestLogin(){
    return (<div>
        <Avatar size={50} icon={<UserOutlined />} />
        <h1>{loginWelcome}</h1>
        <Input placeholder={loginNamePlaceholder} />
    </div>)
}
function Login(props:WelcomeProps){
    const {onExit}=props
    const [isUser,setisUser]=useState(false)
    const selectGuest=()=>setisUser(false)
    const selectUser=()=>setisUser(true)
    const dispatch=useDispatch<AppDispatch>()
    const handleSubmit=async()=>{
        await dispatch(Signin({
            username: 'test1',
            password: 'test1'
        }))
        await dispatch(updateExhibits())
        onExit()
    }
    return (<div id='login-page'>
        <div id='login-select'>
            <span className={isUser?'unselected':'selected'} onClick={selectGuest}>{guestLogin}</span>
            <span>|</span>
            <span className={isUser?'selected':'unselected'} onClick={selectUser}>{userLogin}</span>
            <Tooltip title={Prompt}>
                <QuestionCircleOutlined/>
            </Tooltip>
        </div>
        <div id='login-body'>
            <img src={bg}/>
            {isUser?<UserLogin/>:<GuestLogin/>}
        </div>
        <div id='check'>
            <Checkbox/>
            <span>{agreement}</span>
        </div>
        <h1 id='login-submit' onClick={handleSubmit}>{startVisit}</h1>
    </div>)
}
export default Login