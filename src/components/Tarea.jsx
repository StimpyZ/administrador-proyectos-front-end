import formatDate from '../helpers/formatDate'
import useAdmin from '../hooks/useAdmin'
import useProyectos from '../hooks/useProyectos'

export default function Tarea ({ tarea }) {

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea
    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
        useProyectos()

    const admin = useAdmin()
    return (
        <div className="border-b p-5 md:flex justify-between items-center">
            <div className='flex flex-col items-start'>
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">
                    {descripcion}
                </p>
                <p className="mb-1 text-sm capitalize">
                    {formatDate(fechaEntrega)}
                </p>
                <p className="mb-1 text-gray-500">{prioridad}</p>
                {estado && <p className='text-xs p-1 text-white bg-green-500 rounded-xl text-center font-bold mt-2 mb-4 md:mb-0'>Completada por: {tarea?.completado?.nombre}</p>}
            </div>
            <div className="flex flex-wrap gap-3">
                {admin && (
                    <>
                        <button
                            onClick={() => handleModalEliminarTarea(tarea)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                        >
                            Eliminar
                        </button>

                        <button
                            onClick={() => handleModalEditarTarea(tarea)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-[93px]"
                        >
                            Editar
                        </button>
                    </>
                )}
                <button
                    onClick={() => completarTarea(_id)}
                    className={`${
                        estado
                            ? 'bg-green-500 hover:bg-green-700'
                            : 'bg-gray-500 hover:bg-gray-700'
                    } text-white font-bold py-2 px-4`}
                >
                    {estado ? 'Completa' : 'Incompleta'}
                </button>
            </div>
        </div>
    )

}
