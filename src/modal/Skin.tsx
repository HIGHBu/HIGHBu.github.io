import { CloseOutlined } from '@ant-design/icons'
import demoPic from '../assets/APP.png'

function Skin(){
    return (
        <div className='skin-modal'>
            <img src={demoPic}/>
            <div className='panel'>
                <div className='panel-head'>
                    <span className='title'>个性装扮</span>
                    <CloseOutlined/>
                </div>
            </div>
        </div>
    )
}
export default Skin