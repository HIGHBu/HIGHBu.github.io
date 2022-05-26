import { useMachine } from '@xstate/react'
import {LingoEditor, Plane, Cube,  Find, HTML, Keyboard, Model, Reticle, ThirdPersonCamera, types, usePreload, useSpring, useWindowSize, World, AreaLight, useLoop } from 'lingo3d-react'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import character_poseMachine from './stateMachines/character_poseMachine'

const Game = () => {
  const characterRef = useRef<types.Model>(null)
  const walking_speed = 30
  const [walking, setWalking] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0,z:0})
  const [character_pose, sendCharacter_Pose] = useMachine(character_poseMachine)
  const [mouseOver, setMouseOver] = useState(false)
  const [click, setClick] = useState(false)
  const [focus, setFocus] = useState(false)
  const character_select = ["basic", "band", "doughnu", "glasses", "hat", "ring"]
  const texture_select = ["doughnut", "leaves", "original", "palette", "star", "tie"]
  var gallery_select_id = 0     //TODO 后端接口
  var character_select_id = 1   //TODO 后端接口
  var texture_select_id = 0     //TODO 后端接口
  const gallery_scale = 6.40
  const src_select = "character_model/character/"+character_select[character_select_id]+"/src.glb"
  const walk_select = "character_model/character/"+character_select[character_select_id]+"/walk.glb"
  const idle_select = "character_model/character/"+character_select[character_select_id]+"/idle.glb"
  const textuere_select = "character_model/texture/"+texture_select[texture_select_id]+".png"
  //后端修改该数组，获得17个texture和要出现的人物模型的数量
  const poster = [
    {id: "1", name: "Board-1", texture:"", number:2,position:[
      {
        id: "1_1",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 1006.80, y: -310.22, z: -2404.1,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:135, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:0
      },
      {
        id: "1_2",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 991.22, y: -283.85, z: -2489.4,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:2
      },
      {
        id: "1_3",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 1199.01, y: -218.14, z: -2357.29,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:180, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:3
      },

    ]},
    {id: "2", name: "Board-2", texture:"", number:3,position:[
      {
        id: "2_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 2052.33, y: -283.85, z: -1864.16,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:180, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:1
      },
      {
        id: "2_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 1783.26, y: -218.14, z: -2064.66,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:0
      },
      {
        id: "2_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 1855.47, y: -310.22, z: -1917.36,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:135, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:4
      },
    ]},
    {id: "3", name: "Board-3", texture:"", number:3,position:[
      {
        id: "3_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 2537.28, y: -283.85, z: -1107.43,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:180, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:5
      },
      {
        id: "3_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 2396.34, y: -218.14, z: -1181.44,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:135, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:4
      },
      {
        id: "3_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 2418.21, y: -310.22, z: -1302.96,
        innerX:0, innerY:0, innerZ:0,
        rotationX:-180, rotationY:90, rotationZ:-180,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:5
      },
    ]},
    {id: "4", name: "Board-4", texture:"", number:3,position:[
      {
        id: "4_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 2623.84, y: -283.85, z: -337.22,
        innerX:0, innerY:0, innerZ:0,
        rotationX:-180, rotationY:135, rotationZ:-180,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:2
      },
      {
        id: "4_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 2696.61, y: -218.14, z: -111.56,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:135, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:3
      },
      {
        id: "4_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 2585.99, y: -310.22, z: -224.14,
        innerX:0, innerY:0, innerZ:0,
        rotationX:-180, rotationY:90, rotationZ:-180,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:1
      },
    ]},
    {id: "5", name: "Board-5", texture:"", number:3,position:[
      {
        id: "5_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 2589.27, y: -283.85, z: 815.74,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:135, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:5
      },
      {
        id: "5_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 2676.34, y: -218.14, z: 545.39,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:-180, rotationY:135, rotationZ:-180,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:4
      },
      {
        id: "5_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 2585.99, y: -310.22, z: 668.03,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:2
      },
    ]},
    {id: "6", name: "Board-6", texture:"", number:3,position:[
      {
        id: "6_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 2230.97, y: -283.85, z: 1508.42,
        innerX:0, innerY:0, innerZ:0,
        rotationX:-180, rotationY:90, rotationZ:-180,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:3
      },
      {
        id: "6_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 2176.44, y: -218.14, z: 1626.32,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:2
      },
      {
        id: "6_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 2309.97, y: -310.22, z: 1417.79,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:1
      },
    ]},
    {id: "7", name: "Board-7", texture:"", number:3,position:[
      {
        id: "7_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 1678.19, y: -283.85, z: 2213.00,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:5
      },
      {
        id: "7_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 1586.44, y: -218.14, z: 2198.14,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:45, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:4
      },
      {
        id: "7_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 1545.30, y: -310.22, z: 2310.89,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:5
      },
    ]},
    {id: "8", name: "Board-8", texture:"", number:3,position:[
      {
        id: "8_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 659.05, y: -283.85, z: 2706.40,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:2
      },
      {
        id: "8_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 757.93, y: -218.14, z: 2565.60,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:45, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:1
      },
      {
        id: "8_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 865.23, y: -310.22, z: 2594.80,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:3
      },
    ]},
    {id: "9", name: "Board-9", texture:"", number:3,position:[
      {
        id: "9_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -234.71, y: -283.85, z: 2691.64,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:0
      },
      {
        id: "9_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -319.52, y: -218.14, z: 2726.26,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:45, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:2
      },
      {
        id: "9_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -89.51, y: -310.22, z: 2707.43,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-45, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:1
      },
    ]},
    {id: "10", name: "Board-10", texture:"", number:3,position:[
      {
        id: "10_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -1302.03, y: -283.85, z: 2504.34,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:4
      },
      {
        id: "10_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -1054.06, y: -218.14, z: 2559.09,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:-60, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:5
      },
      {
        id: "10_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -1121.68, y: -310.22, z: 2482.34,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-15, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:0
      },
    ]},
    {id: "11", name: "Board-11", texture:"", number:3,position:[
      {
        id: "11_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -2005.61, y: -283.85, z: 1899.72,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:3
      },
      {
        id: "11_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -1865.94, y: -218.14, z: 1976.67,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:-60, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:2
      },
      {
        id: "11_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -1846.32, y: -310.22, z: 2088.68,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-90, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:4
      },
    ]},
    {id: "12", name: "Board-12", texture:"", number:3,position:[
      {
        id: "12_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -2474.61, y: -283.85, z: 1248.72,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-75, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:5
      },
      {
        id: "12_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -2540.47, y: -218.14, z: 1108.40,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:-30, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:0
      },
      {
        id: "12_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -2454.38, y: -310.22, z: 1158.03,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-60, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:1
      },
    ]},
    {id: "13", name: "Board-13", texture:"", number:3,position:[
      {
        id: "13_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -2680.95, y: -283.85, z: 211.19,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-75, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:0
      },
      {
        id: "13_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -2737.63, y: -218.14, z: 156.48,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:-30, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:3
      },
      {
        id: "13_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -2712.79, y: -310.22, z: 352.73,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-105, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:4
      },
    ]},
    {id: "14", name: "Board-14", texture:"", number:3,position:[
      {
        id: "14_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -2606.47, y: -283.85, z: -816.37,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-75, rotationZ:0,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:2
      },
      {
        id: "14_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -2562.38, y: -218.14, z: -626.13,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:-105, rotationZ:0,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:5
      },
      {
        id: "14_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -2688.78, y: -310.22, z: -549.00,
        innerX:0, innerY:0, innerZ:0,
        rotationX:180, rotationY:-45, rotationZ:180,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:4
      },
    ]},
    {id: "15", name: "Board-15", texture:"", number:3,position:[
      {
        id: "15_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -2195.05, y: -283.85, z: -1513.44,
        innerX:0, innerY:0, innerZ:0,
        rotationX:180, rotationY:-60, rotationZ:180,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:3
      },
      {
        id: "15_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -2312.86, y: -218.14, z: -1414.75,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:180, rotationY:0, rotationZ:180,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:4
      },
      {
        id: "15_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -2166.89, y: -310.22, z: -1602.15,
        innerX:0, innerY:0, innerZ:0,
        rotationX:180, rotationY:-90, rotationZ:180,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:2
      },
    ]},
    {id: "16", name: "Board-16", texture:"", number:3,position:[
      {
        id: "16_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -1504.17, y: -283.85, z: -2305.88,
        innerX:0, innerY:0, innerZ:0,
        rotationX:180, rotationY:-60, rotationZ:180,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:0
      },
      {
        id: "16_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -1693.21, y: -218.14, z: -2146.08,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:180, rotationY:0, rotationZ:180,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:1
      },
      {
        id: "16_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -1580.09, y: -310.22, z: -2163.80,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-150, rotationZ:0,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:0
      },
    ]},
    {id: "17", name: "Board-17", texture:"", number:3,position:[
      {
        id: "17_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -632.39, y: -283.85, z: -2695.51,
        innerX:0, innerY:0, innerZ:0,
        rotationX:180, rotationY:-60, rotationZ:180,
        scale:0.8,
        anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:4
      },
      {
        id: "17_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -698.33, y: -218.14, z: -2510.22,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:180, rotationY:0, rotationZ:180,
        scale: 0.19,
        anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:1
      },
      {
        id: "17_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -832.13, y: -310.22, z: -2568.14,
        innerX:0, innerY:0, innerZ:0,
        rotationX:-180, rotationY:0, rotationZ:-180,
        scale: 0.2,
        anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:3
      },
    ]},
  ]

  const camX = click ? 25 : 0
  const camY = click ? 100 : 50
  const camZ = click ? 50 : 400

  const xSpring = useSpring({ to: camX, bounce: 0 })
  const ySpring = useSpring({ to: camY, bounce: 0 })
  const zSpring = useSpring({ to: camZ, bounce: 0 })
  // useEffect(()=>{
  //   console.log(document?.getElementById("hello-button"))
  //   document?.getElementById('hello-button')?.addEventListener("click",()=>{
  //     alert('hello')
  //   })
  // },[mouseOver])
  useLoop(()=>{
    let model = characterRef.current
    model?.moveForward(-1*walking_speed)
  },walking)
  return (
    <>
      <World
       exposure={0.8} 
       defaultLightScale={1.5}
       skybox="sky.jpg"
       logarithmicDepth
      >
        <Plane
          x={233.16} y={-190.27} z={-2872.50}
          width={54} height={18}
          visible={mouseOver}
          texture="plane/38.png"
          onClick={()=>{
            //到下一个场馆
            console.log("Clicked")
          }}
        />
        <Plane
          x={172.63}
          y={-190.27}
          z={-2872.50}
          width={54}
          height={18}
          visible={mouseOver}
          texture="plane/39.png"
          onClick={()=>{
            //到上一个场馆
            console.log("Clicked")
          }}
        />
        <Cube id="intersect_cube" scale={0.5} x={position.x} y={position.y} z={position.z} visible={false}/>
        <Model name="gallery_model" id="gallery_model" src="gallery_model/gallery.glb" scale={gallery_scale} physics="map" 
        >
          <Find name="gallery" 
            onClick={(ev)=>{
              ev.point.y = -234.02
              setPosition(ev.point)
              setWalking(true)
              let model=characterRef.current
              model?.lookAt(ev.point)
            }}
          />
          <Find name="portal"
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
          />
          {
            poster.map((post)=>
            <div key={post.id}>
              <Find 
                name={post.name} 
                texture={post.texture}
                onClick={()=>{
                  setFocus(true)
                  console.log("Clicked")
                }}
              />
              {
                (post.position)?.map((m,index)=>
                  <div key={m.id}>
                    <Model
                      name={m.id}
                      id={m.id}
                      frustumCulled={false}
                      src={m.src}
                      width={m.width}
                      height={m.height}
                      depth={m.depth}
                      x={m.x/gallery_scale}
                      y={(index<post.number)?m.y/gallery_scale:m.y/gallery_scale+60000}
                      z={m.z/gallery_scale}
                      scale={m.scale/gallery_scale}
                      innerX={m.innerX}
                      innerY={m.innerY}
                      innerZ={m.innerZ}
                      rotationX={m.rotationX}
                      rotationY={m.rotationY}
                      rotationZ={m.rotationZ}
                      environmentFactor={1}
                      metalnessFactor={0}
                      roughnessFactor={1}
                      physics="map"
                      boxVisible={false}
                      visible={index<post.number?true:false}
                      animations={{
                        idle: m.anim_idle_src,
                        anim: m.anim_anim_src
                      }}
                      animation="anim"
                      >
                        <Find name="body"
                          texture={"character_model/texture/"+texture_select[m.texture]+".png"}
                        />
                    </Model>
                  </div>
                )
              }
            </div>
            )
          }
        </Model>
        <ThirdPersonCamera
          mouseControl="drag" mouseControlMode="orbit" active
          lockTargetRotation={false}
          innerX={xSpring} innerY={ySpring} innerZ={zSpring}
          zoom={1.0} fov={45} 
          x={89.15} y={-219.04} z={-2509.94}
          width={50} height={50} depth={50}
          rotationX={-113.63} rotationY={-76.11} rotationZ={-114.26} rotation={-114.26}
          minPolarAngle={90} maxPolarAngle={105}
        >
          <Model
            // pbr={true}
            src= {src_select}
            ref={characterRef}
            physics="character"
            scale={0.2}
            animations={{
              idle:idle_select,
              walk:walk_select,
            }}
            //  animation={character_pose.value as any}
            animation={walking? "walk": "idle"}
            x={101.71}
            y={-220.1}
            z={-2510.98}
            width={400}
            height={1200}
            depth={400}
            rotationY={84.34}
            boxVisible={false}
            innerY={-460}
            intersectIds={[
              "intersect_cube",
            ]}
            onIntersect={() => {
              setWalking(false)
            }}                      
          >
            <Find name="body" texture={"character_model/texture/"+texture_select[texture_select_id]+".png"}/>
          </Model>
        </ThirdPersonCamera>
        {/* <LingoEditor /> */}
      </World>
    </>
  )
}

const App = () => {
  const progress = usePreload(
    [
      "gallery_model/gallery.glb",
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
      "character_model/character/doughnu/src.glb",
      "character_model/character/doughnu/walk.glb",
      "character_model/character/doughnu/idle.glb",
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
      "character_model/browse/idle.glb",
      "character_model/browse/src.glb",
      "character_model/camera/src.glb",
      "character_model/camera/idle.glb",
      "character_model/camera/camera.glb",
      "character_model/record/src.glb",
      "character_model/record/idle.glb",
      "character_model/record/record.glb",
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
