import { MouseEventHandler, useState } from 'react'
import ball from '../assets/ball.png'
import Login from '../components/Login'
import { welcomeText } from '../text'
export interface WelcomeProps {
    onExit: ()=>void
}
function Welcome(props:WelcomeProps){
    const {onExit}=props
    const [isLoginPage,setisLoginPage]=useState(false)
    return isLoginPage?(<Login onExit={onExit}/>):(<div id='welcome-page'>
        <img src={ball}/>
        <h1 id='welcome-text' onClick={()=>{setisLoginPage(true)}}>{welcomeText}</h1>
    </div>)
}
export default Welcome