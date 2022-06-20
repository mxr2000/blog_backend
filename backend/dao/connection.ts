import mysql from 'mysql'

const host = process.env.MYSQL_HOST

const REMOTE_HOST = "35.226.186.255"

const config: mysql.ConnectionConfig = {
    host: host ?? REMOTE_HOST,
    user: "root",
    password: "mxr2017",
    database: "blog"
}

const connection = mysql.createConnection(config)
console.log(config)

export default connection