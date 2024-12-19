import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  email: { unique: true, type: String, required: true },
  password: { type: String, required: true },
});

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new Schema({
  link: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  tags: [{ type: ObjectId, ref: "Tags" }],
  userID: { type: ObjectId, ref: "User", required: true },
});

const tagsShema = new Schema({
  title: { type: String, required: true, unique: true },
});

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: ObjectId, ref: "User", required: true },
});

export const User = mongoose.model("User", UserSchema);
export const Content = mongoose.model("Content", contentSchema);
export const Tags = mongoose.model("Tags", tagsShema);
export const Link = mongoose.model("Link", linkSchema);
