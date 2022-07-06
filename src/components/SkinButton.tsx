import {
    SkinOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { showSkin } from '../store/modalSlice'
import { UpdateFavorite, UpdateProfile } from '../store/userSlice'
function SkinButton(){
    const dispatch=useDispatch<AppDispatch>()
    const uid=useSelector<RootState,string>((state)=>state.userSlice.uid)
    const handleClick=async()=>{
        await dispatch(UpdateProfile(uid))
        dispatch(showSkin())
    }
    return (
        <button type="button" className="skin-button" onClick={handleClick}>
            <SkinOutlined/>
        </button>
    )
}
export default SkinButton