import { CartItem, Product } from "../models";

export interface CartSummaryItem {
  product: string;
  quantity: number;
  unitPrice: number;
  totalBeforeDiscount: number;
  discount: number;
  totalAfterDiscount: number;
}

export interface CartSummary {
  items: CartSummaryItem[];
  totalPrice: number;
  totalDiscount: number;
}

export async function calculateCart(cartItems: CartItem[]): Promise<CartSummary> {
  // Aggregate by productId
  const productMap: Record<number, number> = {};
  cartItems.forEach(item => {
    productMap[item.productId] = (productMap[item.productId] || 0) + item.quantity;
  });

  const items: CartSummaryItem[] = [];
  let totalPrice = 0;
  let totalDiscount = 0;

  for (const pidStr of Object.keys(productMap)) {
    const productId = parseInt(pidStr);
    const quantity = productMap[productId];
    const product = await Product.findByPk(productId);
    if (!product) continue;

    const unitPrice = product.price;
    const totalBeforeDiscount = unitPrice * quantity;
    let discount = 0;

    // Product-level discounts
    if (product.name === "A" && quantity >= 3) {
      const setsOf3 = Math.floor(quantity / 3);
      discount += setsOf3 * ((3 * unitPrice) - 85);
    }
    if (product.name === "B" && quantity >= 2) {
      const setsOf2 = Math.floor(quantity / 2);
      discount += setsOf2 * ((2 * unitPrice) - 35);
    }

    const totalAfterDiscount = totalBeforeDiscount - discount;

    items.push({
      product: product.name,
      quantity,
      unitPrice,
      totalBeforeDiscount,
      discount,
      totalAfterDiscount,
    });

    totalPrice += totalAfterDiscount;
    totalDiscount += discount;
  }

  // Basket-level discount
  if (totalPrice > 150) {
    totalDiscount += 20;
    totalPrice -= 20;
  }

  return { items, totalPrice, totalDiscount };
}
