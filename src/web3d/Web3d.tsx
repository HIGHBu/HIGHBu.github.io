import {LingoEditor, Plane, Cube,  Find, Keyboard, Model, ThirdPersonCamera, types, usePreload, World, useLoop, Sprite, Camera } from 'lingo3d-react'
import {useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import * as exhibit from '../api/exhibit'
import loading from '../assets/loading.png'
import { SkinList } from '../glob';
import { RootState, store } from '../store/store';

var pos_tex: { texture: string; }[];

const Game=() => {
  const characterRef = useRef<types.Model>(null)
  const cameraRef = useRef<types.ThirdPersonCamera>(null)
  const FocusRef = useRef<types.Camera>(null)
  const walking_speed = 20
  const [walking, setWalking] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0,z:0})
  const [mouseOver, setMouseOver] = useState(false)
  const [focus, setFocus] = useState(-1) // focus为-1代表正常视角，0代表看portal，1-17代表看展位
  //const [refresh, setRefresh] = useState(false);
  const [gallery_select_id, setGallery_Select_Id] = useState(0)  
  // var gallery_select_id = 0   
  const [head_id,cloth_id] = useSelector<RootState,number[]>(state=>state.userSlice.profile.clothes)
  const [src_select,setsrc] = useState("character_model/character/basic/src.glb")
  const [walk_select,setwalk] = useState("character_model/character/basic/walk.glb")
  const [idle_select,setidle] = useState("character_model/character/basic/idle.glb")
  const [detail_texture_select,settexture] = useState("character_model/texture/original.png")
  const gallery_scale = 6.40
  useEffect(()=>{
    setsrc("character_model/character/"+SkinList.head[head_id].id+"/src.glb");
    setwalk("character_model/character/"+SkinList.head[head_id].id+"/walk.glb");
    setidle("character_model/character/"+SkinList.head[head_id].id+"/idle.glb");
    settexture("character_model/texture/"+SkinList.cloth[cloth_id].id+".png");
    console.log('skin')
    console.log(head_id,cloth_id)
  },[head_id,cloth_id])
  // const gallery_select = "plane/" + gallery_select_id == 1 ? "reality.png":"communication.png"
