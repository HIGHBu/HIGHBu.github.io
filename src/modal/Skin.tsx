import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { message, Progress } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import demoPic from '../assets/APP.png'
import { AppDispatch, RootState, store } from '../store/store';
import { hideSkin } from '../store/modalSlice';
import { progressComplete, progressNotComplete, saveSkin, SkinList, skinPending, skinSuccess, skinTitle, unknownError, unlockCondition } from '../glob';
import { useEffect, useState } from 'react';
import { setClothes } from '../store/userSlice';
import { apiModifyProfile } from '../api/user';
import Fitting from '../web3d/Fitting';

interface SkinItemProp {
    selectedpair: [number,(arg0:number)=>void],
    prefix: 'head'|'cloth'
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
        import(`../assets/skin/${prefix}/${SkinList[prefix][selected].id}.png`).then(res=>{
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
            <div style={{width: '30%'}}>
                <Fitting/>
            </div>
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