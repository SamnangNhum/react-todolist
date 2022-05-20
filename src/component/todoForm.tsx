
import { useEffect, useState } from 'react'
import TodoList from './todoList';
import api from '../api/data';
import { v4 as uuid } from 'uuid';


const TodoForm = () => {
    interface data {
        id: number,
        title: string,
        completed: boolean
    }
    let userInput = '';
    const [value, setValue] = useState<data[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/data')
                setValue(response.data)

            } catch (err) {

            }
        }

        fetchData()
    }, [])

    const getInputValue = (e: any) => {
        userInput = e.target.value
    }

    const handleClickEvent = async (e: any) => {
        if(userInput === '' || undefined || null) return ;
        let id = uuid();
        let title = userInput;
        let completed = false;
        const newTodo = { id, title, completed }
        try {
            const response = await api.post('/data', newTodo)
            setValue([...value, response.data])
       
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className='flex justify-center w-6/12 mx-auto'>
                <input className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={getInputValue}></input>
                <button className="py-2 px-4 bg-teal-500" onClick={handleClickEvent}>Add</button>
                
            </div>
            <TodoList value={value} />
        </>

    )
}

export default TodoForm;
