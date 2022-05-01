import { store } from '../store'

const baseUrl='http://40.81.21.206:8083'

export async function unauthoredPost(path: string,body: any){
    return await fetch(baseUrl+path,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((res)=>res.json())
}