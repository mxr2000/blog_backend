import express from "express";
import {resolve} from 'path'
import {ErrorResponse} from "../../common";
import {getFileFormat} from "../utils/file";
import {postFile} from "../dao/fileDao";
import {PostFileResponse} from "../../common/file";
import {getCurrentTimeStr} from "../utils/time";

const router = express.Router()


router.post("/", async (req, res) => {
    const errResp: ErrorResponse = {
        code: "500",
        msg: "Fuck u"
    }
    if (!req.files) {
        res.status(404).json(errResp)
        return
    }
    console.log(req.files)
    console.log(req.files["file"])
    const file = req.files["file"]
    if (file instanceof Array) {
        res.status(404).json(errResp)
        return
    }
    const email = "mxr@qq.com"
    console.log(file)
    const fileFormat = getFileFormat(file.name)

    const fileId = await postFile({
        name: file.name,
        email: "mxr@qq.com"
    })

    const path = resolve("./") + `/files/${fileId}` + (fileFormat ? `.${fileFormat}` : '');
    console.log(path)
    file.mv(path, err => {
        console.log(err)
    })
    const resp: PostFileResponse = {
        email: email,
        time: getCurrentTimeStr(),
        data: {
            fileId: fileId
        }
    }
    res.json(resp)
})

export default router