import { Request, Response } from "express";
import prisma from "../database/prisma.connection";

class ProductsController {
  public async create(req: Request, res: Response) {
    const { name, description, price, stock, productImage, categoryId } =
      req.body;
    try {
      await prisma.product.create({
        data: {
          name,
          description,
          price,
          stock,
          productImage,
          categoryId,
        },
      });

      res.status(201).json({ success: true, msg: "Product created" });
    } catch (err) {
      res.status(500).json({ success: false, msg: "Internal server error" });
      return;
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany();

      res
        .status(200)
        .json({ success: true, msg: "Products listing", products });
    } catch (err) {
      res.status(500).json({ success: false, msg: "Internal server error" });
      return;
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        res.status(404).json({ success: false, msg: "Product not found" });
        return;
      }

      res
        .status(200)
        .json({ success: true, msg: "Products showing", existingProduct });
      return;
    } catch (err) {
      res.status(500).json({ success: false, msg: "Internal server error" });
      return;
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, price, stock, productImage, categoryId } =
      req.body;
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        res.status(404).json({ success: false, msg: "Products not found" });
      }

      await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          stock,
          productImage,
          categoryId,
        },
      });

      res.status(200).json({ success: true, msg: "Product updated" });
    } catch (err) {
      res.status(500).json({ success: false, msg: "Internal server error" });
      return;
    }
  }

  public async delete(req: Request, res: Response){
    const { id } = req.params
    try{
        const product = await prisma.product.findUnique({
            where: {id}
        })

        if(!product){
            res.status(404).json({success: false, msg: "Product not found"})
            return
        }

        await prisma.product.delete({
            where: {id}
        })

        res.status(200).json({success: true, msg: "Products deleted"})
        return
    } catch(err) {
        res.status(500).json({ success: false, msg: "Internal server error" });
        return;
    }
  }
}

export default ProductsController;
