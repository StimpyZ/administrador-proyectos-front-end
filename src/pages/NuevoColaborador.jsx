import { useEffect } from 'react'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import Error404 from '../components/Error404'

export default function NuevoColaborador () {

    const { obtenerProyecto, proyecto, loading, colaborador, agregarColaborador, alerta } = useProyectos()
    const params = useParams()
    useEffect(() => {

        obtenerProyecto(params.id)

    }, [])

    if (!proyecto?._id) return <Error404 message={alerta}/>

    return (
        <>
            <h1 className="text-4xl font-bold">Añadir colaborador al proyecto: <span className='text-gray-500 font-normal'>{proyecto.nombre}</span></h1>

            <div className="mt-10 flex justify-center">
                <FormularioColaborador />
            </div>

            {loading
                ? <Spinner />
                : colaborador?._id && (
                    <div className='flex justify-center mt-10 '>
                        <div className='bg-white shadow py-10 px-5 md:w-1/2'>
                            <h2 className='text-center mb-7 text-2xl font-bold'>Resultados</h2>
                            <div className='flex justify-between items-center'>
                                <p className='text-gray-500 font-bold'>{colaborador.nombre}</p>
                                <button
                                    onClick={() => agregarColaborador(colaborador.email)}
                                    className='bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2 cursor-pointer text-white font-bold uppercase' >Agregar al proyecto</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )

}
