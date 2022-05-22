
import { useEffect, useRef, useState } from 'react'
import api from '../api/data';
import { v4 as uuid } from 'uuid';
import data from '../interface/data';

const TodoForm = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

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

    const handleDeleted = async (id: string) => {
        try {
            await api.delete(`/data/${id}`)
            console.log(id);
            setValue(value.filter(value => value.id !== id))

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

            <div className="todo  max-w-2xl mx-auto shadow-xl bg-white my-10 rounded-md ">
                <div className='p-5 border-b font-bold '>YOUR TASKS</div>
                <div className='px-10 border-b '>
                    {value?.map((home: any) =>
                        <div className='flex justify-between items-center py-3' key={home.id}>
                            <div className="w-1/2 text-left text-black ">{home.title}</div>
                            <span className='flex items-center'>
                                <button className='rounded bg-green-500 hover:bg-green-600 py-2 px-2 text-white mx-3' >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </button>
                                <button className='rounded bg-red-500 hover:bg-red-600 py-2 px-2 text-white' onClick={() => handleDeleted(home.id)} >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </span>
                        </div>
                    )}
                    <div className="py-5 font-semibold ">{value.length} Task Pending</div>
                </div>

            </div>
        </>

    )
}

export default TodoForm;
