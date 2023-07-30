import { Link, useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import Tarea from '../components/Tarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import Error404 from '../components/Error404'
import Colaboradores from '../components/Colaboradores'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import useAdmin from '../hooks/useAdmin'
import io from 'socket.io-client'

let socket

export default function Proyecto () {

    const {
        obtenerProyecto,
        proyecto,
        loading,
        handleShowModalFormularioTarea,
        alerta,
        sumbitTareasProyecto,
        eliminarTareaProyecto,
        editarTareaProyecto,
        completarTareaProyecto
    } = useProyectos()
    const params = useParams()
    const { nombre } = proyecto
    const admin = useAdmin()

    useEffect(() => {

        obtenerProyecto(params.id)

    }, [])

    useEffect(() => {

        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('abrir-proyecto', params.id)

    }, [])

    useEffect(() => {

        socket.on('tarea-agregada', (tarea) => {

            if (tarea.proyecto === proyecto._id) {

                sumbitTareasProyecto(tarea)

            }

        })
        socket.on('tarea-eliminada', (tarea) => {

            if (tarea.proyecto === proyecto._id) {

                eliminarTareaProyecto(tarea)

            }

        })

        socket.on('tarea-editada', (tarea) => {

            if (tarea.proyecto._id === proyecto._id) {

                editarTareaProyecto(tarea)

            }

        })

        socket.on('tarea-completada', (tarea) => {

            if (tarea.proyecto === proyecto._id) {

                completarTareaProyecto(tarea)

            }

        })

    })

    setTimeout(() => {

        if (!loading && !proyecto?._id) {

            return <Error404 message={alerta} />

        }

    }, 700)
    return (
        <>
            {loading
                ? (
                    <Spinner />
                )
                : (
                    <>
                        {admin && (
                            <div className="md:flex justify-between">
                                <h1 className="text-4xl font-bold">{nombre}</h1>

                                <Link
                                    to={`/proyectos/editar/${params.id}`}
                                    className="flex max-w-[180px] items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 transition-colors mt-5 md:mt-0"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                    </svg>

                                    <span>Editar proyecto</span>
                                </Link>
                            </div>
                        )}
                        {admin && (
                            <button
                                onClick={handleShowModalFormularioTarea}
                                className="flex max-w-[180px] items-center gap-2 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 transition-colors mt-7"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            Crear tarea
                            </button>
                        )}
                        <p className="font-bold text-xl mt-10">
                        Tareas del proyecto
                        </p>
                        <div className="bg-white shadow mt-10 overflow-y-auto max-h-[447px]">
                            {proyecto.tareas?.length
                                ? (
                                    proyecto.tareas?.map((tarea) => (
                                        <Tarea key={tarea._id} tarea={tarea} />
                                    ))
                                )
                                : (
                                    <p className="text-center my-5 p-10">
                                Aun no hay tareas asignadas al proyecto
                                    </p>
                                )}
                        </div>
                        <div className="flex items-center justify-between mt-10">
                            <p className="font-bold text-xl">Colaboradores</p>
                            {admin && (
                                <Link
                                    className="flex max-w-[180px] items-center gap-2 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 transition-colors mt-7"
                                    to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                                >
                                Añadir
                                </Link>
                            )}
                        </div>
                        <div className="bg-white shadow mt-10 overflow-y-auto max-h-[447px]">
                            {proyecto.colaboradores?.length
                                ? (
                                    proyecto.colaboradores?.map((colaborador) => (
                                        <Colaboradores
                                            key={colaborador._id}
                                            colaborador={colaborador}
                                        />
                                    ))
                                )
                                : (
                                    <p className="text-center my-5 p-10">
                                Aun no hay colaboradores asignados al proyecto
                                    </p>
                                )}
                        </div>
                        <ModalFormularioTarea />
                        <ModalEliminarTarea />
                        <ModalEliminarColaborador />
                    </>
                )}
        </>
    )

}
