import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useDispatch,useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { hideFavor, showDisignDetail } from '../store/modalSlice';
import { designerIs, favorTitle, saveSkin, unlockCondition } from '../glob';
import { Exhibit } from '../api/exhibit'
import { useEffect } from 'react';
import { UpdateFavorite } from '../store/userSlice';

interface FavorItemProp {
    eid:string;
}

function FavorItem(props: FavorItemProp){
    const item=useSelector<RootState,Exhibit>(state=>state.exhibitSlice.items.find(v=>v.id===props.eid)!)
    //const comments=useSelector<RootState,Action[]>(state=>state.actionSlice.items[itemId] || [])
    const dispatch=useDispatch<AppDispatch>()
    const handleClick=()=>{
        dispatch(showDisignDetail(props.eid))
    }
    return (
        <div className='favor-item' onClick={handleClick}>
            <img style={{width: 100,height: 140}} src={'/exhibits/'+item.avatar}>
            </img>
            <h1 style={{whiteSpace: 'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item.title}</h1>
            <h2>{designerIs+item.author}</h2>
        </div>
    )
}

function Favor(){
    const dispatch=useDispatch<AppDispatch>()
    const favor_list=useSelector<RootState,string[]>(state=>state.userSlice.favor)
    const handleClose=()=>dispatch(hideFavor())
    const uid=useSelector<RootState,string>(state=>state.userSlice.uid)
    useEffect(()=>{
        dispatch(UpdateFavorite(uid))
    },[])
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
