require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());  // Add middleware to parse JSON bodies

const { neon } = require("@neondatabase/serverless");

const db = neon(process.env.DATABASE_URL);
app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;