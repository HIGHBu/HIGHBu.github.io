import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Progress } from 'antd';
import { useDispatch } from 'react-redux';
import demoPic from '../assets/APP.png'
import { AppDispatch } from '../store';
import { hideFavor } from '../store/modalSlice';
import { designerIs, favorTitle, saveSkin, unlockCondition } from '../text';

interface FavorItemProp {
    prefix:string;
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
                    <FavorItem prefix='a'/>
                    <FavorItem prefix='b'/>
                    <FavorItem prefix='a'/>
                    <FavorItem prefix='b'/>
                    <FavorItem prefix='a'/>
                    <FavorItem prefix='b'/>
                    <FavorItem prefix='a'/>
                    <FavorItem prefix='b'/>
                </div>
            </div>
        </div>
    )
}
export default Favor