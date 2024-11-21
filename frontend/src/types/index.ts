import { object, string, number, boolean, array } from 'valibot'

export const DraftProductsSchema = object({
    name: string(),
    price: number(),
});

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean(),
});

export const ProductsSchema = array(ProductSchema);

export type Product = {
    id: number;
    name: string;
    price: number;
    availability: boolean;
};