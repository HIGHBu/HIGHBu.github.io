import { authoredGet, resMessage } from "./util"

export interface Action {
    id: string,
    action: string,
    uid: string,
    eid: string,
    emoji: number | null,
    comment_text: string,
    comment_likes: number,
    created_at: string,
    updated_at: string
}

const pathFetchExhibits='/api/action/'
export const fetchActionsByEid=async(eid: string):Promise<Action[]>=>{
    const res=await authoredGet(pathFetchExhibits+eid) as Action[] | resMessage
    if(res instanceof Array)
        return res
    else
        return []
}