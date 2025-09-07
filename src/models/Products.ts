import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";   

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,           
    modelName: "Product",
  }
);

export default Product;


