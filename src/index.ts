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

app.post("/api/v1/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.json({ msg: "User already existed" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  await User.create({
    email: email,
    password: hashedPassword,
  });
  const token = jwt.sign(req.body, "SATHWIK");
  res.json({ msg: "signup successful", token: token });
});

app.post("/api/v1/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.json({ msg: "User not found" });
    return;
  }

  const hashedPassword = await bcrypt.compare(password, user.password);
  if (!hashedPassword) {
    res.json({ msg: "Enter valid credentials" });
    return;
  }

  res.json({ msg: "successful signin" });
});

app.post("/api/v1/content", (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, "SATHWIK");
  res.json({ msg: user });
});

app.get("/api/v1/content", (req, res) => {
  const token = req.body;
  const user = jwt.verify(token, "SATHWIK");
  res.json({ msg: user });
});

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
