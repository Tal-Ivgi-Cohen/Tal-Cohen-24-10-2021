import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { weatherReducer } from './weather.reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    weatherModule: weatherReducer,
});


export const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
