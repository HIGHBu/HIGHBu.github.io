import UserButton from './components/UserButton'
import SkinButton from './components/SkinButton'
import FavorButton from './components/FavorButton'
import MenuButton from './components/MenuButton'
import DesignDetail from './modal/DesignDetail'

function App() {
  return (
    <div>
      <DesignDetail/>
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
