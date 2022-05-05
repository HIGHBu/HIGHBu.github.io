import { unauthoredPost } from "./util"
export interface authBody {
    username: string,
    password: string
}

const pathSignup='/api/auth/signup'
export interface resSignup {
    message: string
}
export const apiSignup=async(auth:authBody)=>{
    return await unauthoredPost(pathSignup,auth) as resSignup
}

const pathSignin='/api/auth/signin'
export interface resSignin {
    id: string,
    username: string,
    roles: string[],
    accessToken: string
}
export const apiSignin=async(auth:authBody)=>{
    return await unauthoredPost(pathSignin,auth) as resSignin
}

//old
export const apiLogin=()=>Promise.resolve({
    username: '游客23333',
    token: 'it is a token'
})