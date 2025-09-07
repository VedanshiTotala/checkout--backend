import { Request, Response } from "express";
import { Product } from "../models";

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
