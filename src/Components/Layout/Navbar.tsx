import { HiPlusSm } from 'react-icons/hi'

interface Props {
    setShowForm: (showForm: boolean) => void
}

const Navbar: React.FC<Props> = ({ setShowForm }) => {
    return (
        <div className="fixed left-0 top-0 w-full h-12  flex items-center justify-between px-6 border-b border-slate-200">
            <p className="font-bold text-slate-700">Car<span className='text-blue-500'>DB</span></p>
            <button onClick={() => setShowForm(true)} className="flex items-center justify-center px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"><HiPlusSm className=''/>New</button>
        </div>
    )
}

export default Navbar