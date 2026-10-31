import { BicycleDetail } from "../modules/bicycle-details/bicycle-detail.model.js";
import { Bicycle } from "../modules/bicycles/bicycle.model.js";
import { Brand } from "../modules/brands/brand.model.js";
import { Customer } from "../modules/customers/customer.model.js";
import { Order } from "../modules/orders/order.model.js";
import { OrderItem } from "../modules/order-items/order-item.model.js";
import { User } from "../modules/auth/user.model.js";
import { Role } from "../modules/rbac/role.model.js";
import { UserRole } from "../modules/rbac/user-role.model.js";
import { RolePermission } from "../modules/rbac/role-permission.model.js";
import { Permission } from "../modules/rbac/permission.model.js";

export function defineAssociations() {
    Brand.hasMany(Bicycle, { foreignKey: "brandId", as: "bicycles" });
    Bicycle.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });

    Bicycle.hasOne(BicycleDetail, {
        foreignKey: "bicycleId", as: "detail", onDelete: "CASCADE"
    });
    BicycleDetail.belongsTo(Bicycle, {
        foreignKey: "bicycleId", as: "bicycle"
    });

    Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });
    Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

    Order.belongsToMany(Bicycle, {
        through: OrderItem, foreignKey: "orderId", otherKey: "bicycleId",
        as: "bicycles",
    });
    Bicycle.belongsToMany(Order, {
        through: OrderItem, foreignKey: "bicycleId", otherKey: "orderId",
        as: "orders",
    });
    
    Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
    OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
    Bicycle.hasMany(OrderItem, { foreignKey: "bicycleId", as: "orderItems" });
    OrderItem.belongsTo(Bicycle, { foreignKey: "bicycleId", as: "bicycle" });

    User.belongsToMany(Role, {
        through: UserRole, foreignKey: "userId", otherKey: "roleId",
        as: "roles",
    });
    Role.belongsToMany(User, {
        through: UserRole, foreignKey: "roleId", otherKey: "userId",
        as: "users",
    });

    Role.belongsToMany(Permission, {
        through: RolePermission, foreignKey: "roleId", otherKey: "permissionId",
        as: "permissions",
    });
    Permission.belongsToMany(Role, {
        through: RolePermission, foreignKey: "permissionId", otherKey: "roleId",
        as: "roles",
    });
}
