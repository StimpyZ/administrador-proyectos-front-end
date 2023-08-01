import { useState } from 'react'
import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import ModalCerrarSesion from './ModalCerrarSesion'

export default function Header () {

    const [navbar, setNavbar] = useState(false)
    const { handleModalCerrarSesion } = useProyectos()

    return (
        <header className=" sticky w-full bg-white shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link to='/'>
                            <h2 className="text-4xl font-bold text-sky-600">UpTask</h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar
                                    ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )
                                    : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-6 mt-1 md:block md:pb-0 md:mt-0 ${
                            navbar ? 'block' : 'hidden'
                        }`}
                    >

                        <ul className="items-center justify-center mx-auto space-y-6 md:flex md:space-x-6 md:space-y-0 ">
                            <li className='text-center'>
                                <Link className='text-lg uppercase font-bold hover:text-sky-700 transition-colors' to='/proyectos'>Proyectos</Link>
                            </li>

                            <li className='text-center'>
                                <button
                                    onClick={handleModalCerrarSesion}
                                    type="button"
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 transition-colors"
                                >
                        Cerrar Sesión
                                </button>
                                <ModalCerrarSesion />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )

}
