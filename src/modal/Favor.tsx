import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Progress } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import demoPic from '../assets/APP.png'
import { AppDispatch, RootState } from '../store/store';
import { hideFavor } from '../store/modalSlice';
import { designerIs, favorTitle, saveSkin, unlockCondition } from '../glob';
import { useEffect } from 'react';
import { updateActions } from '../store/actionSlice';
import { Exhibit } from '../api/exhibit'
import { Action } from '../api/action';

interface FavorItemProp {
    eid:string;
}

function FavorItem(props: FavorItemProp){
    const itemId=useSelector<RootState,string>(state=>state.modalSlice.exhibitId)
    const item=useSelector<RootState,Exhibit>(state=>state.exhibitSlice.items.find(v=>v.id===itemId)!)
    const comments=useSelector<RootState,Action[]>(state=>state.actionSlice.items[itemId] || [])
    useEffect(()=>{
        dispatch(updateActions(props.eid))
    },[props.eid])
    return (
        <div className='favor-item'>
            <img className='thumb' src={item.avatar}>
            </img>
            <h1>{item.title}</h1>
            <h2>{designerIs+item.author}</h2>
        </div>
    )
}

function Favor(){
    const dispatch=useDispatch<AppDispatch>()
    const favor_list=useSelector<RootState,string[]>(state=>state.userSlice.favor)
    const handleClose=()=>dispatch(hideFavor())
    return (
        <div className='skin-favor-modal'>
            <div className='panel'>
                <div className='panel-head'>
                    <h1>{favorTitle}</h1>
                    <CloseOutlined onClick={handleClose}/>
                </div>
                <div className='favor-panel-body'>
                    {favor_list.map((item,index)=>(
                        <FavorItem key={"favor"+index} eid={item}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Favor

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
