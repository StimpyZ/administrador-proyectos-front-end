import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'

export default function OlvidePassword () {

    const [email, setEmail] = useState('')
    const { alerta, setAlerta } = useAuth()

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (email === '') {

            setAlerta({
                error: true,
                msg: 'El email es obligatorio'
            })
            return

        }

        try {

            const { data } = await clienteAxios.post('/usuarios/olvide-password', { email })

            toast.success(data.msg)

        } catch (error) {

            toast.error(error.response.data.msg)

        }

    }

    const { msg } = alerta

    return (
        <>
            <h1 className="text-center text-sky-600 font-bold text-6xl">
                Recupera tu acceso para administrar tus{' '}
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

                <input
                    type="submit"
                    className="w-full mt-3 p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-sky-600 text-white uppercase font-bold hover:bg-sky-700 cursor-pointer transition-colors duration-300 mb-5"
                    value="Enviar correo de recuperacion"
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
                    to="/"
                    className="block text-center text-sky-800"
                >
                    ¿Ya tienes una cuenta? !Inicia sesion¡
                </Link>
            </nav>
        </>
    )

}
