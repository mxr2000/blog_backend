import {sign, verify} from 'jsonwebtoken'
import {randomBytes} from 'crypto'
import {Request, Response, NextFunction} from "express";

const tokenSecret = randomBytes(64).toString("hex")

const generateAccessToken = (email: string) => {
    return sign(email, tokenSecret, {
    })
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        next()
        return
    }

    try {
        verify(token, tokenSecret, (err: any, user: any) => {
            console.log(err)

            if (!err) {
                req.email = user
            }

            next()
        })
    } catch (e) {
        next()
    }
}

export {generateAccessToken, authenticateToken}