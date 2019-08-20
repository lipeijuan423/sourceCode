import React from "react";
const { useReducer, useContext, createContext } = React;
// 中间件
function middleWareLog() {

}

function reducerInAction(state, action) {
    if (typeof action.reducer == 'function') {
        return action.reducer(state);
    }
    return state;
}
export default function createStore(params) {
    // 全局数据的传递管理
    const Appcontext = createContext();
    const { initialState, reducer } = {
        reducer: reducerInAction,
        ...params
    }
    //处理action
    const middleWare = (lastState, action) => {
        // 业务
        // switch (action.type) {
        //     case 'init':
        //         return {
        //             ...lastState,
        //             age: lastState.age + 1
        //         };
        //         break;

        //     default:
        //         return {
        //             ...lastState
        //         }
        //         break;
        // }
        // 实现redcuer in action
        const nextState = reducer(lastState,action);
        store._state = nextState;
        return nextState;
    }
    // 新版redux状态管理机制
    const store = {
        _state: initialState,
        dispatch: undefined,
        getState: () => {
            // return state;
        },
        useContext: () => {
            return useContext(Appcontext);
        }
    }
    const Provider = props => {
        const [state, dispatch] = useReducer(middleWare, initialState);
        // dispatch通过hooks取得
        if (!store.dispatch) {
            store.dispatch = async (action) => {
                if (typeof action == 'function') {
                    await action(dispatch, store._state);
                } else {
                    dispatch(action);
                }
            }
        }
        return <Appcontext.Provider {...props} value={state}></Appcontext.Provider>
    }
    return {
        Provider,
        store
    }
}