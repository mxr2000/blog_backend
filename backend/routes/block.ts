import express from "express";
import {Block} from "../../common/block";
import {createBlock, getAllBlocks} from "../dao/blockDao";

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const blocks: Block[] = await getAllBlocks()
        res.json(blocks)
    } catch (e) {
        res.status(404).json({
            msg: "error"
        })
    }
})

router.post("/", async (req, res) => {
    try {
        const { name } = req.body
        await createBlock(name)
        res.json({
            msg: `block ${name} created successfully`
        })
    } catch (e) {
        res.status(404).json({
            msg: "error"
        })
    }
})


export default router