import connection from "./connection";
import {Article, pageAmount} from "../../common/article";
import {getCurrentTimeStr} from "../utils/time";


const queryArticle = async (id: number): Promise<Article> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT t_article.id                                          AS id,
                            t_article.email                                       AS email,
                            blockId,
                            t_block.name                                          AS blockName,
                            CONCAT('avatar_', t_account.email, '.', avatarFormat) AS avatar,
                            header,
                            content,
                            createdTime,
                            updatedTime,
                            (SELECT COUNT(*)
                             FROM blog.t_like
                             WHERE t_like.articleId = t_article.id
                               AND positive = 1)                                  AS positiveLikesCount,
                            (SELECT COUNT(*)
                             FROM blog.t_like
                             WHERE t_like.articleId = t_article.id
                               AND positive = 0)                                  AS negativeLikesCount
                     FROM t_article,
                          t_block,
                          t_account
                     WHERE t_article.id = ?
                       AND t_article.blockId = t_block.id
                       AND t_article.email = t_account.email`

        connection.query(sql, [id], (err, result: Article[], fields) => {
            if (err != null) {
                reject(err)
            } else if (result.length != 1) {
                reject("error")
            } else {
                resolve(result[0])
            }
        })
    })
}

const queryArticleByEmail = async (email: string): Promise<Article[]> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT t_article.id    AS id,
                            t_article.email AS email,
                            createdTime,
                            header,
                            blockId,
                            t_block.name    AS blockName
                     FROM t_article,
                          t_block,
                          t_account
                     WHERE t_article.email = ?
                       AND t_article.email = t_account.email
                       AND t_block.id = t_article.blockId`
        connection.query(sql, [email], (err, result: Article[], fields) => {
            if (err != null) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const queryArticlesByCommenterEmail = async (email: string): Promise<Article[]> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT t_article.id          AS id,
                                     t_article.email       AS email,
                                     t_article.blockId     AS blockId,
                                     t_block.name          AS blockName,
                                     header,
                                     t_article.createdTime AS createdTime,
                                     t_article.updatedTime AS updatedTime
                     FROM t_article,
                          t_block,
                          t_comment
                     WHERE t_block.id = t_article.blockId
                       AND t_comment.articleId = t_article.id
                       AND t_comment.email = ?`
        connection.query(sql, [email], (err, result: Article[], fields) => {
            if (err != null) {
                console.log(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const queryArticlesByBlockId = async (id: number, from: number, limit: number): Promise<Article[]> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT t_article.id                                          AS id,
                            t_account.email                                       AS email,
                            t_account.username                                    AS username,
                            CONCAT('avatar_', t_account.email, '.', avatarFormat) AS avatar,
                            blockId,
                            t_block.name                                          AS blockName,
                            header,
                            createdTime,
                            updatedTime,
                            (SELECT COUNT(*)
                             FROM blog.t_like
                             WHERE t_like.articleId = t_article.id
                               AND positive = 1)                                  AS positiveLikesCount,
                            (SELECT COUNT(*)
                             FROM blog.t_like
                             WHERE t_like.articleId = t_article.id
                               AND positive = 0)                                  AS negativeLikesCount
                     FROM t_article,
                          t_block,
                          t_account
                     WHERE t_article.blockId = t_block.id
                       AND blockId = ?
                       AND t_article.email = t_account.email
                     ORDER BY t_article.id DESC
                     LIMIT ?, ?`
        connection.query(sql, [id, from, limit], (err, result: Article[]) => {
            if (err != null) {
                console.log(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const getArticleCountByBlockId = (id: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        const sql = `SELECT COUNT(*) AS cnt
                     FROM blog.t_article
                     WHERE blockId = ?`
        connection.query(sql, [id], (err, result: {
            cnt: number
        }[]) => {
            if (err != null) {
                console.log(err)
                reject(err)
            } else {
                resolve(result[0].cnt)
            }
        })
    })
}

const getArticleCount = (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        const sql = `SELECT COUNT(*) AS cnt
                     FROM blog.t_article`
        connection.query(sql, (err, result: {
            cnt: number
        }[]) => {
            if (err != null) {
                console.log(err)
                reject(err)
            } else {
                resolve(result[0].cnt)
            }
        })
    })
}

const queryHomeArticles = async (from: number, limit: number): Promise<Article[]> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT t_article.id                                          AS id,
                            t_article.email                                       AS email,
                            t_account.username                                    AS username,
                            CONCAT('avatar_', t_account.email, '.', avatarFormat) AS avatar,
                            blockId,
                            t_block.name                                          AS blockName,
                            header,
                            createdTime,
                            updatedTime,
                            (SELECT COUNT(*)
                             FROM blog.t_like
                             WHERE t_like.articleId = t_article.id
                               AND positive = 1)                                  AS positiveLikesCount,
                            (SELECT COUNT(*)
                             FROM blog.t_like
                             WHERE t_like.articleId = t_article.id
                               AND positive = 0)                                  AS negativeLikesCount
                     FROM t_article,
                          t_account,
                          t_block
                     WHERE t_article.email = t_account.email
                       AND t_article.blockId = t_block.id
                     ORDER BY id DESC
                     LIMIT ?, ?`
        connection.query(sql, [from, limit], (err, result: Article[], fields) => {
            if (err != null) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const createArticle = async (article: Article): Promise<number> => {
    const time = getCurrentTimeStr()
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO t_article (email, blockId, header, content, createdTime, updatedTime)
                     VALUES (?, ?, ?, ?, ?, ?)`
        connection.query(sql, [article.email, article.blockId, article.header, article.content, time, time], (err, result) => {
            if (err != null) {
                reject(err)
                console.log(err)
            } else {
                resolve(result.insertId)
            }
        })
    })
}

const updateArticle = async (article: Article): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE t_article
                     SET header      = ?,
                         content     = ?,
                         updatedTime = ?
                     WHERE id = ?`
        const time = getCurrentTimeStr()
        connection.query(sql, [article.header, article.content, time, article.id], (err, result) => {
            if (err != null) {
                console.log(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export {
    queryArticle,
    queryArticlesByBlockId,
    queryArticleByEmail,
    createArticle,
    updateArticle,
    queryHomeArticles,
    getArticleCountByBlockId,
    queryArticlesByCommenterEmail,
    getArticleCount
}