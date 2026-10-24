import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: CreationOptional<String>;
  declare passwordHash: CreationOptional<String>;
  declare role: CreationOptional<String>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false },
    role: {
      type: DataTypes.STRING(100),
      allowNull: false },
    createdAt: DataTypes.DATE, updatedAt: DataTypes.DATE,
  },
  { sequelize, tableName: "users", timestamps: true }
);