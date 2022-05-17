import { MouseEventHandler, useState } from 'react'
import bg from '../assets/card-bg.png'
import { guestLogin,userLogin } from '../text'
import { WelcomeProps } from './Welcome'
function Login(props:WelcomeProps){
    const {onExit}=props
    const [isUser,setisUser]=useState(false)
    const selectGuest=()=>setisUser(false)
    const selectUser=()=>setisUser(true)
    return (<div id='login-page'>
        <div id='login-select'>
            <span className={isUser?undefined:'selected'} onClick={selectGuest}>{guestLogin}</span>
            <span>|</span>
            <span className={isUser?'selected':undefined} onClick={selectUser}>{userLogin}</span>
        </div>
        <img src={bg}/>
    </div>)
}
export default Login