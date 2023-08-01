import { createContext, useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

let socket

export const ProyectoContext = createContext()

export default function ProyectoProvider ({ children }) {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState('')
    const navigate = useNavigate()
    const [proyecto, setProyecto] = useState({})
    const [tarea, setTarea] = useState({})
    const [colaborador, setColaborador] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [modalCerrarSesion, setModalCerrarSesion] = useState(false)
    const [buscador, setBuscador] = useState(false)

    useEffect(() => {

        const obtenerProyectos = async () => {

            try {

                setLoading(true)
                const token = localStorage.getItem('token')

                if (!token) return

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.get('/proyectos', config)
                setProyectos(data)

            } catch (error) {

                console.log(error)

            }
            setLoading(false)

        }

        obtenerProyectos()

    }, [])

    useEffect(() => {

        socket = io(import.meta.env.VITE_BACKEND_URL)

    }, [])

    const handleShowModalFormularioTarea = () => {

        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})

    }

    const submitProyecto = async (proyecto) => {

        if (proyecto.id) {

            await editarProyecto(proyecto)

        } else {

            await nuevoProyecto(proyecto)

        }

    }

    const editarProyecto = async (proyecto) => {

        try {

            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(
                `/proyectos/${proyecto.id}`,
                proyecto,
                config
            )

            const proyectosActualizados = proyectos.map((proyectoState) =>
                proyectoState._id === data._id ? data : proyectoState
            )

            setProyectos(proyectosActualizados)
            toast.success('Proyecto actualizado correctamente')
            setTimeout(() => {

                navigate('/proyectos')

            }, 4000)

        } catch (error) {

            console.log(error)

        }

    }

    const nuevoProyecto = async (proyecto) => {

        try {

            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(
                '/proyectos',
                proyecto,
                config
            )
            setProyectos([...proyectos, data])
            toast.success('Proyecto creado correctamente')
            setTimeout(() => {

                navigate('/proyectos')

            }, 4000)

        } catch (error) {

            console.log(error)

        }

    }

    const obtenerProyecto = async (id) => {

        setLoading(true)
        try {

            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.get(`/proyectos/${id}`, config)
            setProyecto(data)

        } catch (error) {

            setAlerta(error.response.data.msg)

        } finally {

            setLoading(false)

        }

    }

    const eliminarProyecto = async (id) => {

        setLoading(true)

        try {

            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(
                `/proyectos/${id}`,
                config
            )
            const proyectosActualizados = proyectos.filter(
                (proyecto) => proyecto._id !== id
            )
            setProyectos(proyectosActualizados)
            toast.success(data.msg)

            setTimeout(() => {

                navigate('/proyectos')

            }, 4000)

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)

        }

    }

    const submitTarea = async (tarea) => {

        if (tarea?.id) {

            await editarTarea(tarea)

        } else {

            await nuevaTarea(tarea)

        }

    }

    const editarTarea = async (tarea) => {

        setLoadingModal(true)

        try {

            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(
                `/tareas/${tarea.id}`,
                tarea,
                config
            )

            socket.emit('editar-tarea', data)
            toast.success('Tarea actualizada correctamente')
            setModalFormularioTarea(false)

        } catch (error) {

            toast.error(error.response.data.msg)

        } finally {

            setLoadingModal(false)

        }

    }

    const nuevaTarea = async (tarea) => {

        setLoadingModal(true)

        try {

            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/tareas', tarea, config)
            toast.success('Tarea creada correctamente')
            setModalFormularioTarea(false)

            socket.emit('nueva-tarea', data)

        } catch (error) {

            toast.error(error.response.data.msg)

        }

        setLoadingModal(false)

    }

    const eliminarTarea = async (id) => {

        try {

            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/tareas/${id}`, config)

            socket.emit('eliminar-tarea', tarea)

            setModalEliminarTarea(false)
            toast.success(data.msg)

        } catch (error) {

            toast.error(error.response.data.msg)

        }

    }

    const handleModalEditarTarea = (tarea) => {

        setTarea(tarea)
        setModalFormularioTarea(true)

    }

    const handleModalEliminarTarea = (tarea) => {

        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)

    }

    const handleEliminarColaborador = (colaborador) => {

        setColaborador(colaborador)
        setModalEliminarColaborador(!modalEliminarColaborador)

    }
    const handleBuscador = () => {

        setBuscador(!buscador)

    }

    const handleModalCerrarSesion = () => {

        setModalCerrarSesion(!modalCerrarSesion)

    }

    const submitColaborador = async (email) => {

        setLoading(true)
        try {

            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(
                '/proyectos/colaboradores',
                { email },
                config
            )
            setColaborador(data)

        } catch (error) {

            toast.error(error.response.data.msg)
            setColaborador({})

        } finally {

            setLoading(false)

        }

    }

    const agregarColaborador = async (email) => {

        try {

            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(
                `/proyectos/colaboradores/${proyecto._id}`,
                { email },
                config
            )
            toast.success(data.msg)
            setColaborador({})
            setTimeout(() => {

                navigate(`/proyectos/${proyecto._id}`)

            }, 2000)

        } catch (error) {

            toast.error(error.response.data.msg)

        }

    }

    const eliminarColaborador = async (id) => {

        try {

            const token = localStorage.getItem('token')

            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(
                `/proyectos/eliminar-colaborador/${proyecto._id}`,
                { id },
                config
            )
            const colaboradoresActualizados = proyecto.colaboradores?.filter(
                (colaborador) => colaborador._id !== id
            )
            setProyecto({
                ...proyecto,
                colaboradores: colaboradoresActualizados
            })
            toast.success(data.msg)
            setColaborador({})
            setModalEliminarColaborador(false)

        } catch (error) {

            console.log(error)

        }

    }

    const completarTarea = async id => {

        try {

            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)
            setTarea({})
            setAlerta({})
            socket.emit('cambiar estado', data)
            window.location.reload()

        } catch (error) {

            console.log(error.response)

        }

    }

    const sumbitTareasProyecto = (tarea) => {

        const tareasActualizadas = [...proyecto.tareas, tarea]
        setProyecto({ ...proyecto, tareas: tareasActualizadas })

    }

    const eliminarTareaProyecto = (tarea) => {

        const tareasActualizadas = proyecto.tareas.filter(
            (tareaState) => tareaState._id !== tarea._id
        )
        setProyecto({ ...proyecto, tareas: tareasActualizadas })

    }

    const editarTareaProyecto = (tarea) => {

        const tareasActualizadas = proyecto.tareas.map((tareaState) =>
            tareaState._id === tarea._id ? tarea : tareaState
        )
        setProyecto({ ...proyecto, tareas: tareasActualizadas })

    }

    const completarTareaProyecto = (tarea) => {

        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)

    }

    const cerrarSesionProyectos = () => {

        setProyectos([])
        setProyecto({})
        setAlerta({})

    }

    return (
        <ProyectoContext.Provider
            value={{
                proyectos,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                loading,
                eliminarProyecto,
                modalFormularioTarea,
                handleShowModalFormularioTarea,
                submitTarea,
                loadingModal,
                handleModalEditarTarea,
                tarea,
                handleModalEliminarTarea,
                modalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                agregarColaborador,
                alerta,
                handleEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador,
                completarTarea,
                handleBuscador,
                buscador,
                sumbitTareasProyecto,
                eliminarTareaProyecto,
                editarTareaProyecto,
                completarTareaProyecto,
                cerrarSesionProyectos,
                handleModalCerrarSesion,
                modalCerrarSesion
            }}
        >
            {children}
        </ProyectoContext.Provider>
    )

}
