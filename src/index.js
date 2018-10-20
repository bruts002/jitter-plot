import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import mainReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import migrate from './migrations';

// TODO:
// 1. Move away from redux to Provider/Consumer
// 2. Add theme provider
// 3. refactor css
// 4. make into easily reusable component
// 5. publish in npm

const localStorageMiddleWare = ({getState}) => {
    return next => action => {
        const result = next(action);
        localStorage.setItem('reduxState', JSON.stringify(getState()))
        return result;
    };
};

const reHydrateStore = () => {
    if (localStorage.getItem('reduxState') !== null) {
        const savedStore = JSON.parse(localStorage.getItem('reduxState'));
        return migrate(savedStore);
    } 
};

const store = createStore(
    mainReducer,
    reHydrateStore(),
    applyMiddleware(localStorageMiddleWare)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
