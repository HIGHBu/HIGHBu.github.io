import { MouseEventHandler } from 'react'
import ball from '../assets/ball.png'
import { welcomeText } from '../text'
export interface WelcomeProps {
    onClick: MouseEventHandler<HTMLDivElement>
}
function Welcome(props:WelcomeProps){
    const {onClick}=props
    return (<div id='welcome-page' onClick={onClick}>
        <img src={ball}/>
        <h1>{welcomeText}</h1>
    </div>)
}
export default Welcome