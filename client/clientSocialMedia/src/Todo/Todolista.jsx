import Listitem from '../Todo/Listitem'
import './Todolista.css'

function Todolista({ todos, removeTodo }) {
    return (
        <div className="todo-list">
            {
                todos.map((todo, idx) => {
                    return (
                        <Listitem text={todo} key={idx} removeTodo={() => { removeTodo(idx) }} />
                    )
                })
            }
        </div>
    )
}

export default Todolista;