import FormularioProyecto from '../components/FormularioProyecto'

export default function NuevoProyecto () {

    return (
        <>
            <h1 className="text-4xl font-bold">Crea tus proyectos</h1>

            <div className="mt-10 flex justify-center">
                <FormularioProyecto />
            </div>
        </>
    )

}
