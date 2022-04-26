import UserButton from './components/UserButton'
import SkinButton from './components/SkinButton'
import FavorButton from './components/FavorButton'
import MenuButton from './components/MenuButton'
import DesignDetail from './modal/DesignDetail'
import Skin from './modal/Skin'
import Favor from './modal/Favor'
import { useSelector } from 'react-redux'
import { RootState } from './store'
function App() {
  const designDetailVisible=useSelector<RootState,boolean>(state=>state.modalSlice.disignDetail)
  const favorVisible=useSelector<RootState,boolean>(state=>state.modalSlice.favor)
  const skinVisible=useSelector<RootState,boolean>(state=>state.modalSlice.skin)
  console.log('render')
  const modal=designDetailVisible && <DesignDetail/> || 
    favorVisible && <Favor/> ||
    skinVisible && <Skin/>;
  return (
    <div>
      {modal}
      <div className='top-button-group'>
        <MenuButton/>
        <div style={{flexGrow:1}}/>
        <UserButton/>
        <SkinButton/>
        <FavorButton/>
      </div>
    </div>
  )
}

export default App
