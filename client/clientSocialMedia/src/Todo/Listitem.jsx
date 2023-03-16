import './Listitem.css'
function Listitem({ text, removeTodo }) {
    return (
        <div className="list-item">
            <p>{text}</p>
            <button className="checkbox" onClick={removeTodo}></button>
        </div>
    )
}

export default Listitem