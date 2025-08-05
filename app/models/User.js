import mongoose from "mongoose";
const {Schema, model, models} = mongoose

const UserSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    username: {type: String},
    profile: {type: String},
    background: {type: String},
    razor_id: {type: String},
    razor_secret: {type: String},
})

export default mongoose.models.User || model("User", UserSchema);