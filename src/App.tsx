import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducer';
import axios from 'axios';
import { Post } from './reducer/post';

type Props = {
  onIncrement: () => void
  onDecrement: () => void
}

function App({onIncrement, onDecrement}: Props) {

  const [todoValue, setTodoValue] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value)
  }
  const dispatch = useDispatch();

  // dispatch 로 액션을 보내 state 변경
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: "ADD_TODO", text: todoValue})
    setTodoValue("")
  }

  useEffect(() => {
    // redux-thunk를 통해 dispatch 안에 들어갈 자바스크립트 객체를
    // 함수로 넣을 수 있게 해준다.
    dispatch(fetchPosts())
  }, [dispatch])

  const fetchPosts = (): any => async (dispatch: any, getState: any) => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
    dispatch({ type: "FETCH_POSTS", payload: response.data})
  }

  // state에서 useSelector로 값 가져오기
  const counter = useSelector((state: RootState) => state.counter)
  const todos: string[] = useSelector((state: RootState) => state.todos)
  const posts: Post[] = useSelector((state: RootState) => state.posts)

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
      {/* post */}
      <ul>
        {posts.map((post, index) => <li key={index}>{post.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
