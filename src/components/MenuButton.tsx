import {
    MailOutlined,
    MenuFoldOutlined, MenuUnfoldOutlined
} from '@ant-design/icons'
import { Menu, MenuProps } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { showDisignDetail } from '../store/modalSlice';
function MenuButton(){
    const [collapsed, setCollapsed] = React.useState(false);
    const dispatch=useDispatch<AppDispatch>()
    const handleSelect=()=>{
        dispatch(showDisignDetail())
    }
    const menuItems:Required<MenuProps>['items'] = [{
        label: '实体产品展厅',
        icon: <MailOutlined/>,
        key: 'shiti',
        children: [{
            label: '智慧生活',
            key: 'shenghuo',
            children: [{
                label: '产品1',
                key: 'p1'
            },{
                label: '产品2',
                key: 'p2'
            }]
        },{
            label: '家居设计',
            key: 'jiaju',
            children: [{
                label: '产品1',
                key: 'p1'
            },{
                label: '产品2',
                key: 'p2'
            }]
        },{
            label: '趣味摆件',
            key: 'baijian',
            children: [{
                label: '产品3',
                key: 'p3'
            },{
                label: '产品4',
                key: 'p4'
            }]
        }]
    },{
        label: '体验设计',
        icon: <MailOutlined/>,
        key: 'tiyan',
    },{
        label: '移动应用',
        icon: <MailOutlined/>,
        key: 'yidong',
    },{
        label: '交互装置',
        icon: <MailOutlined/>,
        key: 'jiaohu',
    }];
    return (
        <div className='menu-group'>
            <button type="button" className="menu-button" onClick={()=>setCollapsed(!collapsed)}>
                {collapsed?<MenuUnfoldOutlined/>:<MenuFoldOutlined/>}
            </button>
            {collapsed && <Menu items={menuItems} mode='inline' className='menu' onSelect={handleSelect}/>}
        </div>
    )
}
export default MenuButton