import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

// Enable CORS for frontend
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// File to store favorites
const DATA_FILE = path.join(__dirname, "favorites.json");

// Helper functions
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
};

const writeData = (data: any) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET all favorites
app.get("/api/favorites", (req: Request, res: Response) => {
  const favorites = readData();
  res.json(favorites);
});

// POST add favorite
app.post("/api/favorites", (req: Request, res: Response) => {
  const { name, reason } = req.body;
  if (!name || !reason) return res.status(400).json({ error: "Invalid data" });

  const favorites = readData();
  if (favorites.some((fav: any) => fav.name === name))
    return res.status(400).json({ error: "Already in favorites" });

  favorites.push({ name, reason });
  writeData(favorites);
  res.json(favorites);
});

// DELETE favorite
app.delete("/api/favorites/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  let favorites = readData();
  favorites = favorites.filter((fav: any) => fav.name !== name);
  writeData(favorites);
  res.json(favorites);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
