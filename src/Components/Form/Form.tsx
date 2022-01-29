import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Inputs } from '../../Types/Types';
import { HiX, HiMinusCircle, HiDocumentAdd } from 'react-icons/hi'

interface Props {
    setShowForm: (showForm: boolean) => void,
    renderCount: number,
    setRenderCount: (renderCount: number) => void,
}

const Form: React.FC<Props> = ({ setShowForm, renderCount, setRenderCount }) => {
    
    const schema = Yup.object().shape({
        manufacturer: Yup.string().required('Missing argument.'),
        type: Yup.string().required('Missing argument.'),
        capacity: Yup.number().required('Missing argument.').typeError('Missing argument.'),
        color: Yup.string().required('Missing argument.'),
        model: Yup.string().required('Missing argument.'),
        date: Yup.date().required('Missing argument.').typeError('Missing argument.'),
        webpage: Yup.string().notRequired().nullable()
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({ resolver: yupResolver(schema) })

    const onSubmit = (data: Inputs) => {
        console.log(JSON.stringify(data, null, 2))
        fetch('https://us-central1-car-db-339621.cloudfunctions.net/app/cars/add',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data, null, 2)
        })
        .finally(() => {
            setRenderCount(renderCount+1);
            setShowForm(false);
            reset();
        })
    };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-600 bg-opacity-50">
            <form onSubmit={handleSubmit(onSubmit)} action="" className="relative bg-white px-8 py-8 rounded-lg text-slate-600">
                <HiX onClick={() => setShowForm(false)} className='absolute right-3 top-3' />
                <p className="font-bold text-xl mb-4">Add New Car</p>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <input {...register('manufacturer')} placeholder="Manufacturer*" type="text" className="input-box" />
                        <p className="text-xs pl-4 text-pink-500">{errors.manufacturer?.message}</p>
                    </div>
                    <div className="flex flex-col">
                        <input {...register('type')} placeholder="Type*" type="text" className="input-box" />
                        <p className="text-xs pl-4 text-pink-500">{errors.type?.message}</p>
                    </div>
                    <div className="flex flex-col">
                        <input {...register('capacity')} placeholder="Capacity*" type="number" className="input-box" />
                        <p className="text-xs pl-4 text-pink-500">{errors.capacity?.message}</p>
                    </div>
                    <div className="flex flex-col">
                        <input {...register('color')} placeholder="Color*" type="text" className="input-box" />
                        <p className="text-xs pl-4 text-pink-500">{errors.color?.message}</p>
                    </div>
                    <div className="flex flex-col">
                        <input {...register('model')} placeholder="Model*" type="text" className="input-box" />
                        <p className="text-xs pl-4 text-pink-500">{errors.model?.message}</p>
                    </div>
                    <div className="flex flex-col">
                        <input {...register('date')} placeholder="Model*" type="date" className="input-box" />
                        <p className="text-xs pl-4 text-pink-500">{errors.date?.message}</p>
                    </div>
                    <div className="sm:col-span-2 flex flex-col">
                        <input {...register('webpage')} placeholder="Webpage" type="url" className="input-box" />
                        <p className="text-xs pl-4 text-pink-500">{errors.webpage?.message}</p>
                    </div>
                    <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-1 text-sm rounded-lg"><HiDocumentAdd className='mr-1' /> Create</button>
                    <button onClick={() => reset()} className="flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white py-1 text-sm rounded-lg"><HiMinusCircle className='mr-1' />Reset</button>
                </div>
            </form>
        </div>
    )
}

export default Form