const baseUrl='http://40.81.21.206:8083'

export interface resMessage {
    message: string
}

export async function unauthoredPost(path: string,body: any){
    return await fetch(baseUrl+path,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((res)=>res.json())
}

export async function authoredGet(path: string){
    const { store } = await import('../store/store')
    const token=store.getState().userSlice.token
    if(token==='')
        throw 'Login First'
    return await fetch(baseUrl+path,{
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    }).then((res)=>res.json())
}