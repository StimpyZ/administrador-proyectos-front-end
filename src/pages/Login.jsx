import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

export default function Login () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { alerta, setAlerta, setAuth, setCargando } = useAuth()

    const handleSubmit = async (e) => {

        e.preventDefault()

        if ([email, password].includes('')) {

            setAlerta({
                error: true,
                msg: 'Todos los campos son obligatorios'
            })

        }

        try {

            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            setAlerta({})
            localStorage.setItem('token', data.token)
            setAuth(data)
            setCargando(true)
            setTimeout(() => {

                window.location.href = '/proyectos'

            }, 2)

        } catch (error) {

            setAlerta({
                error: true,
                msg: error.response.data.msg
            })

        } finally {

            setCargando(false)

        }

    }

    const { msg } = alerta

    return (
        <>
            <h1 className="text-center text-sky-600 font-bold text-6xl">
                Inicia sesion y administra tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>
            {msg && <Alerta alerta={alerta} />}
            <form
                onSubmit={handleSubmit}
                className="my-10 px-10 py-5 bg-white shadow rounded-lg">
                <div className="my-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="example@hotmail.com"
                        id="email"
                        value={email}
                    />
                </div>

                <div className="my-5">
                    <label
                        htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Contraseña
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="example@hotmail.com"
                        id="password"
                        value={password}
                    />
                </div>

                <input
                    type="submit"
                    className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-sky-600 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors duration-300 mb-5"
                    value="Iniciar sesion"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to="/registrar"
                    className="block text-center text-sky-800"
                >
                    ¿No tienes una cuenta? !Registrate¡
                </Link>

                <Link
                    to="/olvide-password"
                    className="block text-center text-sky-800"
                >
                    Olvide mi contraseña
                </Link>
            </nav>
        </>
    )

}
