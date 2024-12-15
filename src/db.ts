import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  email: { unique: true, type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

export default User;
