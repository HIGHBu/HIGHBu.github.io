import { authoredGet, authoredPatch, authoredPost, resMessage } from "./util"

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
    const res=await authoredGet(pathFetchExhibits+eid+'?action=comment')
    if(res.actions)
        return res.actions
    else
        return []
}
export const fetchFavorite=async(uid: string):Promise<string[]>=>{
    const res=await authoredGet(pathFetchExhibits+uid+'?action=favorite')
    if(res.favorited instanceof Array<string>)
        return res.favorited
    else
        return []
}
export interface actionSubmission {
    eid: string,
    comment_text: string,
    emoji: number | null
}
export const submitComment=async({
    eid,
    comment_text,
    emoji
}:actionSubmission):Promise<boolean>=>{
    await authoredPost(pathFetchExhibits,{
        action: 'comment',
        uid: (await import('../store/store')).store.getState().userSlice.uid,
        eid,
        emoji,
        comment_text,
        comment_likes: 0
    })
    return true
}

export const likeExhibit=async({
    eid
}:{eid:string}):Promise<boolean>=>{
    await authoredPost(pathFetchExhibits,{
        action: 'favorite',
        uid: (await import('../store/store')).store.getState().userSlice.uid,
        eid
    })
    return true
}

export const visitExhibit=async({
    eid
}:{eid:string}):Promise<boolean>=>{
    await authoredPost(pathFetchExhibits,{
        action: 'visit',
        uid: (await import('../store/store')).store.getState().userSlice.uid,
        eid
    })
    return true
}

export const shareExhibit=async({
    eid
}:{eid:string}):Promise<boolean>=>{
    await authoredPost(pathFetchExhibits,{
        action: 'share',
        uid: (await import('../store/store')).store.getState().userSlice.uid,
        eid
    })
    return true
}

export const likeComment=async(cid:string):Promise<boolean>=>{
    const res=await authoredPost(pathFetchExhibits,{
        action: 'like',
        cid
    })
    return true
}
export interface like_count {
    likes: number;
    liked: boolean;
}
export const updateLike=async(cid:string)=>{
    const res=await authoredGet(pathFetchExhibits+cid+'?action=like')
    console.log(res)
    return res as like_count
}