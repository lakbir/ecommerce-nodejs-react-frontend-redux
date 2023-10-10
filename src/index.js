import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './router/Routes';
import './style.css'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './reducers';

const root = ReactDOM.createRoot(document.getElementById('root'));

let store = createStore(rootReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>
);
