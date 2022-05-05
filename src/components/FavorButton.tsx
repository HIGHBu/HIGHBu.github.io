import {
    BookOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { showFavor } from '../store/modalSlice'
function FavorButton(){
    const dispatch=useDispatch<AppDispatch>()
    const handleClick=()=>dispatch(showFavor())
    return (
        <button type="button" className='favor-button' onClick={handleClick}>
            <BookOutlined/>
        </button>
    )
}
export default FavorButton