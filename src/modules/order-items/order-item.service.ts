import { OrderItem } from "./order-item.model";

export class OrderItemService {

  static async findAll() {
    return OrderItem.findAll({
      order: [["id", "ASC"]],
    });
  }

  static async findById(id: number) {
    return OrderItem.findByPk(id);
  }

  static async create(data: {
    customerId: number;
    orderDate: Date;
    status: "pending" | "paid" | "shipped" | "cancelled";
  }) {
    return OrderItem.create(data);
  }

  static async update(
    bicycle: OrderItem,
    data: {
      customerId?: number;
      orderDate?: Date;
      status?: "pending" | "paid" | "shipped" | "cancelled";
    }
  ) {
    return bicycle.update(data);
  }

  static async delete(bicycle: OrderItem) {
    await bicycle.destroy();
  }
}