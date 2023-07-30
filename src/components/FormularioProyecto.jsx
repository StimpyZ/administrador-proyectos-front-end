import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import Alerta from './Alerta'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'

export default function FormularioProyecto () {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')
    const { alerta, setAlerta } = useAuth()
    const { submitProyecto, proyecto } = useProyectos()
    const params = useParams()

    useEffect(() => {

        if (params.id) {

            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)

        }

    }, [params.id, proyecto])

    const handleSubmit = async (e) => {

        e.preventDefault()

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {

            setAlerta({
                error: true,
                msg: 'Todos los campos son obligatorios'
            })
            return

        }

        if (fechaEntrega < new Date().toISOString().split('T')[0]) {

            setAlerta({
                error: true,
                msg: 'La fecha de entrega no puede ser menor a la fecha actual'
            })
            return

        }

        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })

        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
        setAlerta({})

    }

    const { msg } = alerta

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white px-5 py-10 md:w-1/2 shadow">
            {msg && <Alerta alerta={alerta}/>}
            <div className="mb-5">
                <label
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Nombre del proyecto
                </label>

                <input
                    onChange={(e) => setNombre(e.target.value)}
                    id="nombre"
                    type="text"
                    className="w-full bg-gray-100 p-2 border border-gray-200 outline-none focus:border-gray-800 mt-2"
                    placeholder="Cambiar los colores..."
                    value={nombre}
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="descripcion"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Descripcion del proyecto
                </label>

                <textarea
                    onChange={(e) => setDescripcion(e.target.value)}
                    id="descripcion"
                    className="w-full bg-gray-100 p-2 border border-gray-200 outline-none focus:border-gray-800 mt-2"
                    placeholder="Cambiar los colores..."
                    value={descripcion}
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="fechaEntrega"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Fecha de entrega del proyecto
                </label>

                <input
                    onChange={(e) => setFechaEntrega(e.target.value)}
                    id="fechaEntrega"
                    type="date"
                    className="w-full bg-gray-100 p-2 border border-gray-200 outline-none focus:border-gray-800 mt-2"
                    value={fechaEntrega}
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="cliente"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Cliente
                </label>

                <input
                    onChange={(e) => setCliente(e.target.value)}
                    id="cliente"
                    type="text"
                    className="w-full bg-gray-100 p-2 border border-gray-200 outline-none focus:border-gray-800 mt-2"
                    placeholder="Cambiar los colores..."
                    value={cliente}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer transition-colors"
                value={id ? 'Actualizar proyecto' : 'Crear proyecto'}
            />
        </form>
    )

}
