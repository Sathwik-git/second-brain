import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";


const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ msg: "Brainly" });
});

app.post("/api/v1/signup", async (req, res) => {
  
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
