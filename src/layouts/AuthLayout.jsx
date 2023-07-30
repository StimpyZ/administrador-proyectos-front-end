import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AuthLayout () {

    return (
        <>
            <main className='container mx-auto mt-5 md:flex md:mt-20 p-5 md:justify-center'>
                <div className='md:w-2/3 lg:w-2/5'>
                    <Outlet />
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </main>
        </>
    )

}
