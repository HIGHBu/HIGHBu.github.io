import {LingoEditor,  Model, ThirdPersonCamera, types, World, useLoop, Find} from 'lingo3d-react'
import {useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { SkinList } from '../glob';
import { RootState, store } from '../store/store';


const Fit=() => {
  const characterRef = useRef<types.Model>(null)
  const cameraRef = useRef<types.ThirdPersonCamera>(null)
  const [head_id,cloth_id] = useSelector<RootState,number[]>(state=>state.userSlice.profile.clothes)
  const [src_select,setSrc] = useState("character_model/character/basic/src.glb")
  const [walk_select,setWalk] = useState("character_model/character/basic/walk.glb")
  const [idle_select,setIdle] = useState("character_model/character/basic/idle.glb")  
  const [detail_texture_select,setTexture] = useState("character_model/texture/original.png")
  useEffect(()=>{
    setSrc("character_model/character/"+SkinList.head[head_id].id+"/src.glb");
    setWalk("character_model/character/"+SkinList.head[head_id].id+"/walk.glb");
    setIdle("character_model/character/"+SkinList.head[head_id].id+"/idle.glb");
    setTexture("character_model/texture/"+SkinList.cloth[cloth_id].id+".png");
  },[head_id,cloth_id])

  return (
    //<div style={{width: '30%',height:'50%',position:'absolute',left:0,top:0,justifyContent:'center',alignItems:'center',color:'white',zIndex: 0}}>
      <World
        position='relative'
        color = "transparent"
      >
        <ThirdPersonCamera
          name="FittingCamera"
          mouseControl="drag" mouseControlMode="orbit" 
          lockTargetRotation={false}
          zoom={1.0} fov={45} 
          width={50} height={50} depth={50}
          minPolarAngle={90} maxPolarAngle={90}
          ref={cameraRef}
          active
        >
          <Model
            key={src_select}
            src={src_select}
            ref={characterRef}
            scale={0.2}
            animations={{
              idle:idle_select,
              walk:walk_select,
            }}
            animation={"idle"}
            innerRotationY={180}
            width={400}
            height={1200}
            depth={400}
            boxVisible={false}
            innerY={-460}
            frustumCulled={false}       
          >
            <Find name="body" texture={detail_texture_select}/>
          </Model>
        </ThirdPersonCamera>
      </World>
    //</div>
  )
}

export default Fit
