require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());  // Add middleware to parse JSON bodies

const { neon } = require("@neondatabase/serverless");

const db = neon(process.env.DATABASE_URL);
app.get("/", (req, res) => res.send("Express on Vercel"));

// JWT secret key, should be stored in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET;



// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});


app.get("/car", async (req, res) => {
  try {
    const { maker, model, year } = req.query;
    
    // Get all data
    const rows = await db`SELECT * FROM cars`;
    
    // Filter data using filter method
    const filteredRows = rows.filter(car => {
      let matchConditions = true;
      
      if (maker) {
        matchConditions = matchConditions && car.make.toLowerCase() === maker.toLowerCase();
      }
      if (model) {
        matchConditions = matchConditions && car.model.toLowerCase() === model.toLowerCase();
      }
      if (year) {
        matchConditions = matchConditions && car.year === parseInt(year);
      }
      
      return matchConditions;
    });
    
    res.json(filteredRows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;