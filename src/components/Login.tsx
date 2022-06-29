import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Checkbox, Input, message, Modal, Tooltip } from 'antd'
import { MouseEventHandler, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { apiModifyProfile, apiSignup, resSignin } from '../api/user'
import bg from '../assets/card-bg.png'
import { updateExhibits } from '../store/exhibitSlice'
import { AppDispatch } from '../store/store'
import { setGuest, Signin, UpdateFavorite, UpdateProfile } from '../store/userSlice'
import { 
    agreement,
    agreeWarning,
    conflictError,
    emptyPassword,
    emptyUsername,
    guestLogin,
    guestNamePlaceholder,
    invalidError,
    loginNamePlaceholder,
    loginPasswordPlaceholder,
    loginTypePrompt1,
    loginTypePrompt2,
    loginWelcome,
    notFoundError,
    pendingExhibits,
    pendingFavor,
    pendingInit,
    pendingLoading,
    pendingProfile,
    pendingSignin,
    pendingSignUp,
    startVisit,
    unknownError,
    userLogin 
} from '../glob'
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
    const [asrc,setasrc]=useState("")
    useEffect(()=>{
        avatars[`../assets/avatar/${props.avatar}.png`]().then(res=>{
            setasrc(res.default)
        })
    },[])
    return (<div>
        <Avatar size={50} icon={asrc===""?<UserOutlined />:<img src={asrc}></img>} />
        <h1>{loginWelcome}</h1>
        <Input maxLength={12} showCount placeholder={guestNamePlaceholder} value={props.username[0]} onChange={props.username[1]}/>
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
    const [page1,setpage1]=useState(false)
    const [page2,setpage2]=useState(false)
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
        const generatedUsername=isUser?username:(username+new Date().toLocaleString())
        const generatedPassword=isUser?password:username
        if(!isUser){
            const hideSignup=message.loading(pendingSignUp,0)
            const result=await apiSignup({
                username: generatedUsername,
                password: generatedPassword
            })
            hideSignup()
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
        const hideSignin=message.loading(pendingSignin,0)
        const result=(await dispatch(Signin({
            username: generatedUsername,
            password: generatedPassword
        }))).payload
        hideSignin()
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
            const hideInit=message.loading(pendingInit,0)
            const initResult=await apiModifyProfile((result as resSignin).id,{
                username: generatedUsername,
                password: generatedPassword,
                nickname: username,
                avatar: avatar.toString(),
                clothes: [0,0]
            })
            hideInit()
            if(initResult==='unknown'){
                message.error(unknownError)
                return
            }
        }
        const hideProfile=message.loading(pendingProfile,0)
        await dispatch(UpdateProfile((result as resSignin).id))
        hideProfile()
        const hideExhibits=message.loading(pendingExhibits,0)
        await dispatch(updateExhibits())
        hideExhibits()
        const hideFavor=message.loading(pendingFavor,0)
        await dispatch(UpdateFavorite((result as resSignin).id))
        hideFavor()
        if(isUser)
            onExit()
        else
            setpage1(true)
    }
    return (<div id='login-page'>
        <Modal title={"新手引导"} width={1000} visible={page1} footer={null} onCancel={()=>{setpage1(false);setpage2(true)}}>
            <img src={'tutorial/Move_1.png'}></img>
        </Modal>
        <Modal title={"新手引导"} width={1000} visible={page2} footer={null} onCancel={()=>{setpage2(false);onExit()}}>
            <img src={'tutorial/Button_2.png'}></img>
        </Modal>
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
            <Checkbox checked={checked} onChange={e=>setchecked(e.target.checked)}>
                <span>{agreement}</span>
            </Checkbox>
        </div>
        <h1 id='login-submit' className='text-4xl' onClick={handleSubmit}>{startVisit}</h1>
    </div>)
}
export default Login