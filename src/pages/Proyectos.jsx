import useProyectos from '../hooks/useProyectos'
import PreviewProyecto from '../components/PreviewProyecto'
import Spinner from '../components/Spinner'

export default function Proyectos () {

    const { proyectos, loading } = useProyectos()

    return (
        <>
            <h1 className='text-4xl font-bold p-4'>Mis Proyectos</h1>
            {
                loading
                    ? <Spinner />
                    : (

                        <div className='bg-white shadow mt-10'>
                            {proyectos.length
                                ? (
                                    proyectos.map(proyecto => (
                                        <PreviewProyecto key={proyecto._id} proyectos={proyecto} />
                                    ))
                                )
                                : <p className='text-gray-600 uppercase text-center font-bold'>No hay proyectos</p>}
                        </div>
                    )
            }
        </>
    )

}
