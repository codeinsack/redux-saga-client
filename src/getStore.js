import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable'
import thunk from 'redux-thunk'

import { getQuery } from './utility'
import { reducer } from './combineReducers';
import { defaultState } from './defaultState'
import createSagaMiddleware from 'redux-saga'
import { initSagas } from './initSagas'

const stateTransformer = (state) => {
    if (Iterable.isIterable(state)) return state.toJS();
    else return state;
};

const logger = createLogger({
    stateTransformer,
});

export const getStore = ()=>{
    const sageMiddleware = createSagaMiddleware();
    const middleWares = [sageMiddleware, thunk];
    if (getQuery()['logger']) { middleWares.push(logger)}
    const composables = [applyMiddleware(...middleWares)]
    const enhancer = compose(
        ... composables
    );
    const store = createStore(
        reducer,
        defaultState,
        enhancer
    );
    initSagas(sageMiddleware)
    return store;
};
