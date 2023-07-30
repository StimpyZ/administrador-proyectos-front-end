import clienteAxios from '../config/clienteAxios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'

export default function ConfirmarCuenta () {

    const { alerta, setAlerta } = useAuth()
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const params = useParams()

    const { id } = params

    useEffect(() => {

        const confirmarCuenta = async () => {

            try {

                const { data } = await clienteAxios.get(`/usuarios/confirmar/${id}`)
                setAlerta({
                    error: false,
                    msg: data.msg
                })
                setCuentaConfirmada(true)

            } catch (error) {

                setAlerta({
                    error: true,
                    msg: error.response.data.msg
                })

            }

        }

        confirmarCuenta()

    }, [])

    const { msg } = alerta

    return (
        <>
            <h1 className="text-center text-sky-600 font-bold text-6xl">
                Confirma tu cuenta y comienza a crear tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            <div className='mt-5 md:mt-20 shadow-lg px-5 py-10 rounded-lg bg-white'>
                {msg && <Alerta alerta={alerta} />}

                {cuentaConfirmada && (
                    <Link
                        to="/"
                        className="block text-center text-sky-800"
                    >
                    Inicia sesion
                    </Link>
                )}
            </div>
        </>
    )

}
