import { Request, Response, NextFunction } from "express";
import { OrderItemService } from "./orderItem-item.service";

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
      const { customerId, orderDate, status } = req.body;

      if (customerId == undefined || orderDate == undefined || status == undefined) {
        res.status(400).json({
          message: "customerId, orderDate, and status are required",
        });

        return;
      }

      const orderItem = await OrderItemService.create({
        customerId,
        orderDate,
        status
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

      const updateOrder = await OrderItemService.update(
        orderItem,
        req.body
      );

      res.json(updateOrder);

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