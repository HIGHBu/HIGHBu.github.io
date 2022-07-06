import {
    MailOutlined,
    MenuFoldOutlined, MenuUnfoldOutlined
} from '@ant-design/icons'
import { Menu, MenuProps } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { showDisignDetail } from '../store/modalSlice';
function MenuButton(){
    const [collapsed, setCollapsed] = React.useState(false);
    const dispatch=useDispatch<AppDispatch>()
    const handleSelect:Required<MenuProps>['onSelect']=(info)=>{
        dispatch(showDisignDetail(info.key))
    }
    type ItemsType=Required<MenuProps>['items']
    const menuItems:ItemsType = useSelector<RootState,ItemsType>((state=>state.exhibitSlice.category));
    return (
        <div className='menu-group'>
            <button type="button" className="menu-button" onClick={()=>setCollapsed(!collapsed)}>
                {collapsed?<MenuUnfoldOutlined/>:<MenuFoldOutlined/>}
            </button>
            {collapsed && <div>
                <Menu selectedKeys={[]} items={menuItems} mode='inline' className='menu better-scroll' onSelect={handleSelect} style={{maxHeight: 600,overflowX:'hidden',overflowY:'scroll'}}/>
            </div>}
        </div>
    )
}
export default MenuButton