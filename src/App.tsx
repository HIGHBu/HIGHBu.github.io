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
import AudioOn from './assets/musicon.png'
import AudioOff from './assets/musicoff.png'
import { usePreload } from 'lingo3d-react'
function App() {
  const designDetailVisible=useSelector<RootState,boolean>(state=>state.modalSlice.disignDetail)
  const favorVisible=useSelector<RootState,boolean>(state=>state.modalSlice.favor)
  const skinVisible=useSelector<RootState,boolean>(state=>state.modalSlice.skin)
  const shiftVisible=useSelector<RootState,boolean>(state=>state.modalSlice.shift)
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
    skinVisible && <Skin/> ||
    shiftVisible && 
      <div>
        <h1 style={{zIndex:2, position:'absolute', textAlign:'center',fontSize: 64,fontWeight: 'bold',top:'45%', left:'33%'}}>正在前往虚拟展厅...</h1>
        <img src="background.png" style={{width:'100%', height:'100%', zIndex:1, position:'absolute',top:'0', left:'0',objectFit: 'cover'}}></img>
      </div>;
    const progress = usePreload(
      [
        "tutorial/Move_1.png",
        "tutorial/Button_2.png",
        "gallery_model/test4.glb",
        "character_model/texture/doughnut.png",
        "character_model/texture/leaves.png", 
        "character_model/texture/original.png",
        "character_model/texture/palette.png",
        "character_model/texture/star.png",
        "character_model/texture/tie.png",
        "character_model/character/basic/src.glb",
        "character_model/character/basic/walk.glb",
        "character_model/character/basic/idle.glb",
        "character_model/character/band/src.glb",
        "character_model/character/band/walk.glb",
        "character_model/character/band/idle.glb",
        "character_model/character/doughnut/src.glb",
        "character_model/character/doughnut/walk.glb",
        "character_model/character/doughnut/idle.glb",
        "character_model/character/glasses/src.glb",
        "character_model/character/glasses/walk.glb",
        "character_model/character/glasses/idle.glb",
        "character_model/character/hat/src.glb",
        "character_model/character/hat/walk.glb",
        "character_model/character/hat/idle.glb",
        "character_model/character/ring/src.glb",
        "character_model/character/ring/walk.glb",
        "character_model/character/ring/idle.glb",
        "character_model/browse/browse.glb",
        "character_model/browse/src.glb",
        "character_model/camera/src.glb",
        "character_model/camera/camera.glb",
        "character_model/record/src.glb",
        "character_model/record/record.glb",
        "plane/communication.png",
        "plane/reality.png",
        "sky.jpg",
        // "background.png"
      ],
      "63.2mb"
    )
  
  const mainStage=(
    <div style={{height:'100%'}}>
      <Web3d progress={progress}/>
      <MenuButton/>
      <div className='top-button-group'>
        <UserButton/>
        <SkinButton/>
        <FavorButton/>
      </div>
      <audio src={bgm} ref={audioRef} autoPlay loop></audio>
      {modal}
      <Button type='link' size="large" className="bgm-button" icon={<img height={50} width={50} src={sound?AudioOn:AudioOff}/>} onClick={handleBgm}></Button>
    </div>
  )
  const welcomeStage=<Welcome onExit={()=>setcovered(false)}/>
  return covered?welcomeStage:mainStage
}

export default App
