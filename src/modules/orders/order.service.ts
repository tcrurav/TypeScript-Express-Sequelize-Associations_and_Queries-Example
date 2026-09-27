import { Order } from "./order.model";

export class OrderService {

  static async findAll() {
    return Order.findAll({
      order: [["id", "ASC"]],
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