import express, {Express} from 'express';
import router from './backend/routes/index'
import bodyParser from "body-parser";
import cors from 'cors';
import fileUpload from "express-fileupload";
import {resolve} from 'path'

const app: Express = express();
const port = 8000

app.use(cors())
app.use(bodyParser.json())
app.use((res, req, next) => {
    console.log(res.url)
    next()
})
app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use("/static/file", express.static(resolve("./" + "/files")))
app.use("/static/image", express.static(resolve("./" + "/files")))

app.use("/api", router)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});