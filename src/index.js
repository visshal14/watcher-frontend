import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from './reduxStore';
// 135648070728-6odnu4geph64ues3ahla9q0d6ffdu0r7.apps.googleusercontent.com
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={reduxStore}>
    <App />
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

