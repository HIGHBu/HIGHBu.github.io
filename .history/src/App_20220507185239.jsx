import { Editor, FirstPersonCamera,Cube,ThirdPersonCamera, Model, Mouse,Keyboard, Skybox, useKeyboard, useLoop, usePreload, useSpring, World, useWindowSize } from "lingo3d-react"
import { useRef, useState } from "react"

const Game = () => {
  const key = useKeyboard()
  useKeyboard((key)=>{
    console.log(key)
    if(key==='w')
      characterRef.current?.moveForward(-5)
    if(key==='s')
      characterRef.current?.moveForward(5)
    if(key==='a')
      characterRef.current?.moveRight(5)
    if(key==='d')
      characterRef.current?.moveRight(-5)
  })
  let [camera_choice, setCamera_choice] = useState(true)
  let [camera_target, setCamera_target] = useState({ x: 3000.0, y: 0, z: 0 })
  let handleKeyDown = (key) => {
    if(key==='b'){
      setCamera_choice(!camera_choice)
      setCamera_target({x:camera_target.x, y: camera_target.y+50.0, z: camera_target.z})//传入点位即可
    }
  }
  const characterRef = useRef()
  const cameraRef = useRef()
  const motion = (key === "w" || key === "s" || key === "d" || key === "a") ? "walking" : "idle"
  
  useLoop(() => {
    // characterRef.current.moveForward(-10)
  }, motion === "walking")

  // const gunSpring = useSpring({ from: -30, to: -40 })

  const windowSize = useWindowSize()
  const zoom = windowSize.width > windowSize.height ? 1 : 0.5

  return (<>
    <World logarithmicDepth>
      <Keyboard onKeyDown={handleKeyDown}></Keyboard>
      <Model id="gallery_model" src="gallery_model/mobile_gallery.glb" scale={7.6} physics="map" />
      <Model src ="art_model/car.glb" 
        scale={1} 
        x={3000.0}
        y={-280.0}
        z={0.0}
      />
      <Model src ="art_model/earphones.glb" 
        scale={2} 
        x={3200.0}
        y={-280.0}
        z={0.0}
      />
      <Model
        src = "character_model/basic_body.glb" 
        x={-3000.0}
        y={-280.0}
        z={0.0}
        physics="character"
        scale={1.0}
      />
      <Model
        src = "character_model/body_with_head.glb" 
        x={-3100.0}
        y={-280.0}
        z={0.0}
        physics="character"
      />
      <Model
        src = "character_model/head.glb" 
        x={0.0}
        y={-280.0}
        z={3000.0}
        scale={0.5}
        physics="character"
      />
      <ThirdPersonCamera 
        active={camera_choice}
        mouseControl="drag" 
        zoom={zoom} 
      >
        <Model
            ref={characterRef}
            src="character_model/Fox.fbx" 
            physics="character"
            x={3000}
            y={-280.0}
            z={0.0}
            animations={{ idle:"character_model/Idle.fbx", walking:"character_model/Walking.fbx" }}
            animation={motion}
            visible={true}
          />
          {/* <Model src="gun.glb" z={gunSpring} x={20} y={-10} scale={0.2} innerRotationY={-90} /> */}
      </ThirdPersonCamera>
      <ThirdPersonCamera active={!camera_choice}>
        <Cube
          scale = {0.01}
          ref={cameraRef}
          x={camera_target.x} y={camera_target.y} z={camera_target.z}
          visible={false}
        />
      </ThirdPersonCamera>
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
    "ground.jpeg",
    "sky.jpg",
  ], "6.6mb")

  if (progress < 100)
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
        backgroundColor: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        loading {Math.round(progress)}%
      </div>
    )

  return (
    <Game />
  )
}

export default App