import { MouseEventHandler } from 'react'
import bg from '../assets/card-bg.png'
import { guestLogin,userLogin } from '../text'
function Welcome(){
    return (<div id='login-page'>
        <div id='login-select'>
            <h2>{guestLogin}</h2>
            <h2>|</h2>
            <h2>{userLogin}</h2>
        </div>
        <img src={bg}/>
    </div>)
}
export default Welcome