import UserButton from './components/UserButton'
import SkinButton from './components/SkinButton'
import FavorButton from './components/FavorButton'
import MenuButton from './components/MenuButton'
import DesignDetail from './modal/DesignDetail'
import Skin from './modal/Skin'
import Favor from './modal/Favor'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import Login from './modal/Login'
import Welcome from './components/Welcome'
import { useState } from 'react'
function App() {
  const designDetailVisible=useSelector<RootState,boolean>(state=>state.modalSlice.disignDetail)
  const favorVisible=useSelector<RootState,boolean>(state=>state.modalSlice.favor)
  const skinVisible=useSelector<RootState,boolean>(state=>state.modalSlice.skin)
  //const loginVisible=useSelector<RootState,boolean>(state=>state.modalSlice.login)
  const [covered,setcovered]=useState(true)
  const modal=designDetailVisible && <DesignDetail/> || 
    favorVisible && <Favor/> ||
    skinVisible && <Skin/>;
  const mainStage=(
    <div>
      {modal}
      <MenuButton/>
      <div className='top-button-group'>
        <UserButton/>
        <SkinButton/>
        <FavorButton/>
      </div>
    </div>
  )
  const welcomeStage=<Welcome onExit={()=>setcovered(false)}/>
  return covered?welcomeStage:mainStage
}

export default App
