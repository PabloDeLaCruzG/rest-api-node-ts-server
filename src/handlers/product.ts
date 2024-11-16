import { Request, Response } from "express";
import Product from "../models/Product.model";


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [["price", "DESC"]],
        });
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting products" });
    }
};
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting product" });
    }
};
export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating product" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating product" });
    }
};

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            product.availability = !product.dataValues.availability;
            await product.save();
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating product" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            await product.destroy();
            res.status(200).json("Product deleted");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting product" });
    }
};
