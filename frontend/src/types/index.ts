import { object, string, number } from "valibot"

export const DraftProductsSchema = object({
    name: string(),
    price: number()
})