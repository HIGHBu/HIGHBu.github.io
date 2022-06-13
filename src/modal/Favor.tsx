import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Progress } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import demoPic from '../assets/APP.png'
import { AppDispatch, RootState } from '../store/store';
import { hideFavor } from '../store/modalSlice';
import { designerIs, favorTitle, saveSkin, unlockCondition } from '../text';

interface FavorItemProp {
    eid:string;
}

function FavorItem(props: FavorItemProp){
    const title='智能无人车'
    const designer='小明'
    return (
        <div className='favor-item'>
            <div className='thumb'/>
            <h1>{title}</h1>
            <h2>{designerIs+designer}</h2>
        </div>
    )
}

function Favor(){
    const dispatch=useDispatch<AppDispatch>()
    const favor_list=useSelector<RootState,string[]>(state=>state.userSlice.favor)
    const handleClose=()=>dispatch(hideFavor())
    return (
        <div className='skin-favor-modal'>
            <img src={demoPic}/>
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