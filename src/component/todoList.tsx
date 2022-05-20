
import data from '../interface/data';

const TodoList = ({ value }: data[] | any) => {
    return (
        <>
            <div className="todo text-stone-50 text-center">{value?.map((home: any) =><div key={home.id}>{home.title}<button>Edit</button><button>Deleted</button></div>)}</div>
        </>
    )
}

export default TodoList;