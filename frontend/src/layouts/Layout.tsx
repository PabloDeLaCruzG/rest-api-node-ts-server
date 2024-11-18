import {Outlet} from 'react-router-dom'

export default function Layout() {
  return (
    <>
        <header className='bg-slate-800'>
            <div className='container mx-auto flex flex-col items-center justify-center py-6 sm:flex-row'>
                <h1 className='text-white text-4xl font-extrabold'>
                    Administrador de Productos
                </h1>
            </div>
        </header>

        <main className='mt-10 mx-auto max-w-6xl p-10 bg-white shadow'>
            <Outlet />
        </main>
    </>
  )
}
