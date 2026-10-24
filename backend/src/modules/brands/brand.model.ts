// src/modules/brands/brand.model.ts
import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from "sequelize";

import { sequelize } from "../../config/database.js";

export class Brand extends Model<
    InferAttributes<Brand>, InferCreationAttributes<Brand>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Brand.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: "brands",
    modelName: "Brand"
});
