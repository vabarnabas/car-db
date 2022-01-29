import { getCurrentDateTime } from '../../Services/getCurrentDateTime'

interface Props {
    carList: string[][]
}

const Table: React.FC<Props> = ({ carList }) => {
    return (
        <div className="w-full h-full flex items-center justify-center py-12 px-6 text-slate-700">
            <div className="w-full md:flex md:items-center md:justify-center overflow-x-auto">
            <table className='border border-slate-300'>
                <tbody>
                {carList.map((row, index) => (
                    <tr key={index} className="border border-slate-300 first:font-bold">
                        {row.map((item, subIndex) => (
                            <td key={subIndex} className="border border-slate-300 px-4 py-2 text-center capitalize">{index !== 0 && subIndex === 5 ? getCurrentDateTime(parseInt(item)) : item}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Table