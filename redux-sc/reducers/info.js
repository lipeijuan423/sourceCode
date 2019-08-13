let initState = {
    name: 'lpj-info',
    description: '描述-info'
}
export default function infoReducer(state, action) {
    if (!state) {
        state = initState;
    }
    switch (action.type) {
        // 状态不能被修改
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            };
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.description
            };
        default:
            return state;
            break;
    }
}