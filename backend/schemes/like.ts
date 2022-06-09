import * as mongoose from "mongoose";

const likeScheme = new mongoose.Schema({
    email: String,
    createdTime: String,
    isPositive: Boolean
})

export default likeScheme