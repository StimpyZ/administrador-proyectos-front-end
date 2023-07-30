import { useState } from 'react'
import { toast } from 'react-toastify'
import useProyectos from '../hooks/useProyectos'

export default function FormularioColaborador () {

    const [email, setEmail] = useState('')
    const { submitColaborador } = useProyectos()

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (email === '') {

            toast.warning('El email es obligatorio')
            return

        }
        await submitColaborador(email)

    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white py-10 px-5 md:w-1/2 shadow">
            <label
                htmlFor="email"
                className="text-gray-600 font-bold text-sm uppercase"
            >
                Email del colaborador
            </label>
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <input type='submit' className='bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2 cursor-pointer text-white font-bold uppercase w-full mt-5' value='Buscar colaborador' />
        </form>
    )

}
