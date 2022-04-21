import UserButton from './components/UserButton'
import SkinButton from './components/SkinButton'
import FavorButton from './components/FavorButton'
import MenuButton from './components/MenuButton'

function App() {
  return (
    <div style={{
      padding: '20px 40px'
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center'
      }}>
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
