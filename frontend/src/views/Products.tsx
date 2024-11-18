import { Link } from "react-router-dom"

export default function Products() {
  return (
    <>
    
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="/products/new"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
        >
          Agregar producto
        </Link>
      </div>
    
    </>
  )
}
