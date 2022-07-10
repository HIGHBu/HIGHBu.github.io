import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, message, Progress } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../store/store';
import { hideSkin } from '../store/modalSlice';
import { progressComplete, progressNotComplete, saveSkin, SkinList, skinPending, skinSuccess, skinTitle, unknownError, unlockCondition } from '../glob';
import { useEffect, useMemo, useState } from 'react';
import { setClothes } from '../store/userSlice';
import { apiModifyProfile } from '../api/user';

interface SkinItemProp {
    okpair: [boolean,(arg0:boolean)=>void]
    selectedpair: [number,(arg0:number)=>void],
    prefix: 'head'|'cloth'
}


function SkinItem(props: SkinItemProp){
    const {selectedpair,okpair,prefix}=props
    const [selected,setselected]=selectedpair
    const [ok,setok]=okpair
    const [thumb,setthumb]=useState('')
    const [title,settitle]=useState('')
    const [condition,setcondition]=useState('')
    const v=useSelector<RootState,number>(state=>state.userSlice.visit_count)
    const s=useSelector<RootState,number>(state=>state.userSlice.share_count)
    const c=useSelector<RootState,number>(state=>state.userSlice.comment_count)
    const login_time=useSelector<RootState,number>(state=>state.userSlice.login_time)
    const percent=useMemo(()=>{
        const np=Math.min(100,SkinList[prefix][selected].perc(v,s,c,(new Date().getTime()-login_time)/60000))
        Promise.resolve().then(()=>setok(np==100))
        return np
    },[v,s,c,selected])
    
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
    const [headok,setheadok]=useState(false)
    const [clothok,setclothok]=useState(false)
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
        <div className='skin-favor-modal' style={{backdropFilter: 'none'}}>
            <div style={{width: '30%'}}> 
            </div>
            <div className='panel'>
                <div className='panel-head'>
                    <h1>{skinTitle}</h1>
                    <CloseOutlined onClick={handleClose}/>
                </div>
                <SkinItem prefix='head' okpair={[headok,setheadok]} selectedpair={[head,v=>{console.log(v);sethead(v)}]}/>
                <SkinItem prefix='cloth' okpair={[clothok,setclothok]} selectedpair={[cloth,setcloth]}/>
                <Button className='save-button' type="primary" disabled={!headok || !clothok} onClick={submitSelection}>
                    {saveSkin}
                </Button>
            </div>
        </div>
    )
}
export default Skin