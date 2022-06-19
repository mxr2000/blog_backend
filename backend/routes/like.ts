import express, {Request} from "express";
import {ArticleLike} from "../../common/article";
import {ErrorResponse} from "../../common";
import {deleteLike, postLike} from "../dao/likeDao";

const router = express.Router()

router.post("/", async (req: Request<any, any, ArticleLike, any, any>, res) => {
    try {
        await postLike(req.body)
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

router.delete("/", async (req, res) => {
    try {
        const articleLike: ArticleLike = req.body
        await deleteLike(articleLike.articleId, articleLike.email)
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