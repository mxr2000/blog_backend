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

type ArticleFile = {
    articleId: number,
    file: UserFile
}

type PostFileResponse = SuccessResponse<{
    fileId: number
}>

type PostMultipleFileResponse = SuccessResponse<{
    files: {
        id: number,
        name: string
    }[]
}>

export {ArticleImage, ArticleFile, UserFile, PostFileResponse, PostMultipleFileResponse}