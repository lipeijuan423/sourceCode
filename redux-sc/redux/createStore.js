
export default function createStore(reducer, initState, rewriteCreateStore) {
    if (rewriteCreateStore) {
        const newCreateStore =  rewriteCreateStore(createStore);
        return newCreateStore(reducer, initState);
    }
    let state = initState;
    let listeners = [];
    function getState() {
        return state;
    }
    function subscribe(listener) {
        listeners.push(listener);
    }
    function dispatch(action) {
        state = reducer(state, action);
        // 通知
        for (let listener of listeners) {
            listener();
        }
    }
    function replaceReducer (nextReducer) {
        reducer = nextReducer;
        dispatch({ type: Symbol() })
    }
    // 没传initState,默认合成所有reducer状态
    dispatch({type: Symbol()})
    return {
        replaceReducer,
        getState,
        subscribe,
        dispatch
    }
}