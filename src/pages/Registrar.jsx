import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

export default function Registrar () {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const { alerta, setAlerta } = useAuth()

    const handleSubmit = async e => {

        e.preventDefault()

        if ([nombre, email, password, password2].includes('')) {

            setAlerta({
                error: true,
                msg: 'Todos los campos son obligatorios'
            })

            return

        }

        if (password !== password2) {

            setAlerta({
                error: true,
                msg: 'Las contraseñas no coinciden'
            })

            return

        }

        if (password.length < 6) {

            setAlerta({
                error: true,
                msg: 'La contraseña debe tener al menos 6 caracteres'
            })

            return

        }

        setAlerta({})

        try {

            const { data } = await clienteAxios.post('/usuarios', {
                nombre,
                email,
                password
            })

            setAlerta({
                error: false,
                msg: data.msg
            })

            setEmail('')
            setNombre('')
            setPassword('')
            setPassword2('')

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
                Crea una cuenta y administra tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            <form
                onSubmit={handleSubmit}
                className="my-10 px-10 py-5 bg-white shadow rounded-lg">

                <div className="my-5">
                    <label
                        htmlFor="name"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Nombre
                    </label>
                    <input
                        onChange={e => setNombre(e.target.value)}
                        value={nombre}
                        type="text"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="Juan, Pedro, Maria..."
                        id="name"
                    />
                </div>

                <div className="my-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="example@hotmail.com"
                        id="email"
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
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="********"
                        id="password"
                    />
                </div>

                <div className="my-5">
                    <label
                        htmlFor="password2"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Repite la contraseña
                    </label>
                    <input
                        onChange={e => setPassword2(e.target.value)}
                        value={password2}
                        type="password"
                        className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        placeholder="********"
                        id="password2"
                    />
                </div>

                <input
                    type="submit"
                    className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-sky-600 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors duration-300 mb-5"
                    value="Crear cuenta"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    to="/"
                    className="block text-center text-sky-800"
                >
                    ¿Ya tienes una cuenta? !Inicia sesion¡
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