/*   useEffect(() => {
      refresh && setTimeout(() => setRefresh(false))
  }, [refresh])
  const doRefresh = () => setRefresh(true) */
  //后端修改该数组，获得17个texture和要出现的人物模型的数量
  const poster = [
    {id: "1", name: "Board-1", number:2,position:[
      {
        id: "1_1",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 1006.80, y: -310.22, z: -2404.1,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:135, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:0,
        img:"bubble/comment.png",
      },
      {
        id: "1_2",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 991.22, y: -283.85, z: -2489.4,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:2,
        img:"bubble/comment.png",
      },
      {
        id: "1_3",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 1199.01, y: -218.14, z: -2357.29,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:180, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:3,
        img:"bubble/comment.png",
      },
    ]},
    {id: "2", name: "Board-2", number:3,position:[
      {
        id: "2_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 2052.33, y: -283.85, z: -1864.16,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:180, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:1,
        img:"bubble/comment.png",
      },
      {
        id: "2_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 1783.26, y: -218.14, z: -2064.66,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:0,
        img:"bubble/comment.png",
      },
      {
        id: "2_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 1855.47, y: -310.22, z: -1917.36,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:135, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:4,
        img:"bubble/comment.png",
      },
    ]},
    {id: "3", name: "Board-3", number:3,position:[
      {
        id: "3_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 2537.28, y: -283.85, z: -1107.43,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:180, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:5,
        img:"bubble/comment.png",
      },
      {
        id: "3_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 2396.34, y: -218.14, z: -1181.44,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:135, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:4,
        img:"bubble/comment.png",
      },
      {
        id: "3_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 2418.21, y: -310.22, z: -1302.96,
        innerX:0, innerY:0, innerZ:0,
        rotationX:-180, rotationY:90, rotationZ:-180,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:5,
        img:"bubble/comment.png",
      },
    ]},
    {id: "4", name: "Board-4", number:3,position:[
      {
        id: "4_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 2623.84, y: -283.85, z: -337.22,
        innerX:0, innerY:0, innerZ:0,
        rotationX:-180, rotationY:135, rotationZ:-180,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:2,
        img:"bubble/comment.png",
      },
      {
        id: "4_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 2696.61, y: -218.14, z: -111.56,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:135, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:3,
        img:"bubble/comment.png",
      },
      {
        id: "4_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 2585.99, y: -310.22, z: -224.14,
        innerX:0, innerY:0, innerZ:0,
        rotationX:-180, rotationY:90, rotationZ:-180,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:1,
        img:"bubble/comment.png",
      },
    ]},
    {id: "5", name: "Board-5", number:3,position:[
      {
        id: "5_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 2589.27, y: -283.85, z: 815.74,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:135, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:5,
        img:"bubble/comment.png",
      },
      {
        id: "5_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 2676.34, y: -218.14, z: 545.39,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:-180, rotationY:135, rotationZ:-180,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:4,
        img:"bubble/comment.png",
      },
      {
        id: "5_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 2585.99, y: -310.22, z: 668.03,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:2,
        img:"bubble/comment.png",
      },
    ]},
    {id: "6", name: "Board-6", number:3,position:[
      {
        id: "6_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 2230.97, y: -283.85, z: 1508.42,
        innerX:0, innerY:0, innerZ:0,
        rotationX:-180, rotationY:90, rotationZ:-180,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:3,
        img:"bubble/comment.png",
      },
      {
        id: "6_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 2176.44, y: -218.14, z: 1626.32,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:2,
        img:"",
      },
      {
        id: "6_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 2309.97, y: -310.22, z: 1417.79,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:1,
        img:"",
      },
    ]},
    {id: "7", name: "Board-7", number:3,position:[
      {
        id: "7_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 1678.19, y: -283.85, z: 2213.00,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:5,
        img:"",
      },
      {
        id: "7_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 1586.44, y: -218.14, z: 2198.14,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:45, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:4,
        img:"",
      },
      {
        id: "7_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 1545.30, y: -310.22, z: 2310.89,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:5,
        img:"",
      },
    ]},
    {id: "8", name: "Board-8", number:3,position:[
      {
        id: "8_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: 659.05, y: -283.85, z: 2706.40,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:90, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:2,
        img:"",
      },
      {
        id: "8_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: 757.93, y: -218.14, z: 2565.60,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:45, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:1,
        img:"",
      },
      {
        id: "8_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: 865.23, y: -310.22, z: 2594.80,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:3,
        img:"",
      },
    ]},
    {id: "9", name: "Board-9", number:3,position:[
      {
        id: "9_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -234.71, y: -283.85, z: 2691.64,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:0,
        img:"",
      },
      {
        id: "9_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -319.52, y: -218.14, z: 2726.26,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:45, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:2,
        img:"",
      },
      {
        id: "9_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -89.51, y: -310.22, z: 2707.43,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-45, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:1,
        img:"",
      },
    ]},
    {id: "10", name: "Board-10", number:3,position:[
      {
        id: "10_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -1302.03, y: -283.85, z: 2504.34,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:4,
        img:"",
      },
      {
        id: "10_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -1054.06, y: -218.14, z: 2559.09,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:-60, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:5,
        img:"",
      },
      {
        id: "10_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -1121.68, y: -310.22, z: 2482.34,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-15, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:0,
        img:"",
      },
    ]},
    {id: "11", name: "Board-11", number:3,position:[
      {
        id: "11_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -2005.61, y: -283.85, z: 1899.72,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:0, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:3,
        img:"",
      },
      {
        id: "11_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -1865.94, y: -218.14, z: 1976.67,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:-60, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:2,
        img:"",
      },
      {
        id: "11_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -1846.32, y: -310.22, z: 2088.68,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-90, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:4,
        img:"",
      },
    ]},
    {id: "12", name: "Board-12", number:3,position:[
      {
        id: "12_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -2474.61, y: -283.85, z: 1248.72,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-75, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:5,
        img:"",
      },
      {
        id: "12_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -2540.47, y: -218.14, z: 1108.40,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:-30, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:0,
        img:"",
      },
      {
        id: "12_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -2454.38, y: -310.22, z: 1158.03,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-60, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:1,
        img:"",
      },
    ]},
    {id: "13", name: "Board-13", number:3,position:[
      {
        id: "13_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -2680.95, y: -283.85, z: 211.19,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-75, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:0,
        img:"",
      },
      {
        id: "13_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -2737.63, y: -218.14, z: 156.48,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:-30, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:3,
        img:"",
      },
      {
        id: "13_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -2712.79, y: -310.22, z: 352.73,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-105, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:4,
        img:"",
      },
    ]},
    {id: "14", name: "Board-14", number:3,position:[
      {
        id: "14_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -2606.47, y: -283.85, z: -816.37,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-75, rotationZ:0,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:2,
        img:"",
      },
      {
        id: "14_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -2562.38, y: -218.14, z: -626.13,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:0, rotationY:-105, rotationZ:0,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:5,
        img:"",
      },
      {
        id: "14_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -2688.78, y: -310.22, z: -549.00,
        innerX:0, innerY:0, innerZ:0,
        rotationX:180, rotationY:-45, rotationZ:180,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:4,
        img:"",
      },
    ]},
    {id: "15", name: "Board-15", number:3,position:[
      {
        id: "15_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -2195.05, y: -283.85, z: -1513.44,
        innerX:0, innerY:0, innerZ:0,
        rotationX:180, rotationY:-60, rotationZ:180,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:3,
        img:"",
      },
      {
        id: "15_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -2312.86, y: -218.14, z: -1414.75,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:180, rotationY:0, rotationZ:180,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:4,
        img:"",
      },
      {
        id: "15_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -2166.89, y: -310.22, z: -1602.15,
        innerX:0, innerY:0, innerZ:0,
        rotationX:180, rotationY:-90, rotationZ:180,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:2,
        img:"",
      },
    ]},
    {id: "16", name: "Board-16", number:3,position:[
      {
        id: "16_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -1504.17, y: -283.85, z: -2305.88,
        innerX:0, innerY:0, innerZ:0,
        rotationX:180, rotationY:-60, rotationZ:180,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:0,
        img:"",
      },
      {
        id: "16_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -1693.21, y: -218.14, z: -2146.08,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:180, rotationY:0, rotationZ:180,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:1,
        img:"",
      },
      {
        id: "16_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -1580.09, y: -310.22, z: -2163.80,
        innerX:0, innerY:0, innerZ:0,
        rotationX:0, rotationY:-150, rotationZ:0,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:0,
        img:"",
      },
    ]},
    {id: "17", name: "Board-17", number:3,position:[
      {
        id: "17_1",
        src:"character_model/record/src.glb",
        width: 91.05, height: 250, depth: 140.73,
        x: -632.39, y: -283.85, z: -2695.51,
        innerX:0, innerY:0, innerZ:0,
        rotationX:180, rotationY:-60, rotationZ:180,
        scale:0.8,
        // anim_idle_src: "character_model/record/idle.glb",
        anim_anim_src: "character_model/record/record.glb",
        texture:4,
        img:"",
      },
      {
        id: "17_2",
        src:"character_model/browse/src.glb",
        width: 650, height: 1100, depth: 400.73,
        x: -698.33, y: -218.14, z: -2510.22,
        innerX:0, innerY:-500, innerZ:0,
        rotationX:180, rotationY:0, rotationZ:180,
        scale: 0.19,
        // anim_idle_src: "character_model/browse/idle.glb",
        anim_anim_src: "character_model/browse/browse.glb",
        texture:1,
        img:"",
      },
      {
        id: "17_3",
        src:"character_model/camera/src.glb",
        width: 550, height: 1100, depth: 400.73,
        x: -832.13, y: -310.22, z: -2568.14,
        innerX:0, innerY:0, innerZ:0,
        rotationX:-180, rotationY:0, rotationZ:-180,
        scale: 0.2,
        // anim_idle_src: "character_model/camera/idle.glb",
        anim_anim_src: "character_model/camera/camera.glb",
        texture:3,
        img:"",
      },
    ]},
  ]

  const camera_target = [
    {x:  204.12, y: -207.42, z: -2977.87, rotationX: 0, rotationY: 0,   rotationZ: 0}, //portal
    {x: 1212.35, y: -128.33, z: -2684.49, rotationX: 0, rotationY: -25, rotationZ: 0}, //board-1 standard
    {x: 2057.89, y: -128.33, z: -2108.94, rotationX: 0, rotationY: -45, rotationZ: 0}, //board-2 done
    {x: 2654.95, y: -128.33, z: -1277.26, rotationX: 0, rotationY: -65, rotationZ: 0}, //board-3 done
    {x: 2931.78, y: -128.33, z:  -292.99, rotationX: 0, rotationY: -85, rotationZ: 0}, //board-4 done
    {x: 2855.44, y: -128.33, z:   726.45, rotationX: 0, rotationY:-105, rotationZ: 0}, //board-5 done
    {x: 2434.94, y: -128.33, z:  1660.04, rotationX: 0, rotationY:-125, rotationZ: 0}, //board-6 done
    {x: 1721.72, y: -128.33, z:  2388.31, rotationX: 0, rotationY:-145, rotationZ: 0}, //board-7 done
    {x:  799.91, y: -128.33, z:  2835.62, rotationX: 0, rotationY:-165, rotationZ: 0}, //board-8 done
    {x: -219.62, y: -128.33, z:  2941.78, rotationX: 0, rotationY:175,  rotationZ: 0}, //board-9 done
    {x: -1210.32,y: -128.33, z:  2686.04, rotationX: 0, rotationY:155,  rotationZ: 0}, //board-10 done
    {x: -2057.83,y: -128.33, z:  2109.23, rotationX: 0, rotationY:135,  rotationZ: 0}, //board-11 done
    {x: -2652.68,y: -128.33, z:  1276.51, rotationX: 0, rotationY:115,  rotationZ: 0}, //board-12 done
    {x: -2930.81,y: -128.33, z:   294.81, rotationX: 0, rotationY: 95,  rotationZ: 0}, //board-13 done
    {x: -2857.20,y: -128.33, z:  -726.53, rotationX: 0, rotationY: 75,  rotationZ: 0}, //board-14 done
    {x: -2435.07,y: -128.33, z: -1662.77, rotationX: 0, rotationY: 55,  rotationZ: 0}, //board-15 done
    {x: -1721.01,y: -128.33, z: -2394.99, rotationX: 0, rotationY: 35,  rotationZ: 0}, //board-16 done
    {x: -796.75, y: -128.33, z: -2837.18, rotationX: 0, rotationY: 15,  rotationZ: 0}, //board-17 done

  ]

  const back_boards = [
    {id: 1,x: 162.57,z: -419.37},
    {id: 2,x: 297.44,z: -338.79},
    {id: 3,x: 394.80,z: -216.22},
    {id: 4,x: 445.28,z: -68.18},
    {id: 5,x: 441.93,z: 88.52},
    {id: 6,x: 385.11,z: 234.35},
    {id: 7,x: 283.71,z: 350.20},
    {id: 8,x: 143.10,z: 427.25},
    {id: 9,x: -10.24,z: 450.59},
    {id: 10,x: -165.22,z: 419.13},
    {id: 11,x: -295.54,z: 339.92},
    {id: 12,x: -394.72,z: 217.43},
    {id: 13,x: -445.33,z: 68.04},
    {id: 14,x: -442.09,z: -88.37},
    {id: 15,x: -385.58,z: -233.24},
    {id: 16,x: -277.96,z: -347.01},
    {id: 17,x: -144.60,z: -426.43}
  ]

  const camX = 0
  const camY = 50
  const camZ = 400

  useLoop(()=>{
    let model = characterRef.current
    model?.moveForward(-1*walking_speed)
    // console.log(FocusRef.current?.x,FocusRef.current?.y,FocusRef.current?.z)
  },walking)
  // useLoop(()=>{
  //   console.log("gallery select:",gallery_select)
  // })
  return (
    <div style={{width: '100%',height:'100%',position:'absolute',left:0,top:0,justifyContent:'center',alignItems:'center',color:'white',zIndex: 0}}>
      <World
       position='relative'
       skybox="sky.jpg"
      >
        <Plane
          x={201.63} y={-199.47} z={-2872.50}
          width={54} height={18}
          visible={focus == 0 && mouseOver}
          texture={gallery_select_id==1?"plane/communication.png":"plane/reality.png"}
          onClick={()=>{
            setGallery_Select_Id(1-gallery_select_id)
            setFocus(-1)
          }}
        />

        <Cube id="intersect_cube" scale={0.5} x={position.x} y={position.y} z={position.z} visible={false}/>
        <Model name="gallery_model" id="gallery_model" src="gallery_model/test4.glb" scale={gallery_scale} physics="map"
        >
          <Find name="gallery" 
            onClick={(ev)=>{
              console.log(ev.distance)
              if(ev.distance>=600){
                ev.point.y = -234.02
                setPosition(ev.point)
                setWalking(true)
                let model=characterRef.current
                model?.lookAt(ev.point)  
              }
            }}
          />
          <Find name="portal"
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
            onClick={() => {
              setFocus(0)
            }}
          />
          {
            back_boards.map((board,index)=>
              <Sprite
                key={board.id}
                name={board.id.toString()}
                x={board.x}
                y={-33.04}
                z={board.z}
                width={1.5} height={1.5}
                visible={focus == index+1}
                texture="plane/back.png"
                onClick={()=>{
                  setFocus(-1)
                }}
              />
            )
          }
          {
            poster.map((post,index)=>
            <div key={post.id}>
              <Find 
                name={post.name} 
                texture={pos_tex[gallery_select_id*17+index]?.texture}
                onClick={()=>{
                  setFocus(index+1)
                  setWalking(false)
                }}
              />
            </div>
            )
          }
        </Model>
        {
          poster.map((post)=>
          <div key={post.id}>
            {
              (post.position)?.map((m,index)=>{
                if (index<post.number){
                  return (
                  <div key={m.id}>
                    <Model
                      name={m.id}
                      id={m.id}
                      frustumCulled={false}
                      src={m.src}
                      width={m.width}
                      height={m.height}
                      depth={m.depth}
                      x={m.x}
                      y={m.y}
                      z={m.z}
                      scale={m.scale}
                      innerX={m.innerX}
                      innerY={m.innerY}
                      innerZ={m.innerZ}
                      rotationX={m.rotationX}
                      rotationY={m.rotationY}
                      rotationZ={m.rotationZ}
                      physics={false}
                      visible={true}
                      animations={{
                        anim: m.anim_anim_src
                      }}
                      animation="anim"
                    >
                      {(m.img != "" && 
                        ((
                          m.src == "character_model/camera/src.glb" &&
                          <Sprite id={m.id} texture={m.img} width={27.3/m.scale} height={19.05/m.scale} y={792.29} />
                        ) || 
                        (
                          m.src == "character_model/record/src.glb" &&
                          <Sprite id={m.id} texture={m.img} width={27.3/m.scale} height={19.05/m.scale} y={166.16}/>
                        ) || 
                        (
                          m.src == "character_model/browse/src.glb" &&
                          <Sprite id={m.id} texture={m.img} width={27.3/m.scale} height={19.05/m.scale} y={270.59}/>
                        ))
                      )}
                    </Model>
                  </div>
                  )                  
                }
              }
              )
            }
            </div>
            )
          }
        <Camera 
          name="FocusCamera"
          ref={FocusRef}
          active={focus != -1 ? "transition" : false}
          mouseControl={false}
          x={focus != -1 ? camera_target[focus].x : cameraRef.current?.x}
          y={focus != -1 ? camera_target[focus].y : cameraRef.current?.y}
          z={focus != -1 ? camera_target[focus].z : cameraRef.current?.z}
          rotationX={focus != -1 ? camera_target[focus].rotationX : cameraRef.current?.rotationX}
          rotationY={focus != -1 ? camera_target[focus].rotationY : cameraRef.current?.rotationY}
          rotationZ={focus != -1 ? camera_target[focus].rotationZ : cameraRef.current?.rotationZ}
          innerRotationX={focus != -1 ? 0 : cameraRef.current?.innerRotationX}
          innerRotationY={focus != -1 ? 0 : cameraRef.current?.innerRotationY}
          innerRotationZ={focus != -1 ? 0 : cameraRef.current?.innerRotationZ}
          innerX={focus != -1 ? 0 : cameraRef.current?.innerX}
          innerY={focus != -1 ? 0 : cameraRef.current?.innerY}
          innerZ={focus != -1 ? 200 : cameraRef.current?.innerZ}
        />
        <ThirdPersonCamera
          name="CharacterCamera"
          mouseControl="drag" mouseControlMode="orbit" 
          active={focus == -1 ? true : false}
          lockTargetRotation={false}
          innerX={camX} innerY={camY} innerZ={camZ}
          zoom={1.0} fov={45} 
          width={50} height={50} depth={50}
          minPolarAngle={90} maxPolarAngle={105}
          ref={cameraRef}
        >
          <Model
            src= {src_select}
            ref={characterRef}
            physics="character"
            scale={0.2}
            animations={{
              idle:idle_select,
              walk:walk_select,
            }}
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
            <Find name="body" texture={detail_texture_select}/>
          </Model>
        </ThirdPersonCamera>

        <Keyboard
         onKeyPress={key => {
           if (key === "Escape"){
             if(focus != -1){
              setFocus(-1)
             }
           }
         }}
         onKeyUp={key => {
           
         }}
        />
        {/* <LingoEditor /> */}
      </World>
    </div>
  )
}

const App = (props:{progress:number}) => {
  const [done,setdone]=useState(false)
  useEffect(()=>{
    exhibit.fetchExhibits().then(res=>{
      pos_tex=res.map(item=>({
        texture: item.avatar
      }))
      setdone(true)
    })
  },[])
  if(props.progress<100 || !done)
    return (<img height={"100%"} width={"100%"} src={loading}></img>)
  else
  return (
    <Game />
  )
}

export default App
