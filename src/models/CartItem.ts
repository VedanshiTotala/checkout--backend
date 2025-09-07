import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";

class CartItem extends Model {
  public id!: number;
  public productId!: number;
  public quantity!: number;
  public userId!: number;
}

CartItem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "CartItem",
  }
);

export default CartItem;
