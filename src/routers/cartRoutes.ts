import express from "express";
import { addToCart, viewCart, clearCart } from "../controllers/cartController";

const router = express.Router();

router.post("/add/:userId", addToCart);
router.get("/view/:userId", viewCart);
router.delete("/clear", clearCart);

export default router;
