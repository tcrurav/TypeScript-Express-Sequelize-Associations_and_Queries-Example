import { Request, Response, NextFunction } from "express";
import { BicycleService } from "./bicycle.service.js";
import { unlink } from "node:fs/promises";
import { removeImage } from "../../middlewares/upload-middleware.js";

export class BicycleController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const bicycles = await BicycleService.findAll();

      res.json(bicycles);
    } catch (error) {
      next(error);
    }
  }

  static async getAllEagerlyByFrameMaterial(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const frameMaterial = String(req.params.frameMaterial);

      const bicycles = await BicycleService.findAllEagerlyByFrameMaterial(frameMaterial);

      res.json(bicycles);
    } catch (error) {
      next(error);
    }
  }

  static async getAllEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const bicycle = await BicycleService.findEagerlyById(id);

      if (!bicycle) {
        res.status(404).json({
          message: "Bicycle not found",
        });

        return;
      }

      res.json(bicycle);

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

      const bicycle = await BicycleService.findById(id);

      if (!bicycle) {
        res.status(404).json({
          message: "Bicycle not found",
        });

        return;
      }

      res.json(bicycle);

    } catch (error) {
      next(error);
    }
  }

  static async getEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const bicycle = await BicycleService.findEagerlyById(id);

      if (!bicycle) {
        res.status(404).json({
          message: "Bicycle not found",
        });

        return;
      }

      res.json(bicycle);

    } catch (error) {
      next(error);
    }
  }


  static async create(req: Request, res: Response, next: NextFunction) {
    let created = false;
    try {
      const { brandId, model, description, price, stock } = req.body ?? {};

      if (brandId == undefined || !model || price === undefined) {
        res.status(400).json({
          message: "brandId, model, and price are required",
        });

        return;
      }

      const parsedBrandId = Number(brandId);
      const parsedPrice = Number(price);
      const parsedStock = stock === undefined ? 0 : Number(stock);

      if (
        !Number.isInteger(parsedBrandId) || parsedBrandId <= 0 ||
        typeof model !== "string" || !model.trim() ||
        String(price).trim() === "" || !Number.isFinite(parsedPrice) || parsedPrice < 0 ||
        !Number.isInteger(parsedStock) || parsedStock < 0
      ) {
        res.status(400).json({ message: "Invalid brandId, model, price, or stock" });
        return;
      }

      const bicycle = await BicycleService.create({
        brandId: parsedBrandId,
        model: model.trim(),
        description,
        price: parsedPrice,
        stock: parsedStock,
        filename: req.file?.filename ?? null,
      });
      created = true;

      res.status(201).json(bicycle);

    } catch (error) {
      next(error);
    } finally {
      if (!created && req.file) {
        await unlink(req.file.path).catch((error) => console.error("Failed to remove uploaded image", error));
      }
    }
  }


  static async update(req: Request, res: Response, next: NextFunction) {
    let updated = false;
    try {
      const id = Number(req.params.id);

      const bicycle = await BicycleService.findById(id);

      if (!bicycle) {
        res.status(404).json({ message: "Bicycle not found", });

        return;
      }

      const { brandId, model, description, price, stock } = req.body ?? {};
      const data: Parameters<typeof BicycleService.update>[1] = {};
      if (brandId !== undefined) data.brandId = Number(brandId);
      if (model !== undefined) data.model = typeof model === "string" ? model.trim() : "";
      if (description !== undefined) data.description = description;
      if (price !== undefined) data.price = Number(price);
      if (stock !== undefined) data.stock = Number(stock);

      if (
        (brandId !== undefined && (!Number.isInteger(data.brandId) || data.brandId! <= 0)) ||
        (model !== undefined && (!data.model || data.model.length > 150)) ||
        (price !== undefined && (String(price).trim() === "" || !Number.isFinite(data.price) || data.price! < 0 || data.price! > 99999999.99)) ||
        (stock !== undefined && (String(stock).trim() === "" || !Number.isInteger(data.stock) || data.stock! < 0 || data.stock! > 4294967295)) ||
        (description !== undefined && description !== null && typeof description !== "string")
      ) {
        res.status(400).json({ message: "Invalid bicycle fields" });
        return;
      }

      const previousFilename = bicycle.filename;
      if (req.file) data.filename = req.file.filename;
      const updatedBicycle = await BicycleService.update(bicycle, data);
      updated = true;
      if (req.file) await removeImage(previousFilename);

      res.json(updatedBicycle);

    } catch (error) {
      next(error);
    } finally {
      if (!updated && req.file) await removeImage(req.file.filename);
    }
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const bicycle = await BicycleService.findById(id);

      if (!bicycle) {
        res.status(404).json({
          message: "Bicycle not found",
        });

        return;
      }

      const filename = bicycle.filename;
      await BicycleService.delete(bicycle);
      await removeImage(filename);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
