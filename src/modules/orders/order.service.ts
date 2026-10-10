import { Order } from "./order.model.js";
import { Customer } from "../customers/customer.model.js";

export class OrderService {

  static async findAll() {
    return Order.findAll({
      order: [["id", "ASC"]],
    });
  }

  // Find all orders for a specific customer
  static async findByCustomerId(customerId: number) {
    return Order.findAll({
      where: { customerId },
      include: [{ model: Customer, as: "customer", attributes: ["id", "name", "email"] }],
      order: [["orderDate", "DESC"]],

    });
  }

  static async findById(id: number) {
    return Order.findByPk(id);
  }

  static async create(data: {
    customerId: number;
    orderDate: Date;
    status: "pending" | "paid" | "shipped" | "cancelled";
  }) {
    return Order.create(data);
  }

  static async update(
    bicycle: Order,
    data: {
      customerId?: number;
      orderDate?: Date;
      status?: "pending" | "paid" | "shipped" | "cancelled";
    }
  ) {
    return bicycle.update(data);
  }

  static async delete(bicycle: Order) {
    await bicycle.destroy();
  }
}