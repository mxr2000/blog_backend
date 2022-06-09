import {SuccessResponse} from './index'
import {Account} from "./account";


type Comment = {
    id?: number
    account: Account,
    articleId: number,
    content: string,
    createdTime?: string
}



type PostCommentResponse = SuccessResponse<Comment>

export {Comment, PostCommentResponse}