import { ActionFunctionArgs, Form, useNavigate, redirect } from "react-router-dom";
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product
}

export async function action( {params}: ActionFunctionArgs ) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect('/');
  }
} 

export default function ProductDetails( {product}: ProductDetailsProps ) {

   
  const navigate = useNavigate();

  const isAvailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>

      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>

      <td className="p-3 text-lg text-gray-800">
        <form method="POST">
          <button
            type="button"
            name="availability"
            value={product.availability.toString()}
            className={`${isAvailable ? "bg-green-600" : "bg-red-600"} hover:bg-green-500 text-white uppercase font-bold w-full text-xs text-center rounded-lg p-2`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </button>
        </form>

        
      </td>

      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() =>
              navigate(`/products/${product.id}/edit`)
            }
            className="bg-indigo-600 hover:bg-indigo-500 text-white uppercase font-bold w-full text-xs text-center rounded-lg p-2"
          >
            Editar
          </button>

          <Form 
            className="w-full" 
            method="POST"
            action={`products/${product.id}/delete`}
            onSubmit={ (e) => {
              if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                e.preventDefault();
              }
            }}
          >
            <input 
              type="submit"
              value="Eliminar"
              className="bg-red-600 hover:bg-red-500 text-white uppercase font-bold w-full text-xs text-center rounded-lg p-2"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
