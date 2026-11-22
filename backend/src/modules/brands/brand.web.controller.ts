import { Request, Response, NextFunction } from "express";
import { BrandService } from "./brand.service.js";

export class BrandWebController {

  // GET /brands
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const brands = await BrandService.findAll();

      res.render("brands/index", { brands });
    } catch (error) {
      next(error);
    }
  }

  // GET /brands/:id
  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const brand = await BrandService.findById(id);

      if (!brand) {
        res.status(404).send("Marca no encontrada");
        return;
      }

      res.render("brands/show", { brand });
    } catch (error) {
      next(error);
    }
  }

  // GET /brands/create
  static create(req: Request, res: Response) {
    res.render("brands/create");
  }

  // POST /brands
  static async store(req: Request, res: Response, next: NextFunction
  ) {
    try {
      const { name } = req.body;

      if (typeof name !== "string" || !name.trim()) {
        res.status(400).send("El nombre es obligatorio");
        return;
      }

      await BrandService.create({
        name: name.trim()
      });

      res.redirect("/brands");
    } catch (error) {
      next(error);
    }
  }

  // GET /brands/:id/edit
  static async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const brand = await BrandService.findById(id);

      if (!brand) {
        res.status(404).send("Marca no encontrada");
        return;
      }

      res.render("brands/edit", { brand });
    } catch (error) {
      next(error);
    }
  }

  // POST /brands/:id
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const brand = await BrandService.findById(id);

      if (!brand) {
        res.status(404).send("Marca no encontrada");
        return;
      }

      const { name } = req.body;

      if (typeof name !== "string" || !name.trim()) {
        res.status(400).send("El nombre es obligatorio");
        return;
      }

      await BrandService.update(brand, { name: name.trim() });

      res.redirect("/brands");
    } catch (error) {
      next(error);
    }
  }

  // POST /brands/:id/delete
  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const brand = await BrandService.findById(id);

      if (!brand) {
        res.status(404).send("Marca no encontrada");
        return;
      }

      await BrandService.delete(brand);

      res.redirect("/brands");
    } catch (error) {
      next(error);
    }
  }
}