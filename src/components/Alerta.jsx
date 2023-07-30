export default function Alerta ({ alerta }) {

    return (
        <div
            className={`${
                alerta.error
                    ? 'bg-red-300 border-l-4 border-red-500'
                    : 'bg-sky-300 border-l-4 border-sky-500'
            } text-center p-4 uppercase text-white font-bold text-sm my-10`}
        >
            {alerta.msg}
        </div>
    )

}
