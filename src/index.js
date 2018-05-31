import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import mainReducer, { initialState } from './reducers';
import registerServiceWorker from './registerServiceWorker';

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
        if (savedStore.__version === initialState.__version) {
            return savedStore;
        } else {
            // TODO: add migration scripts
        }
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
