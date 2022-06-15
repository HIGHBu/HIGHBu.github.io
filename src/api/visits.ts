import { authoredGet, authoredPatch, authoredPost, resMessage } from "./util"

export interface Visits {
    results: {
        eid:{
            visit : boolean,
            comment: boolean,
            favoriteOrShare: boolean,
            comment_text: string,
            emoji: number,
            favoriteOrShareAction: string,
        }[]
    }[]
}
const pathVisits='/api/visits'
export const fetchVisits=async()=>{
    return await authoredGet(pathVisits) as Visits[]
}