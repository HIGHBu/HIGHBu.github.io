import { authoredGet } from "./util"

export interface Visits {
    visit : boolean,
    comment: boolean,
    favoriteOrShare: boolean,
    emoji: number,
    favoriteOrShareAction: string,
    index: number,
}

const pathFetchVisits='/api/visits'
export const fetchVisits=async()=>{
    return (await authoredGet(pathFetchVisits) as Visits[]).sort((a,b)=>a.index-b.index)
}