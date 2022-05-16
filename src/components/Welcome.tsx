import { MouseEventHandler } from 'react'
import ball from '../assets/ball.png'
import { welcomeText } from '../text'
export interface WelcomeProps {
    onExit: MouseEventHandler<HTMLDivElement>
}
function Welcome(props:WelcomeProps){
    const {onExit}=props
    return (<div id='welcome-page' onClick={onExit}>
        <img src={ball}/>
        <h1>{welcomeText}</h1>
    </div>)
}
export default Welcome