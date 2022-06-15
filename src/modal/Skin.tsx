import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { message, Progress } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import demoPic from '../assets/APP.png'
import { AppDispatch, RootState, store } from '../store/store';
import { hideSkin } from '../store/modalSlice';
import { progressComplete, progressNotComplete, saveSkin, skinPending, skinSuccess, skinTitle, unknownError, unlockCondition } from '../text';
import { useEffect, useState } from 'react';
import { setClothes } from '../store/userSlice';
import { apiModifyProfile } from '../api/user';

interface SkinItemProp {
    selectedpair: [number,(arg0:number)=>void],
    prefix: 'head'|'cloth'
}

const SkinList={
    cloth: [{
        path: import('../assets/skin/cloth/doughnut.png'),
        name: '梦想甜甜圈',
        desc: '进入展馆'
    },{
        path: import('../assets/skin/cloth/leaves.png'),
        name: '火红枫叶',
        desc: '浏览7件展品'
    },{
        path: import('../assets/skin/cloth/palette.png'),
        name: '小画家',
        desc: '分享3件展品'
    },{
        path: import('../assets/skin/cloth/star.png'),
        name: '星星斗篷',
        desc: '观展时长达到10min'
    },{
        path: import('../assets/skin/cloth/tie.png'),
        name: '毕业礼',
        desc: '评论3件展品'
    }],
    head: [{
        name: '甜心圈',
        path: import('../assets/skin/head/doughnut.png'),
        desc: '进入展馆'
    },{
        name: '美梦睡帽',
        path: import('../assets/skin/head/hat.png'),
        desc: '观展时长达到3min'
    },{
        name: '小天使',
        path: import('../assets/skin/head/ring.png'),
        desc: '浏览5件展品'
    },{
        name: '时尚发带',
        path: import('../assets/skin/head/band.png'),
        desc: '分享1件展品'
    },{
        name: '好奇眼睛',
        path: import('../assets/skin/head/glasses.png'),
        desc: '评论1件展品'
    }
    ]
}

function SkinItem(props: SkinItemProp){
    const {selectedpair,prefix}=props
    const [selected,setselected]=selectedpair
    const [thumb,setthumb]=useState('')
    const [title,settitle]=useState('')
    const [condition,setcondition]=useState('')
    const percent:number=50
    const handleDec=()=>{
        if(selected===0)
            setselected(SkinList[prefix].length-1)
        else
            setselected(selected-1)
    }
    useEffect(()=>{
        settitle(SkinList[prefix][selected].name)
        setcondition(SkinList[prefix][selected].desc)
        settitle(SkinList[prefix][selected].name)
        SkinList[prefix][selected].path.then(res=>{
            setthumb(res.default)
        })
    },[selected])
    const handleInc=()=>{
        if(selected===SkinList[prefix].length-1)
            setselected(0)
        else
            setselected(selected+1)
    }
    return (
        <div className='skin-item'>
            <LeftOutlined onClick={handleDec}/>
            <img className='thumb' src={thumb}/>
            <RightOutlined onClick={handleInc}/>
            <div className='detail'>
                <h1>{title}</h1>
                <h2>{unlockCondition+condition}</h2>
                <div className='progress-group'>
                    <Progress showInfo={false} percent={percent}/>
                    {percent===100?progressComplete:progressNotComplete}
                </div>
            </div>
        </div>
    )
}

function Skin(){
    const dispatch=useDispatch<AppDispatch>()
    const handleClose=()=>dispatch(hideSkin())
    const [head,sethead]=useState(0)
    const [cloth,setcloth]=useState(0)
    const handleSubmit=async()=>{
        const hideSubmit=message.loading(skinPending)
        const res=await apiModifyProfile(store.getState().userSlice.uid,{
            ...store.getState().userSlice.profile,
            clothes: [head,cloth]
        })
        hideSubmit()
        if(res==='ok')
            message.success(skinSuccess)
        else
            message.error(unknownError)

    }
    const submitSelection=()=>{
        dispatch(setClothes([head,cloth]))
        handleSubmit()
    }
    useEffect(()=>{
        sethead(store.getState().userSlice.profile.clothes[0])
        setcloth(store.getState().userSlice.profile.clothes[1])
    },[])
    return (
        <div className='skin-favor-modal'>
            <img src={demoPic}/>
            <div className='panel'>
                <div className='panel-head'>
                    <h1>{skinTitle}</h1>
                    <CloseOutlined onClick={handleClose}/>
                </div>
                <SkinItem prefix='head' selectedpair={[head,v=>{console.log(v);sethead(v)}]}/>
                <SkinItem prefix='cloth' selectedpair={[cloth,setcloth]}/>
                <button type='button' className='save-button text' onClick={submitSelection}>
                    {saveSkin}
                </button>
            </div>
        </div>
    )
}
export default Skin