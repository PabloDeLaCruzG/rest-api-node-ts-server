import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Toaster, toast } from 'sonner'
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params } : LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      return redirect('/');
    }
    return product;
  }
}

export async function action( {request, params}: ActionFunctionArgs ) {
  const data = Object.fromEntries(await request.formData());

  let error = '';
  if(Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }
  if(error.length) return error;

  if (params.id !== undefined) {
    await updateProduct(+params.id, data);
  }

  return redirect('/');
}

const availabilityOptions = [
  { value: true, name: 'Disponible' },
  { value: false, name: 'No disponible' },
];

export default function EditProduct() {

  const error = useActionData() as string;

  const product = useLoaderData() as Product;

  return (
    <>
      <Toaster position="bottom-right" richColors />

      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Editar producto
        </h2>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
        >
          Volver a productos
        </Link>
      </div>

      {error && toast.error(error, { duration: 2500})}

      <Form 
        className="mt-10 flex flex-col gap-4"
        method="POST"
      >
        
        <ProductForm 
          product={product}
        />

        <div className="mb-4">
          <label htmlFor="availability" className="text-lg font-bold">
            Disponibilidad
          </label>
          <select
            id="availability"
            name="availability"
            className="mt-2 block w-full border-gray-50 p-3"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
          </select>
        </div>

        <input 
          type="submit" 
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded cursor-pointer" 
          value="Registrar Producto" 
        />
      </Form>
    </>
  );
}
