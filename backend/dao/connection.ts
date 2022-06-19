import mysql from 'mysql'

const host = process.env.MYSQL_HOST

const REMOTE_HOST = "35.226.186.255"

const connection = mysql.createConnection({
    host: host ?? REMOTE_HOST,
    user: "root",
    password: "123456",
    database: "blog"
})

export default connection