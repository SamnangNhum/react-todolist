
import api from '../api/data';
import { TodoContext } from '../context/todoContext';
import { useContext, useRef, useState } from 'react';

const TodoList = () => {
    const { value, setValue }: any = useContext(TodoContext);
    const [input , setInput] = useState<string>()
    const [updated, setUpdated] = useState(false);
    const [id, setId] = useState<string>();
    const [completed, setCompleted] = useState<boolean>();
    const inputRef = useRef<HTMLInputElement | null>(null)
    const handleDeleted = async (id: string) => {
        try {
            await api.delete(`/data/${id}`)
            console.log(id);
            setValue(value.filter((value: any) => value.id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    const handleCompleted = async (id: string, title: string, completed: boolean) => {
        try {
            let todoCompleted = { id, title: title, completed: !completed }
            const response = await api.put(`/data/${id}`, todoCompleted)
            setValue(value.map((value: any) => value.id === id ? { ...response.data } : value))

        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdated = async (id: string, title:string , completed: boolean) => {
        setUpdated(!updated)
        setId(id);
        setCompleted(completed)
        setInput(title)
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleEdited()
        }
    }

    
   
    const handleEdited = async () => {
        // @ts-ignore
        let userInput = inputRef.current.value
        if (userInput === '' || undefined || null) {
            alert('Please updated the task !');
            return;
        };
        let title = userInput;
        try {
            const newTodo = { id: id, title: title, completed: completed };
            const response = await api.put(`/data/${id}`, newTodo);
            setValue(value.map((value: any) => value.id === id ? { ...response.data } : value))
            // @ts-ignore 
            inputRef.current.value = "";
            setUpdated(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="todo  max-w-2xl mx-auto shadow-xl bg-white my-10 rounded-md ">
            {updated
                ?
                <div className=' mx-auto py-5 px-10 border-b rounded-md max-w-2xl bg-white '>
                    <div className='flex justify-center gap-3 '>
                        <input ref={inputRef} className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onKeyDown={handleKeyDown} defaultValue={input} ></input>
                        <button className="rounded bg-blue-500 hover:bg-blue-600 py-2 px-6 text-white" onClick={() => handleEdited()}>Save</button>
                    </div>
                </div>
                :
                <div className='px-5 py-7 border-b font-bold '>YOUR TASKS</div>
            }
            <div className='border-b '>
                {value?.map((todo: any) =>
                    <div className={todo.completed ? 'bg-slate-100  hover:cursor-pointer px-10' : 'px-10 hover:cursor-pointer'} key={todo.id}>
                        <div className='flex justify-between items-center  ' >
                            <div className={todo.completed ? "text-slate-400 w-3/4 line-through flex items-center py-6  " : " py-6 w-3/4 text-left text-black flex items-center"} onClick={() => handleCompleted(todo.id, todo.title, todo.completed)}>
                                <input type='checkbox' className="w-5 h-5 text-green-600 border-0 rounded-md focus:ring-0 " checked={todo.completed} readOnly />
                                <span className='px-4 text-lg font-400 capitalize'>{todo.title}</span>
                            </div>
                            <span className='flex items-center'>
                                <button className='rounded bg-green-500 hover:bg-green-600 py-2 px-2 text-white mx-3 z-0' >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={() => handleUpdated(todo.id , todo.title , todo.completed)}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </button>
                                <button className='rounded bg-red-500 hover:bg-red-600 py-2 px-2 text-white' onClick={() => handleDeleted(todo.id)} >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </span>
                        </div>
                    </div>
                )}
                <div className="py-5 font-semibold px-10 ">{value.length} Task</div>
            </div>
        </div>
    )

}

export default TodoList;