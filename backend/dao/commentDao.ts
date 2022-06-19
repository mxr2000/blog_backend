import connection from "./connection";
import {Comment} from "../../common/comment";
import {getCurrentTimeStr} from "../utils/time";

type CommentRaw = {
    id: number,
    articleId: number,
    content: string,
    email: string,
    username: string,
    createdTime: string
}

const getCommentFromRaw = (raw: CommentRaw): Comment => {
    const {id, articleId, content, email, username, createdTime} = raw
    return {
        id: id,
        articleId: articleId,
        content: content,
        account: {
            email: email,
            username: username
        },
        createdTime: createdTime
    }
}


const queryCommentsByArticleId = async (articleId: number): Promise<Comment[]> => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT id,
                   articleId,
                   content,
                   t_account.email                                       AS email,
                   username,
                   createdTime,
                   CONCAT('avatar_', t_account.email, '.', avatarFormat) AS avatar
            FROM t_comment,
                 blog.t_account
            WHERE articleId = ?
              AND t_comment.email = t_account.email`
        connection.query(sql, [articleId], (err, result: CommentRaw[], fields) => {
            if (err != null) {
                reject(err)
            } else {
                resolve(result.map(raw => getCommentFromRaw(raw)))
            }
        })
    })
}

const queryCommentsByEmail = async (email: string): Promise<Comment[]> => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT id, articleId, content, t_account.email AS email, username, createdTime
            FROM t_comment,
                 blog.t_account
            WHERE t_comment.email = ?
              AND t_comment.email = t_account.email`
        connection.query(sql, [email], (err, result: CommentRaw[], fields) => {
            if (err != null) {
                reject(err)
            } else {
                resolve(result.map(raw => getCommentFromRaw(raw)))
            }
        })
    })
}

const createComment = async (comment: Comment): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO t_comment (articleId, email, content, createdTime)
                     VALUES (?, ?, ?, ?)`
        connection.query(sql, [comment.articleId, comment.account.email, comment.content, getCurrentTimeStr()], (err, result) => {
            if (err != null) {
                console.log(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export {queryCommentsByArticleId, queryCommentsByEmail, createComment}