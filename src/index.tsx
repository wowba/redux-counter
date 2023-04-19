import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import counter from './reducer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = createStore(counter);

const render = () => root.render(
  <React.StrictMode>
    <App 
      value={store.getState()}
      // Action을 dispatch 하여 Redux Store에서 특정 Action을 인식한다.
      onIncrement={() => store.dispatch({type: "INCREMENT"})}
      onDecrement={() => store.dispatch({type: "DECREMENT"})}
    />
  </React.StrictMode>
);

render()
// 리듀서를 확인하기 위해 subscribe 해줘야한다. 아니면 컴포넌트가 변경되지 않는다.
store.subscribe(render)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
