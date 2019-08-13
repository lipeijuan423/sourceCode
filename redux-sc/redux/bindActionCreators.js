// 取出action
function bindActionCreator(actionCreators, dispatch) {
    return function () {
        return dispatch(actionCreators.apply(this,arguments));
    }
}
export default function  bindActionCreators (actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }
    if (typeof actionCreators !== 'object' || actionCreators === null) {
        throw new Error("actioncreators必须是函数或数组");
    }
    const keys = Object.entries(actionCreators);
    const boundActionsCreators = {};
    console.log(keys, 'keys')
    for (let item of keys) {
        const [key, actionCreator] = item;
        if (typeof actionCreator === 'function') {
            boundActionsCreators[key] = bindActionCreator(actionCreator, dispatch);
        }
    }
    return boundActionsCreators;
};