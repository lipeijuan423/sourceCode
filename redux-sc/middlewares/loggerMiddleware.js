const loggerMiddleware = (store) => (next) => (action) => {
    console.log(store.getState(), 'this.state')
    console.log(action, 'action');
    next(action);
    console.log('next state', store.getState());
}
export default loggerMiddleware;