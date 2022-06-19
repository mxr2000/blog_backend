import express from "express";
import {resolve} from 'path'
import {ErrorResponse} from "../../common";
import {getFileFormat} from "../utils/file";
import {postFile} from "../dao/fileDao";
import {PostFileResponse, PostMultipleFileResponse} from "../../common/file";
import {getCurrentTimeStr} from "../utils/time";
import {authenticateToken} from "../utils/auth";
import {UploadedFile} from "express-fileupload";

const router = express.Router()


router.post("/", authenticateToken, async (req, res) => {
    const errResp: ErrorResponse = {
        code: "500",
        msg: "Fuck u"
    }
    if (!req.files || !req.email) {
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
        email: req.email
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

router.post("/multiple", authenticateToken, async (req, res) => {
    const errResp: ErrorResponse = {
        code: "500",
        msg: "Fuck u"
    }
    if (!req.files || !req.email) {
        res.status(404).json(errResp)
        return
    }
    console.log(req.files["file"])
    console.log("---------")
    const file = req.files["file"]

    const fileIds = []
    const fileList: UploadedFile[] = (file instanceof Array) ? file : [file]
    const map: Map<number, string> = new Map<number, string>()
    for (const f of fileList) {
        console.log(f)
        const fileFormat = getFileFormat(f.name)
        const fileId = await postFile({
            name: f.name,
            email: req.email
        })
        map.set(fileId, f.name)
        const path = resolve("./") + `/files/${fileId}` + (fileFormat ? `.${fileFormat}` : '');
        fileIds.push(fileId)
        console.log(path)
        f.mv(path, err => {
            console.log(err)
        })

    }

    const files: {
        id: number,
        name: string
    }[] = []
    map.forEach((v, k) => files.push({
        id: k,
        name: v
    }))
    const resp: PostMultipleFileResponse = {
        email: req.email,
        time: getCurrentTimeStr(),
        data: {
            files: files
        }
    }
    res.json(resp)
})

export default router