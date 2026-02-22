// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// This matches the endpoint in your mapCall.js
app.post('/api/listings', (req, res) => {
  const { polygon } = req.body;

  if (!polygon) {
    return res.status(400).json({ message: "No search area (polygon) provided." });
  }

  console.log("Received search request for polygon:", polygon);

  // MOCK DATA: In a real app, you'd query a database like MongoDB or PostGIS here
  const mockApartments = [
    {
      id: 1,
      name: "Luxury Overland Park Loft",
      price: "$1,800",
      coords: [-94.67, 38.95], // Ensure these are inside your "Sweet Spot"
    },
    {
      id: 2,
      name: "Midtown Cozy Studio",
      price: "$1,200",
      coords: [-94.62, 39.06],
    }
  ];

  // Return the data to the frontend
  res.json({ listings: mockApartments });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});