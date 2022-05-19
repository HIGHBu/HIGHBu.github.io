import { useMachine } from '@xstate/react'
import {LingoEditor, Cube,  Find, HTML, Keyboard, Model, Reticle, ThirdPersonCamera, types, usePreload, useSpring, useWindowSize, World } from 'lingo3d-react'
import { useRef, useState } from 'react'
import './App.css'
import character_poseMachine from './stateMachines/character_poseMachine'
import AnimText from "@lincode/react-anim-text"

const Game = () => {
  const characterRef = useRef<types.Model>(null)
  const walking_speed = 30
  const [character_pose, sendCharacter_Pose] = useMachine(character_poseMachine)
  const [mouseOver, setMouseOver] = useState(false)

  const camX = mouseOver ? 25 : 0
  const camY = mouseOver ? 100 : 100
  const camZ = mouseOver ? 50 : 200

  const xSpring = useSpring({ to: camX, bounce: 0 })
  const ySpring = useSpring({ to: camY, bounce: 0 })
  const zSpring = useSpring({ to: camZ, bounce: 0 })

  return (
    <>
      <World
       skybox="sky.jpg"
       ambientOcclusion
       logarithmicDepth
      >
        <Model id="gallery_model" src="gallery_model/gallery.glb" scale={6.55941} physics="map">
        </Model>
        <Cube
         onMouseOver={() => setMouseOver(true)}
         onMouseOut={() => setMouseOver(false)}
         x={215.09} 
         y={-130.12} 
         z={-2823.41}
        >
          {mouseOver && (
              <HTML>
                <div style={{ color: "white" }}>
                  <AnimText style={{ fontWeight: "bold", fontSize: 20 }} duration={1000}>
                    Artwork Title
                  </AnimText>
                  <AnimText duration={1000}>
                    TEST
                  </AnimText>
                </div>
              </HTML>
            )}
        </Cube>

        <Model 
          frustumCulled={false}
          src="character_model/record/src.glb"
          animations={{
            idle:"character_model/record/idle.glb",
            record:"character_model/record/record.glb"
          }}
          animation={"record"}
          width={91.05} 
          depth={61.73} 
          x={592.51} 
          y={-260.73} 
          z={-2249.91}
          scale={0.8}
        >
          <Find name="body" texture="character_model/texture/star.png"/>
        </Model>

        <Model 
          frustumCulled={false} 
          src="character_model/browse/src.glb"
          animations={{
            idle:"character_model/browse/idle.glb",
            browse:"character_model/browse/browse.glb"
          }}
          animation={"browse"}
          width={91.05} 
          depth={61.73} 
          x={792.51} 
          y={-260.73} 
          z={-2649.91}
          scale={0.3}
        >
          <Find name="body" texture="character_model/texture/star.png"/>
        </Model>

        <Model 
          frustumCulled={false}
          src="character_model/camera/src.glb"
          animations={{
            idle:"character_model/camera/idle.glb",
            camera:"character_model/camera/camera.glb"
          }}
          animation={"camera"}
          width={91.05} 
          depth={61.73} 
          x={592.51} 
          y={-260.73} 
          z={-2649.91}
          scale={0.3}
        >
          <Find name="body" texture="character_model/texture/star.png"/>
        </Model>

        <ThirdPersonCamera
         mouseControl="drag" 
         active
         innerY={ySpring}
         innerZ={zSpring}
         innerX={xSpring}
         zoom={1.0} 
         fov={45} 
         minPolarAngle={70}
         maxPolarAngle={105}
        >
          <Model
           src="character_model/character/src.glb"
           ref={characterRef}
           physics="character"
           scale={0.12}
           animations={{
            idle:"character_model/character/idle.glb",
            back_walking:"character_model/character/back_walking.glb",
            forward_walking:"character_model/character/forward_walking.glb",
            left_walking:"character_model/character/forward_walking.glb",//TODO
            right_walking:"character_model/character/forward_walking.glb",//TODO
          }}
           animation={character_pose.value as any}
           width={50}
           depth={50}
           x={-504.52} 
           y={-298.20} 
           z={-2407.86}
          >
          <Find name="body" texture="character_model/texture/star.png"/>
          </Model>
        </ThirdPersonCamera>
        <Keyboard
         onKeyPress={key => {
           if (key === "w") {
            sendCharacter_Pose("KEY_W_DOWN")
            characterRef.current?.moveForward(-1*walking_speed)
           }
           else if (key === "s"){
            sendCharacter_Pose("KEY_S_DOWN")
             characterRef.current?.moveForward(walking_speed)
           }
           else if (key === "a"){
            sendCharacter_Pose("KEY_A_DOWN")
             characterRef.current?.moveRight(walking_speed)
           }
           else if (key === "d"){
            sendCharacter_Pose("KEY_D_DOWN")
             characterRef.current?.moveRight(-1*walking_speed)
           }
         }}
         onKeyUp={key => {
           if (key === "w"){
            sendCharacter_Pose("KEY_W_UP")
           }
           else if (key === "s"){
            sendCharacter_Pose("KEY_S_UP")
           }
           else if (key === "a"){
            sendCharacter_Pose("KEY_A_UP")
           }
           else if (key === "d"){
            sendCharacter_Pose("KEY_D_UP")
           }
         }}
        />
        {/* <LingoEditor /> */}
      </World>
    </>
  )
}

const App = () => {
  const progress = usePreload(
    [
      "gallery_model/gallery.glb",
      "character_model/character/src.glb",
      "character_model/character/idle.glb",
      "character_model/character/forward_walking.glb",
      "character_model/character/back_walking.glb",
      "character_model/browse/browse.glb",
      "character_model/browse/idle.glb",
      "character_model/browse/src.glb",
      "character_model/camera/src.glb",
      "character_model/camera/idle.glb",
      "character_model/camera/camera.glb",
      "character_model/record/src.glb",
      "character_model/record/idle.glb",
      "character_model/record/record.glb",
      "character_model/avatar_glasses.glb",
      "sky.jpg",
    ],
    "63.2mb"
  )

  if (progress < 100)
    return (
      <div className="w-full h-full absolute bg-black left-0 top-0 flex justify-center items-center text-white">
        loading {Math.floor(progress)}%
      </div>
    )
  
  return (
    <Game />
  )
}

export default App
