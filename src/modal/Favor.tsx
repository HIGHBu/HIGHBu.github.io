import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Progress } from 'antd';
import demoPic from '../assets/APP.png'
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
    return (
        <div className='skin-favor-modal'>
            <img src={demoPic}/>
            <div className='panel'>
                <div className='panel-head'>
                    <h1>{favorTitle}</h1>
                    <CloseOutlined/>
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