import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "./db";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Brainly" });
});

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
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

    res.status(201).json({ msg: "signup successful" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
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

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the .env file");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ msg: "successful signin", token: token });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

app.post("/api/v1/content", (req, res) => {
  
});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

async function connectDB() {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL is not defined in the .env file");
  }
  await mongoose.connect(process.env.DB_URL);
  console.log("connected to database");
}

app.listen(3000, () => {
  console.log("app listening on port 3000");
  connectDB();
});
