import { createStore, combineReducers, bindActionCreators } from './redux/index.js';
import countReducer from './reducers/counter.js';
import infoReducer from './reducers/info.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js';
import timeMiddleware from './middlewares/timeMiddleware.js';
import applyMiddleware from './redux/applyMiddleware.js';
import {incerment} from './actions/count.js';

// 不传怎么办
let initState = {
    counter: {
        count: 0,
    },
    info: {
        name: '',
        description: ''
    }
}
// 中间件
const reducer = combineReducers({
    counter: countReducer,
    info: infoReducer
});
const rewriteCreateStore = applyMiddleware(timeMiddleware, loggerMiddleware);
let store = createStore(reducer, initState, rewriteCreateStore);
// const logger = loggerMiddleware(store);
// const time = timeMiddleware(store);
// 原有dispatch引用
// let next = store.dispatch;
// 洋葱代码 -  柯里化函数 + 函数组合
// store.dispatch = time(logger(next)); 
// 重新加一个reducer
// const nextReducer = combineReducers({
//     counter: countReducer,
//     info: infoReducer
// })
// store.replaceReducer(nextReducer);
store.subscribe(() => {
    let state = store.getState();
    console.log('获取当前状态', state);
})
// store.dispatch({
//     ...store.getState(),
//     info: {
//         name: 'lpj',
//         description: 'redux'
//     }
// })
// store.dispatch({
//     type: 'INCERMENT'
// })
// store.dispatch({
//     type: 'SET_NAME',
//     name: 'lpj'
// })
const actions = bindActionCreators({ incerment}, store.dispatch);
actions.incerment();