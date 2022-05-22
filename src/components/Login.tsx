import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Checkbox, Input, message, Tooltip } from 'antd'
import { MouseEventHandler, useState } from 'react'
import { useDispatch } from 'react-redux'
import bg from '../assets/card-bg.png'
import { updateExhibits } from '../store/exhibitSlice'
import { AppDispatch } from '../store/store'
import { Signin, Signup } from '../store/userSlice'
import { agreement, agreeWarning, emptyPassword, emptyUsername, guestLogin,loginNamePlaceholder,loginPasswordPlaceholder,loginTypePrompt1,loginTypePrompt2,loginWelcome,startVisit,userLogin } from '../text'
import { WelcomeProps } from './Welcome'
function Prompt(){
    return (<div>
        <p>{loginTypePrompt1}</p>
        <p>{loginTypePrompt2}</p>
    </div>)
}
function UserLogin(props: {username:[string,React.ChangeEventHandler<HTMLInputElement>],password:[string,React.ChangeEventHandler<HTMLInputElement>]}){
    return (<div>
        <Avatar size={50} icon={<UserOutlined />} />
        <h1>{loginWelcome}</h1>
        <Input placeholder={loginNamePlaceholder} value={props.username[0]} onChange={props.username[1]}/>
        <Input.Password placeholder={loginPasswordPlaceholder} value={props.password[0]} onChange={props.password[1]}/>
    </div>)
}
function GuestLogin(props: {username: [string,React.ChangeEventHandler<HTMLInputElement>]}){
    return (<div>
        <Avatar size={50} icon={<UserOutlined />} />
        <h1>{loginWelcome}</h1>
        <Input placeholder={loginNamePlaceholder} value={props.username[0]} onChange={props.username[1]}/>
    </div>)
}
function Login(props:WelcomeProps){
    const {onExit}=props
    const [isUser,setisUser]=useState(false)
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [checked,setchecked]=useState(false)
    const selectGuest=()=>{
        setisUser(false)
        setpassword('')
    }
    const selectUser=()=>setisUser(true)
    const dispatch=useDispatch<AppDispatch>()
    const handleSubmit=async()=>{
        if(!checked){
            message.error(agreeWarning)
            return;
        }
        if(username===''){
            message.error(emptyUsername)
            return;
        }
        if(isUser && password===''){
            message.error(emptyPassword)
            return;
        }
        const generatedPassword=crypto.randomUUID()
        await dispatch(Signup({
            username: username,
            password: isUser?password:generatedPassword
        }))
        await dispatch(Signin({
            username: username,
            password: isUser?password:generatedPassword
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
            <img src={bg} width={920} height={450}/>
            {isUser?
                <UserLogin
                    username={[username,(e)=>setusername(e.target.value)]}
                    password={[password,(e)=>setpassword(e.target.value)]}
                />:
                <GuestLogin
                    username={[username,(e)=>setusername(e.target.value)]}
                />}
        </div>
        <div id='check'>
            <Checkbox checked={checked} onChange={e=>setchecked(e.target.checked)}/>
            <span>{agreement}</span>
        </div>
        <h1 id='login-submit' onClick={handleSubmit}>{startVisit}</h1>
    </div>)
}
export default Login