import {SuccessResponse} from './index'
import {Article} from "./article";
import {Comment} from './comment'


type Account = {
    email: string,
    username?: string,
    pwd?: string,
    avatar?: string
}

type PostAccountRequest = Account

type PostAccountResponse = SuccessResponse<Account>

type AccountInfoPageResponse = SuccessResponse<{
    account: Account,
    articles: Article[],
    articleComments: {
        article: Article,
        comments: Comment[]
    }[]
}>

type LogInSuccessResponse = SuccessResponse<{
    token: string,
    account: Account
}>

type PostAvatarRequest = {
    email: string,
    fileId: number
}

export {
    Account,
    PostAccountRequest,
    PostAccountResponse,
    AccountInfoPageResponse,
    LogInSuccessResponse,
    PostAvatarRequest
}