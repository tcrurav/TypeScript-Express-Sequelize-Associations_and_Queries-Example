import { Request, Response, NextFunction } from "express";
import { OrderItemService } from "./order-item.service.js";

export class OrderItemController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const orderItems = await OrderItemService.findAll();

      res.json(orderItems);
    } catch (error) {
      next(error);
    }
  }

  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const orderItem = await OrderItemService.findById(id);

      if (!orderItem) {
        res.status(404).json({
          message: "Order item not found",
        });

        return;
      }

      res.json(orderItem);

    } catch (error) {
      next(error);
    }
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { orderId, bicycleId, quantity, unitPrice } = req.body;

      if (orderId == undefined || bicycleId == undefined || quantity == undefined || unitPrice == undefined) {
        res.status(400).json({
          message: "orderId, bicycleId, quantity, and unitPrice are required",
        });

        return;
      }

      const orderItem = await OrderItemService.create({
        orderId,
        bicycleId,
        quantity,
        unitPrice
      });

      res.status(201).json(orderItem);

    } catch (error) {
      next(error);
    }
  }


  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const orderItem = await OrderItemService.findById(id);

      if (!orderItem) {
        res.status(404).json({
          message: "Order not found",
        });

        return;
      }

      const updateOrderItem = await OrderItemService.update(
        orderItem,
        req.body
      );

      res.json(updateOrderItem);

    } catch (error) {
      next(error);
    }
  }


  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const orderItem = await OrderItemService.findById(id);

      if (!orderItem) {
        res.status(404).json({
          message: "Order item not found",
        });

        return;
      }

      await OrderItemService.delete(orderItem);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}