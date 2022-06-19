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
import {getLikesByArticleId, getUserLikeArticle, getUserLikes} from "../dao/likeDao";
import {queryCommentsByArticleId} from "../dao/commentDao";
import {
    createArticle, getArticleCount,
    getArticleCountByBlockId,
    queryArticle,
    queryArticlesByBlockId,
    queryHomeArticles,
    updateArticle
} from "../dao/articleDao";
import {getAccountDetail} from "../dao/accountDao";
import {getAllBlocks, queryBlock} from "../dao/blockDao";
import {
    getArticleFiles,
    getArticleImages,
    postArticleFiles,
    postArticleImages,
    removeArticleImage
} from "../dao/fileDao";
import {authenticateToken} from "../utils/auth";
import {ArticleImage} from "../../common/file";

router.post("/", async (req, res) => {
    const createdTime = getCurrentTimeStr()
    const data: PostArticleRequest = req.body
    const article: Article = {
        createdTime: createdTime,
        updatedTime: createdTime,
        ...data.article
    }
    const {imageIds, fileIds} = data

    console.log(article)
    try {

        const result = await createArticle(article)
        if (imageIds.length > 0) {
            await postArticleImages(imageIds, result)
        }
        if (fileIds.length > 0) {
            await postArticleFiles(fileIds, result)
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

router.get("/detail/:id", authenticateToken, async (req, res) => {
    const articleId = req.params.id
    try {
        const article = await queryArticle(parseInt(articleId))
        const account = await getAccountDetail(article.email)
        const comments = await queryCommentsByArticleId(parseInt(articleId))
        const images = await getArticleImages(parseInt(articleId))
        const files = await getArticleFiles(parseInt(articleId))
        const userLike = req.email ? await getUserLikeArticle(parseInt(articleId), req.email) : undefined
        console.log("user like " + userLike ?? "no valid token")
        article.username = account.username
        article.images = images
        article.files = files
        const resp: ArticleDetailResponse = {
            email: "",
            time: getCurrentTimeStr(),
            data: {
                article: article,
                comments: comments,
                likeArticle: userLike
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
        const articles = await queryArticlesByBlockId(blockId, pageIndex * pageAmount, pageAmount)
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

router.get("/home/:pageIndex?", async (req, res) => {
    try {
        const pageIndex = parseInt(req.params.pageIndex ?? "0")
        const articles = await queryHomeArticles(pageIndex * pageAmount, pageAmount)
        const blocks = await getAllBlocks()
        const count = await getArticleCount()
        const resp: HomePageResponse = {
            email: "",
            time: getCurrentTimeStr(),
            data: {
                articles: articles,
                blocks: blocks,
                articleCount: count
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

router.delete("/image", authenticateToken, async (req, res) => {
    const data: ArticleImage = req.body
    const resp: ErrorResponse = {
        code: "500",
        msg: "invalid request"
    }
    if (!data.file.id || data.file.email != req.email || !data.file.id) {
        res.status(404).json(resp)
        return
    }
    try {
        await removeArticleImage(data.file.id, data.articleId)
        res.json({
            msg: "ok"
        })
    } catch (e) {
        res.status(404).json(resp)
    }
})


export default router