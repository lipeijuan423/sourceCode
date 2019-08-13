export default function combineReducers (reducers) {
    // reducers 是合并reduce-name
    // 例子: 
    // {counter: countReducer, 
    // info: infoReducer}
    const reducerKeys = Object.keys(reducers);
    return function combineation (state = {}, action) {
        const nextState = {};
        for (let item of reducerKeys) {
            // item : counter/info
            // reducer是countReducer(state, action)
            const reducer = reducers[item];
            // 匹配/执行reducer
            const previousStateForKey = state[item];
            const nextStateForKey = reducer(previousStateForKey,action);
            nextState[item] = nextStateForKey;
        }
        // 函数式编程-不能被修改,返回新对象
        return nextState;
    }
}