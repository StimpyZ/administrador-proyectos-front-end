import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function PreviewProyecto ({ proyectos }) {

    const { auth } = useAuth()
    const { nombre, _id, cliente, creador } = proyectos
    return (
        <div className="border-b p-5 flex">

            <div className='flex items-center gap-5'>
                <p className='flex-1 font-bold'>
                    {nombre}
                    <span className='text-gray-600 font-normal'> - {cliente}</span>
                </p>

                {auth.data._id !== creador && (
                    <p className='p-2 text-xs bg-green-500 font-bold uppercase rounded-lg text-white'>Colaborador</p>
                )}
            </div>

            <Link
                className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                to={`${_id}`}>
                Ver proyecto
            </Link>
        </div>
    )

}
