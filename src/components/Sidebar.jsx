import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Busqueda from './Busqueda'

export default function Sidebar () {

    const [collapsed, setCollapsed] = useState(false)
    const [isFixed, setIsFixed] = useState(false)
    const { auth } = useAuth()
    const { handleBuscador } = useProyectos()

    useEffect(() => {

        const handleResize = () => {

            if (window.innerWidth < 800) {

                setCollapsed(true)
                setIsFixed(true)

            } else {

                setCollapsed(false)
                setIsFixed(false)

            }

        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {

            window.removeEventListener('resize', handleResize)

        }

    }, [])

    const toggleSidebar = () => {

        if (window.innerWidth < 800) {

            setCollapsed(!collapsed)

        }

    }

    return (
        <div className={`${isFixed ? 'absolute' : 'relative'}`}>
            {window.innerWidth < 800 && (
                <button
                    className={`${
                        collapsed ? 'left-0 text-black' : 'right-0'
                    } absolute top-0 z-10 p-2 text-sky-700`}
                    onClick={toggleSidebar}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                        />
                    </svg>
                </button>
            )}
            <div
                className={`min-h-screen h-full w-80 bg-sky-900 shadow border-r transition-transform ${
                    collapsed
                        ? 'transform translate-x-[-100%]'
                        : 'transform translate-x-0'
                }`}
            >
                <div className="flex items-center p-5 gap-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>

                    <h1 className="text-xl font-bold text-white">
                        Bienvenido {auth.data.nombre}
                    </h1>
                </div>

                <div className="flex flex-col px-5 py-3 gap-4">
                    <button
                        onClick={handleBuscador}
                        className='flex gap-2 text-white hover:bg-sky-700 hover:text-white px-5 py-3 rounded-md transition-colors'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                        Buscar proyecto</button>

                    <Link
                        className='flex gap-2 text-white hover:bg-sky-700 hover:text-white px-5 py-3 rounded-md transition-colors'
                        to="/proyectos/crear-proyecto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Crear proyecto
                    </Link>

                    <Link
                        className="flex gap-2 text-white hover:bg-sky-700 hover:text-white px-5 py-3 rounded-md transition-colors"
                        to="/proyectos"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>

                        Mis proyectos
                    </Link>

                    <button className="flex gap-2 text-white hover:bg-sky-700 hover:text-white px-5 py-3 rounded-md transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>

                        Cerrar Sesión
                    </button>
                    <Busqueda />
                </div>

            </div>
        </div>
    )

}
