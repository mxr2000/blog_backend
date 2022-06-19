import connection from "./connection";
import {ArticleLike} from "../../common/article";

const getUserLikes = async (articleId: number, email: string): Promise<boolean[]> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT positive
                     FROM t_like
                     WHERE articleId = ?
                       AND email = ?`
        connection.query(sql, [articleId, email], (err, result: boolean[]) => {
            if (err != null) {
                console.log(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const getLikesByArticleId = async (articleId: number): Promise<ArticleLike[]> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT articleId, email, positive
                     FROM t_like
                     WHERE articleId = ?`
        connection.query(sql, [articleId], (err, result: ArticleLike[], fields) => {
            if (err != null) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const postLike = async (articleLike: ArticleLike): Promise<string> => {
    const {articleId, email, positive} = articleLike
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO t_like (articleId, email, positive)
                     VALUES (?, ?, ?)`
        connection.query(sql, [articleId, email, positive], (err, result) => {
            if (err != null) {
                reject(err)
            } else {
                resolve("successfully liked")
            }
        })
    })
}

const deleteLike = async (articleId: number, email: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE
                     FROM t_like
                     WHERE articleId = ?
                       AND email = ?`
        connection.query(sql, [articleId, email], (err, result) => {
            if (err != null) {
                reject(err)
            } else {
                resolve("successfully deleted")
            }
        })
    })
}

const getUserLikeArticle = async (articleId: number, email: string): Promise<boolean | undefined> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT positive FROM t_like WHERE email = ? AND articleId = ?`
        connection.query(sql, [email, articleId], (err, result: {positive: boolean}[]) => {
            if (err != null) {
                reject(err)
            } else if (result.length != 1) {
                resolve(undefined)
            } else {
                resolve(result[0].positive)
            }
        })
    })
}

export {getLikesByArticleId, postLike, deleteLike, getUserLikes, getUserLikeArticle}