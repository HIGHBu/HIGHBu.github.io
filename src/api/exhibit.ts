import { authoredGet } from "./util"

export interface Exhibit {
    id: string,
    title: string,
    subtitle: string,
    author: string,
    avatar: string,
    location: string,
    pics: string[],
    videos: string[],
    created_at: string,
    updated_at: string,
    index: number,
}

const pathFetchExhibits='/api/exhibit'
export const fetchExhibits=async()=>{
    return (await authoredGet(pathFetchExhibits) as Exhibit[]).sort((a,b)=>a.index-b.index)
}