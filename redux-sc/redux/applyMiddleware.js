import compose from './compose.js';
const applyMiddleware = function (...middlewares) {
    return function (oldCreateStore) {
        return function newCreateStore(reducer, initState) {
            const store = oldCreateStore(reducer, initState);
            // let dispatch = store.dispatch;
            // 重写dispatch
            const chain = middlewares.map(middleware => middleware(store));
            console.log('chain', chain);
            // middleware是每一种中间件
            // chain.reverse().map(middleware => {
            //     // console.log(middleware, 'middles')
            //     // console.log(dispatch, 'pppp')
            //     dispatch = middleware(dispatch);
            //     // console.log(dispatch, 'dddd')
            // })
            // console.log('生成的结果', dispatch);
            // store.dispatch = dispatch;
            // return store;
            const dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}
export default applyMiddleware;