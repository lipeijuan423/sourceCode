function incerment () {
    return { type: "INCERMENT"}
    // 异步
    // return (dispatch, getState) => {
    //     dispatch({ type: "INCERMENT"}, 'init')
    // }

}
export {incerment}