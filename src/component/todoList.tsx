
import api from '../api/data';
import { TodoContext } from '../context/todoContext';
import { useContext } from 'react';
import { title } from 'process';

const TodoList = () => {
    const { value, setValue }: any = useContext(TodoContext);
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
    return (
        <div className="todo  max-w-2xl mx-auto shadow-xl bg-white my-10 rounded-md ">
            <div className='p-5 border-b font-bold '>YOUR TASKS</div>
            <div className='border-b '>
                {value?.map((todo: any) =>
                    <div className={todo.completed ? 'bg-slate-100 px-10' : 'px-10'}>
                        <div className='flex justify-between items-center py-3' key={todo.id}>
                            <div className={todo.completed ? "text-slate-400 w-1/2 line-through" : "w-1/2 text-left text-black"  }>{todo.title}</div>
                            <span className='flex items-center'>
                                <button className='rounded bg-green-500 hover:bg-green-600 py-2 px-2 text-white mx-3' >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={() => handleCompleted(todo.id, todo.title, todo.completed)}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
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
                <div className="py-5 font-semibold px-10 ">{value.length} Task Pending</div>
            </div>
        </div>
    )

}

export default TodoList;