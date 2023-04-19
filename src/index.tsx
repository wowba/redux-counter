import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log("store", store)
  console.log("action", action)
  next(action) // 다음 동작으로 이동
}

const middleware = applyMiddleware(loggerMiddleware); 

const store = createStore(rootReducer, middleware);

const render = () => root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App 
        value={store.getState().counter}
        // Action을 dispatch 하여 Redux Store에서 특정 Action을 인식한다.
        onIncrement={() => store.dispatch({type: "INCREMENT"})}
        onDecrement={() => store.dispatch({type: "DECREMENT"})}
      />
    </Provider>
  </React.StrictMode>
);

render()
// 리듀서를 확인하기 위해 subscribe 해줘야한다. 아니면 컴포넌트가 변경되지 않는다.
store.subscribe(render)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
