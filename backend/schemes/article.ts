import * as mongoose from "mongoose";

const articleScheme = new mongoose.Schema({
    blockId: String,
    title: String,
    header: String,
    content: String,
    email: String,
    updatedTime: String,
    createdTime: String
})

export default mongoose.model('Article', articleScheme)