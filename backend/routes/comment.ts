import express, {Request} from "express";
import {Comment} from "../../common/comment";
import {createComment, queryCommentsByArticleId, queryCommentsByEmail} from "../dao/commentDao";
import {ErrorResponse} from "../../common";

const router = express.Router()

router.post("/", async (req: Request<any, any, Comment, any, any>, res) => {
    try {
        await createComment(req.body)
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