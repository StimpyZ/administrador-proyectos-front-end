import { ToastContainer } from 'react-toastify'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

export default function RutaProtegida () {

    const { auth } = useAuth()

    if (!auth.data) return <Navigate to='/' />
    return (
        <>
            <div className='bg-gray-100'>
                <Header />

                <div className='md:flex md:min-h-screen'>

                    <Sidebar />

                    <main className='flex-1 p-10 overflow-y-hidden'>
                        <Outlet />

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
                </div>
            </div>

        </>
    )

}
