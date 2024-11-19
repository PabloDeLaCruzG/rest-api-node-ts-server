import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import { Toaster, toast } from 'sonner'
import { addProduct } from "../services/ProductService";

// function action who return the request form in console
export async function action( {request}: ActionFunctionArgs ) {
  const data = Object.fromEntries(await request.formData());

  let error = '';
  if(Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }
  if(error.length) return error;

  await addProduct(data);

  return redirect('/');
}

export default function NewProduct() {

  const error = useActionData() as string;

  return (
    <>
      <Toaster position="bottom-right" richColors />

      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar producto
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
        <label htmlFor="name" className="text-lg font-bold">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border border-slate-300 rounded p-2"
          placeholder="Nombre del producto"
          
        />
        <label htmlFor="price" className="text-lg font-bold">
          Precio
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className="border border-slate-300 rounded p-2"
          placeholder="Precio producto, ej. 200, 300..."
          
        />
        <input 
          type="submit" 
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded cursor-pointer" 
          value="Registrar Producto" 
        />
      </Form>
    </>
  );
}
