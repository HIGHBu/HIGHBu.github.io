import { MouseEventHandler, useState } from 'react'
import ball from '../assets/ball.png'
import Login from '../components/Login'
import { welcomeText } from '../text'
export interface WelcomeProps {
    onExit: MouseEventHandler<HTMLDivElement>
}
function Welcome(props:WelcomeProps){
    const {onExit}=props
    const [isLoginPage,setisLoginPage]=useState(false)
    return isLoginPage?(<Login onExit={onExit}/>):(<div id='welcome-page' onClick={()=>{setisLoginPage(true)}}>
        <img src={ball}/>
        <h1>{welcomeText}</h1>
    </div>)
}
export default Welcome