import { z } from "zod";

// Esquema para borradores de productos
export const DraftProductsSchema = z.object({
    name: z.string(),
    price: z.number(),
});

// Esquema para un producto
export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    availability: z.boolean(),
});

// Esquema para una lista de productos
export const ProductsSchema = z.array(ProductSchema);

// Tipo Product basado en el esquema de Zod
export type Product = z.infer<typeof ProductSchema>;
