import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Checkbox, Input, message, Tooltip } from 'antd'
import { MouseEventHandler, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiModifyProfile, apiSignup, resSignin } from '../api/user'
import bg from '../assets/card-bg.png'
import { updateExhibits } from '../store/exhibitSlice'
import { AppDispatch } from '../store/store'
import { setGuest, Signin, UpdateProfile } from '../store/userSlice'
import { agreement, agreeWarning, conflictError, emptyPassword, emptyUsername, guestLogin,invalidError,loginNamePlaceholder,loginPasswordPlaceholder,loginTypePrompt1,loginTypePrompt2,loginWelcome,notFoundError,pendingExhibits,pendingInit,pendingProfile,pendingSignin,pendingSignUp,startVisit,unknownError,userLogin } from '../text'
import { WelcomeProps } from './Welcome'
function Prompt(){
    return (<div>
        <p>{loginTypePrompt1}</p>
        <p>{loginTypePrompt2}</p>
    </div>)
}
function UserLogin(props: {username:[string,React.ChangeEventHandler<HTMLInputElement>],password:[string,React.ChangeEventHandler<HTMLInputElement>]}){
    return (<div>
        {/* <Avatar size={50} icon={<UserOutlined />} /> */}
        <h1>{loginWelcome}</h1>
        <Input placeholder={loginNamePlaceholder} value={props.username[0]} onChange={props.username[1]}/>
        <Input.Password placeholder={loginPasswordPlaceholder} value={props.password[0]} onChange={props.password[1]}/>
    </div>)
}
function GuestLogin(props: {username: [string,React.ChangeEventHandler<HTMLInputElement>],avatar: number}){
    const avatars=import.meta.glob('../assets/avatar/*.png')
    console.log(avatars)
    const [asrc,setasrc]=useState("")
    useEffect(()=>{
        avatars[`../assets/avatar/${props.avatar}.png`]().then(res=>{
            setasrc(res.default)
        })
    },[])
    return (<div>
        <Avatar size={50} icon={asrc===""?<UserOutlined />:<img src={asrc}></img>} />
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
    const [avatar,setavatar]=useState(1)
    useEffect(()=>{
        setavatar(Math.floor(Math.random()*5)+1);
    },[])
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
        const generatedPassword=username
        if(!isUser){
            message.info(pendingSignUp)
            const result=await apiSignup({
                username: username,
                password: generatedPassword
            })
            if(result==='unknown'){
                message.error(unknownError)
                return
            }
            if(result==='conflict'){
                message.error(conflictError)
                return
            }
            await dispatch(setGuest())
        }
        message.info(pendingSignin)
        const result=(await dispatch(Signin({
            username: username,
            password: isUser?password:generatedPassword
        }))).payload
        if(result==='notfound'){
            message.error(notFoundError)
            return
        }
        if(result==='invalid'){
            message.error(invalidError)
            return
        }
        if(result==='unknown'){
            message.error(unknownError)
            return
        }
        if(!isUser){
            message.info(pendingInit)
            await apiModifyProfile((result as resSignin).id,{
                username: username,
                password: generatedPassword,
                nickname: username,
                avatar: avatar.toString(),
                clothes: []
            })
        }
        message.info(pendingProfile)
        await dispatch(UpdateProfile((result as resSignin).id))
        message.info(pendingExhibits)
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
                    avatar={avatar}
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