import { Product } from "../types";

type ProductFormProps = {
  product?: Product;
}

export default function ProductForm({product}: ProductFormProps) {
  return (
    <>
        <div className="mb-4">
          <label htmlFor="name" className="text-lg font-bold">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del producto"
            defaultValue={product?.name}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="text-lg font-bold">
            Precio
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio producto, ej. 200, 300..."
            defaultValue={product?.price}
          />
        </div>
    </>
  )
}
