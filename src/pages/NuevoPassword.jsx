import clienteAxios from '../config/clienteAxios'
import { useEffect, useState } from 'react'
import Alerta from '../components/Alerta'
import { Link, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function NuevoPassword () {

    const { alerta, setAlerta } = useAuth()
    const [password, setPassword] = useState('')
    const [passwordModificada, setPasswordModificada] = useState(false)
    const [tokenValido, setTokenValido] = useState(false)
    const params = useParams()
    const { token } = params

    useEffect(() => {

        const comprobarToken = async () => {

            try {

                await clienteAxios.get(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)

            } catch (error) {

                setAlerta({
                    error: true,
                    msg: error.response.data.msg
                })

            }

        }

        comprobarToken()

    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (password === '' || password.length < 6) {

            setAlerta({
                error: true,
                msg: 'La contraseña es obligatoria y debe tener al menos 6 caracteres'
            })
            return

        }

        try {

            const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password }
            )

            setPasswordModificada(true)

            setAlerta({
                error: false,
                msg: data.msg
            })

        } catch (error) {

            setAlerta({
                error: true,
                msg: error.response.data.msg
            })

        }

    }

    const { msg } = alerta

    return (
        <>
            <h1 className="text-center text-sky-600 font-bold text-6xl">
                Reestablece tu contraseña y no pierdas acceso a tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            {tokenValido && (
                <form
                    onSubmit={handleSubmit}
                    className="my-10 px-10 py-5 bg-white shadow rounded-lg"
                >
                    <div className="my-5">
                        <label
                            htmlFor="password"
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Nueva contraseña
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                            placeholder="********"
                            id="password"
                            value={password}
                        />
                    </div>

                    <input
                        type="submit"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-sky-600 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors duration-300 mb-5"
                        value="Reestablecer contraseña"
                    />
                </form>
            )}

            {passwordModificada && (
                <Link to="/" className="block text-center text-sky-800">
                    Inicia sesion
                </Link>
            )}
        </>
    )

}
