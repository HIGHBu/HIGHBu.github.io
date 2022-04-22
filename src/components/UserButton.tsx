import {
    UserOutlined
} from '@ant-design/icons'
import { Tooltip } from 'antd'
function UserButton(){
    return (
        <Tooltip
            placement="bottomLeft"
            title={'wow'}
            arrowPointAtCenter
            //trigger='hover'
            visible={true}
            overlayClassName='user-tooltip'
        >
            <button type="button" className='user-button'>
                <UserOutlined/>
            </button>
        </Tooltip>
    )
}
export default UserButton