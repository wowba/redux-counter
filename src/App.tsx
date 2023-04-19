import { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducer';

type Props = {
  value: any
  onIncrement: () => void
  onDecrement: () => void
}

function App({value, onIncrement, onDecrement}: Props) {

  const [todoValue, setTodoValue] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value)
  }
  const dispatch = useDispatch();

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: "ADD_TODO", text: todoValue})
    setTodoValue("")
  }

  const counter = useSelector((state: RootState) => state.counter)
  const todos: string[] = useSelector((state: RootState) => state.todos)

  return (
    <div className="App">
      {/* counter */}
      Clicked: {counter} times
      <button onClick={onIncrement}>
        +
      </button>
      <button onClick={onDecrement}>
        -
      </button>
      {/* todo */}
      <form onSubmit={addTodo}>
        <input type="text" value={todoValue} onChange={handleChange}/>
        <input type="submit" />
      </form>
      <ul>
        {todos.map((todo, index) => <li key={index}>{todo}</li>)}
      </ul>
    </div>
  );
}

export default App;
