import express from "express";
import {
    Article,
    ArticleDetailResponse,
    BlockArticleResponse,
    HomePageResponse,
    pageAmount,
    PostArticleRequest
} from "../../common/article";

const router = express.Router()

import {ErrorResponse} from "../../common";
import {getCurrentTimeStr} from "../utils/time";
import {getLikesByArticleId} from "../dao/likeDao";
import {queryCommentsByArticleId} from "../dao/commentDao";
import {
    createArticle,
    getArticleCountByBlockId,
    queryArticle,
    queryArticleByBlockId,
    queryHomeArticles,
    updateArticle
} from "../dao/articleDao";
import {getAccountDetail} from "../dao/accountDao";
import {getAllBlocks, queryBlock} from "../dao/blockDao";
import {getArticleImages, postArticleImages} from "../dao/fileDao";

router.post("/", async (req, res) => {
    const createdTime = getCurrentTimeStr()
    const data: PostArticleRequest = req.body
    const article: Article = {
        createdTime: createdTime,
        updatedTime: createdTime,
        ...data.article
    }
    const imageIds = data.imageIds
    console.log(article)
    try {
        const result = await createArticle(article)
        if (imageIds.length > 0) {
            await postArticleImages(imageIds, result)
        }
        res.json(result)
    } catch (e) {
        const resp: ErrorResponse = {
            code: "500",
            msg: "error"
        }
        res.status(500).json(resp)
    }
})

router.get("/detail/:id", async (req, res) => {
    const articleId = req.params.id
    try {
        const article = await queryArticle(parseInt(articleId))
        const account = await getAccountDetail(article.email)
        const comments = await queryCommentsByArticleId(parseInt(articleId))
        const likes = await getLikesByArticleId(parseInt(articleId))
        const images = await getArticleImages(parseInt(articleId))
        article.username = account.username
        article.likes = likes
        article.images = images
        const resp: ArticleDetailResponse = {
            email: "",
            time: getCurrentTimeStr(),
            data: {
                article: article,
                comments: comments
            }
        }
        res.json(resp)
    } catch (e) {
        console.log(e)
        const resp: ErrorResponse = {
            code: "500",
            msg: "Fuck u"
        }
        res.status(500).json(resp)
    }
})

router.get("/block/:blockId/:pageIndex", async (req, res) => {
    const blockId = parseInt(req.params.blockId)
    const pageIndex = parseInt(req.params.pageIndex)
    try {
        const articles = await queryArticleByBlockId(blockId, pageIndex * pageAmount, pageAmount)
        const articleCount = await getArticleCountByBlockId(blockId)
        const resp: BlockArticleResponse = {
            email: "",
            time: getCurrentTimeStr(),
            data: {
                blockId: blockId,
                articles: articles,
                articleCount: articleCount
            }
        }
        res.json(resp)
    } catch (e) {
        const resp: ErrorResponse = {
            code: "500",
            msg: "Fuck u"
        }
        res.status(500).json(resp)
    }
})

router.get("/home", async (req, res) => {
    try {
        const articles = await queryHomeArticles()
        const blocks = await getAllBlocks()
        const resp: HomePageResponse = {
            email: "",
            time: getCurrentTimeStr(),
            data: {
                articles: articles,
                blocks: blocks
            }
        }
        res.json(resp)
    } catch (e) {
        console.log(e)
        const resp: ErrorResponse = {
            code: "500",
            msg: "Fuck u"
        }
        res.status(500).json(resp)
    }
})

router.put("/", async (req, res) => {
    try {
        const article: Article = req.body
        await updateArticle(article)
        res.json({
            msg: "success"
        })
    } catch (e) {
        const resp: ErrorResponse = {
            code: "500",
            msg: "Fuck u"
        }
        res.status(500).json(resp)
    }
})


export default router