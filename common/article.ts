import {SuccessResponse} from './index'
import {Comment} from "./comment";
import {Block} from "./block";
import {ArticleFile, ArticleImage} from "./file";

type Article = {
    id?: number

    email: string
    username?: string
    avatar?: string

    blockId: number
    blockName?: string

    header: string
    content?: string
    likes?: ArticleLike[]
    createdTime?: string
    updatedTime?: string

    positiveLikesCount?: number
    negativeLikesCount?: number

    images?: ArticleImage[]
    files?: ArticleFile[]
}

type ArticleLike = {
    articleId: number
    email: string
    time?: string
    positive: boolean
}

const pageAmount = 10

type PostArticleRequest = {
    article: Article,
    imageIds: number[],
    fileIds: number[]
}

type PostArticleResponse = SuccessResponse<Article>

type ArticleDetailResponse = SuccessResponse<{
    article: Article
    comments: Comment[]
    likeArticle?: boolean
}>

type BlockArticleResponse = SuccessResponse<{
    blockId: number,
    articles: Article[],
    articleCount: number
}>

type HomePageResponse = SuccessResponse<{
    articles: Article[],
    blocks: Block[],
    articleCount: number
}>

export {Article, ArticleLike, PostArticleRequest, PostArticleResponse, ArticleDetailResponse, BlockArticleResponse, HomePageResponse, pageAmount}




