import { sequelize } from "./db";
import Product from "./Products";
import CartItem from "./CartItem";

// Associations
Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

export { sequelize, Product, CartItem };
