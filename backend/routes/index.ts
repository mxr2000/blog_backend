import accountRouter from './account'
import articleRouter from './article'
import commentRouter from './comment'
import blockRouter from './block'
import likeRouter from './like'
import fileRouter from './file'
import express from "express";

const router = express.Router()

router.use("/account", accountRouter)
router.use("/article", articleRouter)
router.use("/comment", commentRouter)
router.use("/block", blockRouter)
router.use("/like", likeRouter)
router.use("/file", fileRouter)


export default router