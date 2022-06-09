import * as mongoose from "mongoose";

const blockScheme = new mongoose.Schema({
    title: String,
    createdTime: String
})

export default blockScheme