import { unauthoredPost } from "./config"

const pathSignup='/api/auth/signup'
export const apiSignup=async(username:string)=>{
    return await unauthoredPost(pathSignup,{
        username
    })
}

const pathSignin='/api/auth/signin'
export const apiSignin=async(username:string)=>{
    return await unauthoredPost(pathSignin,{
        username
    })
}

export const apiLogin=()=>Promise.resolve({
    username: '游客23333',
    token: 'it is a token'
})