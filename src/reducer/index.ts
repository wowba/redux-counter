import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";
import posts from "./post";

const rootReducer = combineReducers({
  counter,
  todos,
  posts
})

export default rootReducer

// useSelector에서 store의 타입 에러 해결
export type RootState = ReturnType<typeof rootReducer>