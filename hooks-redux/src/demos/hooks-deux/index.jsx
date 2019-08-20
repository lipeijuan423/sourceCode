import React from 'react';
import hooksRedux from './hooks-redux';
const { Provider, store } = hooksRedux({
    initialState: {
        name:'lpj',
        age: 0
    }
})
// 同步action
// function actionAdd() {
//     return {
//         type: 'init',
//         // reducer in action
//         reducer(state){
//             return {
//                 ...state, age: state.age + 1
//             }
//         }
//     }
// }
function timeoutAdd(a) {
    return new Promise(cb => setTimeout(() => cb(a + 1), 500))
}
// 异步Action
const  actionAdd = () => async (dispatch, ownState) => {
    const age = await timeoutAdd(ownState.age);
    dispatch({
        type: 'asyncAdd',
        reducer(state){
            return {...state, age}
        }
    })
}
function Button () {
    function handleAdd () {
        store.dispatch(actionAdd())
    }
    return <button onClick={handleAdd}>点击</button>
}
function Page () {
    // 得到
    const state = store.useContext(); 
    return(
        <div>
            {state.age}
            <hr/>
            <Button></Button>
        </div>
    )
}
export default function App(){
    return (
        <Provider>
            <Page></Page>
        </Provider>
    )
}