import { Keyboard,AreaLight, Cube, FirstPersonCamera, ThirdPersonCamera, OrbitCamera, Model, Skybox, useKeyboard, useLoop, usePreload, useWindowSize, World } from "lingo3d-react"
import { useRef, useState } from "react"

const Game = () => {
  const characterRef = useRef<any>()
  const cameraRef = useRef<any>()
  const windowSize = useWindowSize()
  let [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  let [camera_target, setCamera_target] = useState({ x: 100.0, y: 0, z: 0 })
  let [walking, setWalking] = useState(false)
  const fov = windowSize.width > windowSize.height ? 75 : 100
  let handleKeyDown = (key) => {
    if(key==='w'){
      let model = characterRef.current
      const point = model.pointAt(200) 
      let target_position = point
      setPosition(target_position)
      setWalking(true)
      model.lookAt(target_position)
    }
    if(key==='s'){
      let model = characterRef.current
      const point = model.pointAt(-200) 
      let target_position = point
      setPosition(target_position)
      setWalking(true)
      model.lookAt(target_position)
    }
    if(key==='d'){
      let model = characterRef.current
      const point = model.pointAt(200) 
      const current_position = {x: model.x, y: model.y,z:model.z}
      console.log(current_position)
      let target_position = {x:current_position.z-point.z,y:0,z:point.x-current_position.x}
      setPosition(target_position)
      setWalking(true)
      model.lookAt(target_position)
    }
    if(key==='a'){
      let model = characterRef.current
      const point = model.pointAt(200) 
      const current_position = {x: model.x, y: model.y,z:model.z}
      console.log(current_position)
      let target_position = {x:point.z-current_position.z,y:0,z:-point.x+current_position.x}
      setPosition(target_position)
      setWalking(true)
      model.lookAt(target_position)
    }
    if(key==='b'){

    }
  }
  useLoop(() => {
    let model = characterRef.current
    model.moveForward(-3)
  }, walking)

  let handleIntersect = () => {
    setWalking(false)
  }
  let handleClick = (ev) => {
    ev.point.y = 0
    // setPosition(ev.point)
    // setWalking(true)
    // let model = characterRef.current
    // model.lookAt(ev.point)
    setCamera_target(ev.point)

  }
  return (<>
    <World logarithmicDepth>
    {/* <World defaultOrbitControls defaultLight={false} ambientOcclusion bloom bloomStrength={0.2}> */}
      <Cube width={9999} depth={9999} y={-105} onClick={handleClick} texture="ground.jpeg" textureRepeat={50} />
      <Cube id="orangeBox" scale={0.05} color="orange" x={position.x} y={position.y} z={position.z} visible={false} />
      <Keyboard onKeyDown={handleKeyDown} />
      <Model id="gallery_model" src="gallery_model/mobile_gallery.glb" x={0.0} y={0.0} z={0.0} scale={1} physics="map" />
      <Model
       ref={characterRef}
       src="character_model/Fox.fbx"
       x={0.0}
       y={0.0}
       z={0.0}
       animations={{ idle: "character_model/Idle.fbx", walking: "character_model/Walking.fbx" }}
       animation={walking ? "walking" : "idle"}
       intersectIDs={["orangeBox"]}
       onIntersect={handleIntersect}
       physics="map"
      />
      <Model src ="art_model/car.glb" 
      scale={1} 
      x={150.0}
      y={0.0}
      z={0.0}
      />
      <Model
      src = "character_model/basic_body.glb" 
      x={75.0}
      y={0.0}
      z={0.0}
      scale={1.0}
      />
      <Model
      src = "character_model/body_with_head.glb" 
      x={-75.0}
      y={0.0}
      z={0.0}
      />
      <Model
      src = "character_model/head.glb" 
      x={-200.0}
      y={0.0}
      z={0.0}
      scale={0.5}
      />
      <ThirdPersonCamera active mouseControl>
      <Cube
        scale = {0.01}
        ref={cameraRef}
        x={camera_target.x} y={camera_target.y} z={camera_target.z}
        visible={false}
      />
      </ThirdPersonCamera>
      <AreaLight z={650} intensity={1.5} />
      <AreaLight z={-650} rotationY={180} intensity={0.75} />
      <AreaLight x={650} rotationY={90} intensity={0.75} />
      <AreaLight x={-650} rotationY={-90} intensity={0.75} />
      <Skybox texture="sky.jpg" />
    </World>
  </>)
}

const App = () => {
  const progress = usePreload([
    "gallery_model/mobile_gallery.glb",
    "ground.jpeg",
    "character_model/Fox.fbx",
    "character_model/Idle.fbx",
    "character_model/Walking.fbx", 
    "character_model/basic_body.glb",
    "character_model/body_with_head.glb", 
    "character_model/head.glb",
    "art_model/car.glb",
    "art_model/earphones.glb",
    "art_model/lamp.glb",
    "sky.jpg"
  ], "3.5mb")
  if (progress < 100)
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
      }}>
        loading {Math.round(progress)}%
      </div>
    )

  return (
    <Game />
  )
}

export default App
