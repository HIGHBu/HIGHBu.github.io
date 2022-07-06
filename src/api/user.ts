import { Action } from "./action"
import { authoredGet, authoredPatch, authoredPost, resMessage, unauthoredPost } from "./util"
export interface authBody {
    username: string,
    password: string
}

const pathSignup='/api/auth/signup'
export const apiSignup=async(auth:authBody)=>{
    const mes=await unauthoredPost(pathSignup,auth) as resMessage
    if(mes.message==="User was registered successfully!")
        return 'ok';
    if(mes.message==="Failed! Username is already in use!")
        return 'conflict';
    return 'unknown';
}

const pathSignin='/api/auth/signin'
export interface resSignin {
    id: string,
    username: string,
    roles: string[],
    accessToken: string
}
export const apiSignin=async(auth:authBody)=>{
    const mes=await unauthoredPost(pathSignin,auth)
    if(mes.message==="User Not found.")
        return 'notfound'
    if(mes.message==="Invalid Password!")
        return 'invalid';
    if(mes.accessToken)
        return mes as resSignin;
    return 'unknown';
}

const pathUser='/api/user/'
export interface userProfile {
    avatar:   string;
    clothes:  number[];
    nickname: string;
    password: string;
    username: string;
    history?: Action[];
}
export const apiFetchProfile=async(uid:string)=>{
    return await authoredGet(pathUser+uid) as userProfile
}
export const apiModifyProfile=async(uid:string,profile:userProfile)=>{
    const mes=await authoredPatch(pathUser+uid,profile) as resMessage
    if(mes.message==="User was update successfully!")
        return 'ok';
    return 'unknown';
}