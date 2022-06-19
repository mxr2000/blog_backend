import connection from "./connection";
import {Notification} from "../../common/notification";
import {getCurrentTimeStr} from "../utils/time";

const removeNotification = (id: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE
                     FROM t_notification
                     WHERE id = ?`
        connection.query(sql, [id], (err, result) => {
            if (err != null) {
                console.log(err)
                reject(err)
            } else {
                console.log(result)
                resolve("ok")
            }
        })
    })
}

const addNotification = (notification: Notification): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO t_notification (email, time, type, content)
                     VALUES (?, ?, ?, ?)`
        connection.query(sql, [notification.email, getCurrentTimeStr(), notification.type, notification.content], (err, result) => {
            if (err != null) {
                console.log(err)
                reject(err)
            } else {
                console.log(result)
                resolve("ok")
            }
        })
    })
}

const queryNotifications = async (email: string): Promise<Notification[]> => {
    return new Promise<Notification[]>((resolve, reject) => {
        const sql = `SELECT *
                     FROM t_notification
                     WHERE email = ?`
        connection.query(sql, [email], (err, result: Notification[]) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export {removeNotification, addNotification, queryNotifications}