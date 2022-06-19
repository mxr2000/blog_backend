import connection from "./connection";
import {ArticleFile, ArticleImage, UserFile} from "../../common/file";


const getArticleImages = (articleId: number): Promise<ArticleImage[]> => {
    return new Promise<ArticleImage[]>((resolve, reject) => {
        const sql = `SELECT id, name, email
                     FROM t_file,
                          t_article_image
                     WHERE articleId = ?
                       AND t_file.id = t_article_image.fileId`
        connection.query(sql, [articleId], (err, result: UserFile[]) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(result.map(f => {
                    return {
                        articleId: articleId,
                        file: f
                    }
                }))
            }
        })
    })
}

const getArticleFiles = (articleId: number): Promise<ArticleFile[]> => {
    return new Promise<ArticleFile[]>((resolve, reject) => {
        const sql = `SELECT id, name, email
                     FROM t_file,
                          t_article_file
                     WHERE articleId = ?
                       AND t_file.id = t_article_file.fileId`
        connection.query(sql, [articleId], (err, result: UserFile[]) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(result.map(f => {
                    return {
                        articleId: articleId,
                        file: f
                    }
                }))
            }
        })
    })
}

const postFile = (file: UserFile): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        const sql = `INSERT INTO t_file (email, name)
                     VALUES (?, ?)`
        connection.query(sql, [file.email, file.name], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(result.insertId)
            }
        })
    })
}

const postArticleImages = (ids: number[], articleId: number): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const sql = `INSERT INTO t_article_image (fileId, articleId)
                     VALUES ` + ids.map(id => `(${id}, ${articleId})`).join(', ')
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve("ok")
            }
        })
    })
}

const postArticleFiles = (ids: number[], articleId: number): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const sql = `INSERT INTO t_article_file (articleId, fileId)
                     VALUES ` + ids.map(id => `(${articleId}, ${id})`).join(', ')
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve("ok")
            }
        })
    })
}

const removeArticleImage = (fileId: number, articleId: number): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const sql = `DELETE
                     FROM t_article_image
                     WHERE articleId = ?
                       AND fileId = ?`
        connection.query(sql, [articleId, fileId], (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve("ok")
            }
        })
    })
}


export {getArticleImages, postFile, postArticleImages, removeArticleImage, postArticleFiles, getArticleFiles}