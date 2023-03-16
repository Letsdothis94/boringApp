import { useState } from 'react'
import './Form.css'

function Form({ addTodo }){

    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(text)
        setText("");
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" className="textfield"
                value={text}
                onChange={e => setText(e.target.value)} />
            <input type="submit" className="submitBtn" value="Add" />
        </form>
    )
}

export default Form