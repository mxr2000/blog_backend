import * as mongoose from "mongoose";

const accountScheme = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    updatedTime: String,
    createdTime: String,
    password: String,
}, {
    _id: false
})

export default mongoose.model('account', accountScheme)