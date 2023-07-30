import { useContext } from 'react'
import { ProyectoContext } from '../context/ProyectoContext'

export default function useProyectos () {

    return useContext(ProyectoContext)

}
