
import data from '../interface/data';
import api from '../api/data';
import { useState } from 'react';

const TodoList = ({ value }: data[] | any ) => {
   
      
    // const handleDeleted = async (id:any) => {
    //     let id1 =  "251edc88-96eb-43c1-b811-b13844a0ad17";
    //     try {
    //         console.log('delted')
    //         await api.delete(`/data/${id1}`)
    //         setState((value:any) => value.id != id1)
           
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    return (
        

        <div className="todo text-stone-50 text-center max-w-2xl mx-auto shadow-xl bg-white my-10 rounded p-10 ">
            {value?.map((home: any) =>
            <div className='flex py-3' key={home.id} >
            
            <div className="w-3/4 text-left text-black ">{home.title}</div>
            <div>
            <button className='rounded bg-red-500 hover:bg-red-700 py-2 px-6 text-white'>V</button>
            <button className='rounded bg-yellow-500 hover:bg-yellow-700 py-2 px-6 text-white' > X</button>
            </div>
           
            
            </div>
         
         )}
        </div>
        
    )

}

export default TodoList;