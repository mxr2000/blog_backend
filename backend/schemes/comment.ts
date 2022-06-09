import * as mongoose from "mongoose";

const commentScheme = new mongoose.Schema({
    content: String,
    email: String,
    createdTime: String,
    articleId: String
})

export default mongoose.model('comment', commentScheme)