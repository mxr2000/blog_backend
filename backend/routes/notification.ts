import express from "express";
import {getCurrentTimeStr} from "../utils/time";
import {ErrorResponse} from "../../common";
import {queryNotifications} from "../dao/notificationDao";
const router = express.Router()

router.get("/:email", async (req, res) => {
    const createdTime = getCurrentTimeStr()
    const email = req.params.email
    try {
        const result = await queryNotifications(email)
        res.json(result)
    } catch (e) {
        const resp: ErrorResponse = {
            code: "500",
            msg: "error"
        }
        res.status(500).json(resp)
    }
})



export default router