import { Request, Response } from "express";
import { CartItem, Product } from "../models";

// Add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = Number(req.params.userId);
    if (!userId) {
      return res
        .status(400)
        .json({ error: "Missing or invalid userId in URL" });
    }
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid productId or quantity" });
    }

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Check if item already exists for this user
    let cartItem = await CartItem.findOne({ where: { productId, userId } });
    if (cartItem) {
      cartItem.quantity += quantity; // aggregate quantity
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ productId, quantity, userId });
    }

    res.status(201).json({
      product: product.name,
      quantity: cartItem.quantity,
      unitPrice: product.price,
      totalBeforeDiscount: product.price * cartItem.quantity,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// View cart
export const viewCart = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) {
      return res
        .status(400)
        .json({ error: "Missing or invalid userId in URL" });
    }
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [Product],
    });

    let totalPrice = 0;
    let totalDiscount = 0;

    const items = cartItems.map((item: any) => {
      const product = item.Product as Product;
      const quantity = item.quantity;
      const unitPrice = product.price;
      const subtotal = unitPrice * quantity;

      let discount = 0;
      // Product-level discounts
      if (product.name === "A" && quantity >= 3) {
        const setsOf3 = Math.floor(quantity / 3);
        discount += setsOf3 * (3 * unitPrice - 85);
      }
      if (product.name === "B" && quantity >= 2) {
        const setsOf2 = Math.floor(quantity / 2);
        discount += setsOf2 * (2 * unitPrice - 35);
      }

      const totalAfterDiscount = subtotal - discount;
      totalPrice += totalAfterDiscount;
      totalDiscount += discount;

      return {
        product: product.name,
        quantity,
        unitPrice,
        totalBeforeDiscount: subtotal,
        discount,
        totalAfterDiscount,
      };
    });

    // Basket-level discount
    if (totalPrice > 150) {
      totalPrice -= 20;
      totalDiscount += 20;
    }

    res.json({
      items,
      totalPrice,
      totalDiscount,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Clear cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId || req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    await CartItem.destroy({ where: { userId } });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
