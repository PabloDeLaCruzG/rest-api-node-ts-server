import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [["price", "DESC"]],
  });
  res.status(200).json(products);
};
export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  } else {
    res.status(200).json(product);
  }
};
export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.update(req.body, {
    where: { id: req.params.id },
  });
  res.status(200).json(product);
};

export const updateAvailability = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  } else {
    product.availability = !product.dataValues.availability;
    await product.save();
    res.status(200).json(product);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  } else {
    await product.destroy();
    res.status(200).json("Product deleted");
  }
};
