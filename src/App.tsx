import { useEffect, useState } from "react"
import Navbar from "./Components/Layout/Navbar"
import Table from "./Components/Table/Table"
import Form from './Components/Form/Form'

const App = () => {
    const [carList, setCarList] = useState<string[][]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [renderCount, setRenderCount] = useState<number>(0)

    useEffect(() => {
        fetch('https://us-central1-car-db-339621.cloudfunctions.net/app/cars')
        .then(res => res.json())
        .then(data => setCarList([...data]))
    },[renderCount])

    return (
        <div className="w-screen h-screen select-none">
            <Navbar setShowForm={(showForm: boolean) => setShowForm(showForm)} />
            <Table carList={carList}/>
            {showForm ? <Form renderCount={renderCount} setRenderCount={(renderCount: number) => setRenderCount(renderCount)} setShowForm={(showForm: boolean) => setShowForm(showForm)} /> : ''}
        </div>
    )
}

export default App