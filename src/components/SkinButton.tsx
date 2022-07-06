import {
    SkinOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { showSkin } from '../store/modalSlice'
function SkinButton(){
    const dispatch=useDispatch<AppDispatch>()
    const handleClick=()=>{
        dispatch(showSkin())
        
    }
    return (
        <button type="button" className="skin-button" onClick={handleClick}>
            <SkinOutlined/>
        </button>
    )
}
export default SkinButton