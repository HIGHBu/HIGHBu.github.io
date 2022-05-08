import { authoredGet, authoredPost, resMessage } from "./util"

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
export const fetchCommentsByEid=async(eid: string):Promise<Action[]>=>{
    const res=await authoredGet(pathFetchExhibits+eid+'?action=comment') as Action[] | resMessage
    if(res instanceof Array)
        return res
    else
        return []
}

export interface actionSubmission {
    eid: string,
    comment_text: string
}
export const submitComment=async({
    eid,
    comment_text
}:actionSubmission):Promise<boolean>=>{
    await authoredPost(pathFetchExhibits,{
        action: 'comment',
        uid: (await import('../store/store')).store.getState().userSlice.uid,
        eid,
        emoji: null,
        comment_text,
        comment_likes: 0
    })
    return true
}