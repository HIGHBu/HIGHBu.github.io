import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Progress } from 'antd';
import { useDispatch } from 'react-redux';
import demoPic from '../assets/APP.png'
import { AppDispatch } from '../store/store';
import { hideSkin } from '../store/modalSlice';
import { saveSkin, skinTitle, unlockCondition } from '../text';

interface SkinItemProp {
    prefix:string;
}

function SkinItem(props: SkinItemProp){
    const title='学士帽'
    const percent=50
    return (
        <div className='skin-item'>
            <LeftOutlined/>
            <div className='thumb'/>
            <RightOutlined/>
            <div className='detail'>
                <h1>{title}</h1>
                <h2>{unlockCondition}</h2>
                <Progress percent={percent}/>
            </div>
        </div>
    )
}

function Skin(){
    const dispatch=useDispatch<AppDispatch>()
    const handleClose=()=>dispatch(hideSkin())
    return (
        <div className='skin-favor-modal'>
            <img src={demoPic}/>
            <div className='panel'>
                <div className='panel-head'>
                    <h1>{skinTitle}</h1>
                    <CloseOutlined onClick={handleClose}/>
                </div>
                <SkinItem prefix='head'/>
                <SkinItem prefix='body'/>
                <button type='button' className='save-button text'>
                    {saveSkin}
                </button>
            </div>
        </div>
    )
}
export default Skin