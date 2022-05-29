import UserButton from './components/UserButton'
import SkinButton from './components/SkinButton'
import FavorButton from './components/FavorButton'
import MenuButton from './components/MenuButton'
import DesignDetail from './modal/DesignDetail'
import Skin from './modal/Skin'
import Favor from './modal/Favor'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import Welcome from './components/Welcome'
import { useRef, useState } from 'react'
import { Button } from 'antd'
import { SoundFilled, SoundOutlined } from '@ant-design/icons'
import bgm from './assets/bgm.mp3'
import Web3d from './web3d/Web3d'
function App() {
  const designDetailVisible=useSelector<RootState,boolean>(state=>state.modalSlice.disignDetail)
  const favorVisible=useSelector<RootState,boolean>(state=>state.modalSlice.favor)
  const skinVisible=useSelector<RootState,boolean>(state=>state.modalSlice.skin)
  //const loginVisible=useSelector<RootState,boolean>(state=>state.modalSlice.login)
  const [covered,setcovered]=useState(true)
  const [sound,setsound]=useState(true)
  const audioRef=useRef<HTMLAudioElement>(null)
  const handleBgm=()=>{
    if(!sound)
      audioRef.current?.play();
    else
      audioRef.current?.pause();
    setsound(!sound);
  }
  const modal=designDetailVisible && <DesignDetail/> || 
    favorVisible && <Favor/> ||
    skinVisible && <Skin/>;
  const mainStage=(
    <div>
      <Web3d/>
      <MenuButton/>
      <div className='top-button-group'>
        <UserButton/>
        <SkinButton/>
        <FavorButton/>
      </div>
      <audio src={bgm} ref={audioRef} autoPlay loop></audio>
      {modal}
      <Button type='link' size="large" className="bgm-button" icon={sound?<SoundFilled/>:<SoundOutlined/>} onClick={handleBgm}></Button>    </div>
  )
  const welcomeStage=<Welcome onExit={()=>setcovered(false)}/>
  return covered?welcomeStage:mainStage
}

export default App
