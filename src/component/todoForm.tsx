
import { useContext, useEffect, useRef } from 'react'
import api from '../api/data';
import { v4 as uuid } from 'uuid';
import { TodoContext } from '../context/todoContext';

const TodoForm = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
     // @ts-ignore 
    const {value , setValue} = useContext(TodoContext)
  

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

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleClickEvent()
        }
    }

    const handleClickEvent = async () => {
        // @ts-ignore (us this comment if typescript raises an error)
        let userInput = inputRef.current.value
        if (userInput === '' || undefined || null) {
            alert('Please enter the task !');
            return;
        };
        for (let i in value)
            if (userInput.toLowerCase() === value[i].title) {
                alert('Duplicate Tasks');
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

  
    const handleEdit = async (id: string) => {

    }
    return (
        <>
            <div className=' mx-auto shadow-xl px-10 py-10 shadow-xl  rounded-md max-w-2xl bg-white my-10'>
                <h2 className="font-bold pb-2.5 ">TO DO LIST: </h2>
                <div className='flex justify-center gap-3 '>
                    <input ref={inputRef} className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onKeyDown={handleKeyDown}></input>
                    <button className="rounded bg-blue-500 hover:bg-blue-600 py-2 px-6 text-white" onClick={handleClickEvent}>Add</button>

                </div>
            </div>

        </>

    )
}

export default TodoForm;
