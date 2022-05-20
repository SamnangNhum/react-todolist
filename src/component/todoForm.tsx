
import { useEffect, useRef, useState } from 'react'
import TodoList from './todoList';
import api from '../api/data';
import { v4 as uuid } from 'uuid';
import data from '../interface/data';

const TodoForm = () => {
    const inputRef = useRef(null);
    let userInput = '';
    const [value, setValue] = useState<data[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/data')
                setValue(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])



    const handleClickEvent = async (e: any) => {
        // @ts-ignore (us this comment if typescript raises an error)
        let userInput = inputRef.current.value
        if (userInput === '' || undefined || null) {
            alert('Please enter the task !');
            return;
        };
        for (let i in value)
            if (userInput === value[i].title) {
                alert('Duplicated Task');
                return;
            }
        let id = uuid();
        let title = userInput;
        let completed = false;
        const newTodo = { id, title, completed }
        try {
            const response = await api.post('/data', newTodo)
            setValue([...value, response.data])
            // @ts-ignore (us this comment if typescript raises an error)
            inputRef.current.value = "";
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className='flex justify-center w-6/12 mx-auto'>
                <input ref={inputRef} className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ></input>
                <button className="py-2 px-4 bg-teal-500" onClick={handleClickEvent}>Add</button>

            </div>
            <TodoList value={value} />
        </>

    )
}

export default TodoForm;
