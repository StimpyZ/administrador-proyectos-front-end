import React from 'react'
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin'

export default function Colaboradores ({ colaborador }) {

    const { handleEliminarColaborador } = useProyectos()

    const { nombre, email } = colaborador

    const admin = useAdmin()
    return (
        <div className="border-b p-5 md:flex justify-between items-center">
            <div>
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{email}</p>
            </div>
            <div>
                {admin && (
                    <button
                        onClick={() => handleEliminarColaborador(colaborador)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                    >
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    )

}
