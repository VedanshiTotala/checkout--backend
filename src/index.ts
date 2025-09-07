import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routers/productRoutes"
import cartRoutes from "./routers/cartRoutes";

const app = express();

const PORT = 3000;

app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Checkout API is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
