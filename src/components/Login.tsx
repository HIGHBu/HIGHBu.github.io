import { QuestionCircleOutlined } from '@ant-design/icons'
import { Checkbox, Tooltip } from 'antd'
import { MouseEventHandler, useState } from 'react'
import bg from '../assets/card-bg.png'
import { agreement, guestLogin,loginTypePrompt1,loginTypePrompt2,startVisit,userLogin } from '../text'
import { WelcomeProps } from './Welcome'
function Prompt(){
    return (<div>
        <p>{loginTypePrompt1}</p>
        <p>{loginTypePrompt2}</p>
    </div>)
}
function Login(props:WelcomeProps){
    const {onExit}=props
    const [isUser,setisUser]=useState(false)
    const selectGuest=()=>setisUser(false)
    const selectUser=()=>setisUser(true)
    return (<div id='login-page'>
        <div id='login-select'>
            <span className={isUser?'unselected':'selected'} onClick={selectGuest}>{guestLogin}</span>
            <span>|</span>
            <span className={isUser?'selected':'unselected'} onClick={selectUser}>{userLogin}</span>
            <Tooltip title={Prompt}>
                <QuestionCircleOutlined/>
            </Tooltip>
        </div>
        <img src={bg}/>
        <div id='check'>
            <Checkbox/>
            <span>{agreement}</span>
        </div>
        <h1>{startVisit}</h1>
    </div>)
}
export default Login