import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
  declare id: CreationOptional<number>;
  declare name: CreationOptional<String>;
  declare createdAt: CreationOptional<String>;
  declare updatedAt: CreationOptional<String>;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true },
    createdAt: DataTypes.DATE, updatedAt: DataTypes.DATE,
  },
  { sequelize, tableName: "permissions", timestamps: true }
);