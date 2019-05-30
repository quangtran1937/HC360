import creatSagaMiddleware from 'redux-saga';

const sagaMiddleware = creatSagaMiddleware();
const middlewares = [
    sagaMiddleware
];

export { middlewares, sagaMiddleware };