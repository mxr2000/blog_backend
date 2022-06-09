import connection from "./connection";
import {Account} from "../../common/account";


const queryAccount = async (email: string, pwd: string): Promise<Account> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT t_account.email AS email, username, t_file.name AS avatar
                     FROM t_account
                              LEFT JOIN t_file ON t_account.avatarId = t_file.id
                     WHERE t_account.email = ?
                       AND pwd = ?`
        connection.query(sql, [email, pwd], (err, result: Account[], fields) => {
            if (err != null) {
                console.log(err)
                reject(err)
            } else if (result.length != 1) {
                console.log(result)
                reject("error")
            } else {
                console.log(result[0])
                resolve(result[0])
            }
        })
    })
}


const createAccount = async (account: Account): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO t_account (email, username, pwd)
                     VALUES (?, ?, ?)`
        connection.query(sql, [account.email, account.username, account.pwd], (err, result) => {
            if (err == null) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const updateUsername = async (account: Account): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE t_account
                     SET username = ?
                     WHERE email = ?`
        connection.query(sql, [account.username, account.email], (err, result) => {
            if (err == null) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const updatePwd = async (account: Account): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE t_account
                     SET pwd = ?
                     WHERE email = ?`
        connection.query(sql, [account.pwd, account.email], (err, result) => {
            if (err == null) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const getAccountDetail = async (email: string): Promise<Account> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT *
                     FROM t_account
                     WHERE email = ?`
        connection.query(sql, [email], (err, result: Account[]) => {
            if (err != null) {
                reject(err)
            } else if (result.length != 1) {
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

const deleteAccount = async (email: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE
                     FROM t_account
                     WHERE email = ?`
        connection.query(sql, [email], (err, result) => {
            if (err != null) {
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

const updateAvatar = async (email: string, fileId: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE t_account
                     SET avatarId = ?
                     WHERE blog.t_account.email = ?`
        connection.query(sql, [fileId, email], (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve("ok")
            }
        })
    })
}

export {queryAccount, createAccount, updatePwd, updateUsername, getAccountDetail, deleteAccount, updateAvatar}