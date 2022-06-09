import express from "express";
import {Account, AccountInfoPageResponse, LogInSuccessResponse, PostAvatarRequest} from "../../common/account";
import {
    createAccount,
    getAccountDetail,
    queryAccount,
    updateAvatar,
    updatePwd,
    updateUsername
} from "../dao/accountDao";
import {queryArticleByEmail, queryArticlesByCommenterEmail} from "../dao/articleDao";
import {queryCommentsByEmail} from "../dao/commentDao";
import {getCurrentTimeStr} from "../utils/time";
import {ErrorResponse} from "../../common";
import {generateAccessToken} from "../utils/auth";

const router = express.Router()

router.post("/logIn", (req, res) => {
    const account: Account = req.body
    queryAccount(account.email, account.pwd ?? "")
        .then(result => {
            const resp: LogInSuccessResponse = {
                email: account.email,
                time: getCurrentTimeStr(),
                data: {
                    account: result,
                    token: generateAccessToken(account.email)
                }
            }
            res.json(resp)
        })
        .catch(err => {
            console.log(err)
            const resp: ErrorResponse = {
                code: "500",
                msg: "internal error"
            }
            res.status(404).json(resp)
        })
})

router.post("/register", (req, res) => {
    const account: Account = req.body
    createAccount(account)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: "error"
            })
        })
})

router.get("/info/:email", async (req, res) => {
    const email = req.params.email
    try {
        const account = await getAccountDetail(email)
        const articles = await queryArticleByEmail(email)
        const comments = await queryCommentsByEmail(email)
        const commentArticles = await queryArticlesByCommenterEmail(email)
        const resp: AccountInfoPageResponse = {
            email: "",
            time: getCurrentTimeStr(),
            data: {
                account: account,
                articles: articles,
                articleComments: commentArticles.map(a => {
                    return {
                        article: a,
                        comments: comments.filter(c => c.articleId == a.id)
                    }
                })
            }
        }
        res.json(resp)
    } catch (e) {
        const resp: ErrorResponse = {
            code: "500",
            msg: "error"
        }
        res.status(500).json(resp)
    }
})

router.put("/", async (req, res) => {
    try {
        const account: Account = req.body
        if (account.username) {
            await updateUsername(account)
        }
        if (account.pwd) {
            await updatePwd(account)
        }
        const resp = {
            msg: "account info updated"
        }
        res.json(resp)
    } catch (e) {
        const resp: ErrorResponse = {
            code: "500",
            msg: "error"
        }
        res.status(500).json(resp)
    }
})

router.post("/avatar", async (req, res) => {
    const data: PostAvatarRequest = req.body
    try {
        await updateAvatar(data.email, data.fileId)
        res.json({
            msg: "ok"
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