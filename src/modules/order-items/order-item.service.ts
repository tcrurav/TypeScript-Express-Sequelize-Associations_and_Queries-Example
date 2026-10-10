import { OrderItem } from "./order-item.model.js";

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
    orderId: number;
    bicycleId: number;
    quantity: number;
    unitPrice: number;
  }) {
    return OrderItem.create(data);
  }

  static async update(
    orderItem: OrderItem,
    data: {
      orderId?: number;
      bicycleId?: number;
      quantity?: number;
      unitPrice?: number;
    }
  ) {
    return orderItem.update(data);
  }

  static async delete(orderItem: OrderItem) {
    await orderItem.destroy();
  }
}