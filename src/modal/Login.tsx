import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { updateExhibits } from "../store/exhibitSlice"
import { hideLogin } from "../store/modalSlice"
import { Signin } from "../store/userSlice"

function Login(){
    const dispatch=useDispatch<AppDispatch>()
    const handleLogin=async()=>{
        const auth={username:'test1',password:'test1'}
        await dispatch(Signin(auth))
        await dispatch(updateExhibits())
        dispatch(hideLogin())
    }
    return (<div>
        <button onClick={handleLogin} type='button'>
            login
        </button>
    </div>)
}
export default Login