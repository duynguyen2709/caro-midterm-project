import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './reducers/RootReducer';
import apiReducer from './reducers/ApiReducer';
import onlineGameReducer from './reducers/OnlineGameReducer';

import './index.css';
import AppWrapper from "./utils/AppWrapper";

const reducers = combineReducers({
    root: rootReducer,
    api: apiReducer,
    online: onlineGameReducer
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}>
        <AppWrapper/>
    </Provider>,
    document.getElementById('root'));