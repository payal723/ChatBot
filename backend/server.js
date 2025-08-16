// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 5000;

// ✅ middlewares
app.use(cors());
app.use(bodyParser.json());

// ✅ Gemini API setup (API key backend me rakho)
const genAI = new GoogleGenerativeAI("AIzaSyBEabtiGcj6edN1vdY1n6qXozFSJKQe7Kw");  // <-- apni key yahan daalo

// ✅ Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(userMessage);

    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "⚠️ Error connecting to AI" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
