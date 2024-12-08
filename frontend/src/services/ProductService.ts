import axios from "axios";
import { z } from "zod";
import { DraftProductsSchema, Product, ProductSchema, ProductsSchema } from "../types";
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
};

// Función para agregar un producto
export async function addProduct(data: ProductData) {
    try {
        const parsedData = DraftProductsSchema.safeParse({
            name: data.name,
            price: Number(data.price), // Convierte a número
        });

        if (parsedData.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url, {
                name: parsedData.data.name,
                price: parsedData.data.price,
            });
        } else {
            throw new Error('No valid data');
        }
    } catch (error) {
        console.log(error);
    }
}

// Función para obtener todos los productos
export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios.get(url);
        const parsedData = ProductsSchema.safeParse(data);

        if (parsedData.success) {
            return parsedData.data; // Retorna los productos parseados
        } else {
            throw new Error('Error parsing data');
        }
    } catch (error) {
        console.log(error);
    }
}

// Función para obtener un producto por ID
export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios.get(url);
        const parsedData = ProductSchema.safeParse(data);

        if (parsedData.success) {
            return parsedData.data; // Retorna el producto parseado
        } else {
            throw new Error('Error parsing data');
        }
    } catch (error) {
        console.log(error);
    }
}

// Función para actualizar un producto
export async function updateProduct(id: Product['id'], data: ProductData) {
    try {
        const NumberSchema = z.coerce.number();

        const result = ProductSchema.safeParse({
            id,
            name: data.name,
            price: NumberSchema.parse(data.price), 
            availability: toBoolean(data.availability.toString()),
        });

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, {
                name: result.data.name,
                price: result.data.price,
                availability: result.data.availability,
            });
        } else {
            throw new Error('No valid data');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.log(error);
    }
}
