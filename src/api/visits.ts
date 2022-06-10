import { authoredGet, authoredPatch, authoredPost, resMessage, unauthoredPost } from "./util"

const pathVisits='/api/visits'
export interface Visits {
    result: {
        eid: string,
        comment: number,
        favorite: number,
        visit : number
    }[]
}