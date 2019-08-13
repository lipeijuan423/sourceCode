let initState = {
    count: 0
}
export default function countReducer(state, action) {
    if (!state) {
        state = initState;
    }
    switch (action.type) {
        // 状态不能被修改
        case 'INCERMENT':
            return {
                ...state,
                count: state.count + 1
            };
        case 'DECERMENT':
            return {
                ...state,
                count: state.count - 1
            };
        default:
            return state;
            break;
    }
}