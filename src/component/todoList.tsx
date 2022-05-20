import React from 'react'

const TodoList = ({ value }: any) => {
    return (
        <>
            <div className="todo text-stone-50 text-center">{value?.map((home: any) =><div key={home.id}>{home.title}<button>Edit</button><button>Deleted</button></div>)}</div>

        </>

    )
}

export default TodoList;