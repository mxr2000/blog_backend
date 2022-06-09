import connection from "./connection";
import {Block} from "../../common/block";


const getAllBlocks = async (): Promise<Block[]> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT *
                     FROM t_block`
        connection.query(sql, [], (err, result: Block[]) => {
            if (err != null) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const queryBlock = async (id: number): Promise<Block> => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT *
                     FROM t_block
                     WHERE id = ?`
        connection.query(sql, [id], (err, result: Block[]) => {
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

const createBlock = async (name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO t_block (name)
                     VALUES (?)`
        connection.query(sql, [name], (err, result) => {
            if (err != null) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export {getAllBlocks, createBlock, queryBlock}