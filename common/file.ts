import {SuccessResponse} from "./index";

type UserFile = {
    id?: number
    name: string,
    email: string
    createdTime?: string
}

type ArticleImage = {
    articleId: number,
    file: UserFile
}

type PostFileResponse = SuccessResponse<{
    fileId: number
}>

export {ArticleImage, UserFile, PostFileResponse}