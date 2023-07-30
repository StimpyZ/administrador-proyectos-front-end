import { createContext, useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import Spinner from '../components/Spinner'

export const AuthContext = createContext()

export default function AuthProvider ({ children }) {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    useEffect(() => {

        const autenticarUsuario = async () => {

            const token = localStorage.getItem('token')
            if (!token) {

                setCargando(false)
                return

            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {

                setCargando(true)
                const { data } = await clienteAxios.get('/usuarios/perfil', config)
                setAuth({ data })
                // navigate('/proyectos')

            } catch (error) {

                setAuth({})

            } finally {

                setCargando(false)

            }

        }

        autenticarUsuario()

    }, [])

    const cerrarSesionAuth = () => {

        setAuth({})

    }

    if (cargando) return <Spinner />

    return (
        <AuthContext.Provider value={{
            auth,
            setAlerta,
            alerta,
            cargando,
            setCargando,
            setAuth,
            cerrarSesionAuth
        }}>
            {children}
        </AuthContext.Provider>
    )

}
