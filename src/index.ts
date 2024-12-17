import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "./db";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ msg: "Brainly" });
});

app.post("/api/v1/signup", async (req, res): Promise<void> => {
  const { email, password } = req.body;
  const isfound = await User.findOne({ email });

  if (isfound) {
    res.json({ msg: "User already existed" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  await User.create({
    email: email,
    password: hashedPassword,
  });

  res.json({ msg: "signup successful" });
});

app.post("/api/v1/signin", (req, res) => {});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

async function connectDB() {
  await mongoose.connect(
    "URL"
  );
  console.log("connected to database");
}

app.listen(3000, () => {
  console.log("app listening on port 3000");
  connectDB();
});
