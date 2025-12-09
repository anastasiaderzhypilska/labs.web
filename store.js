import { createStore } from 'redux';
import rootReducer from './reducers';

const loadState = () => {
try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
    return undefined;
    }
    return JSON.parse(serializedState);
} catch (err) {
    return undefined;
}
};

const saveState = (state) => {
try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
} catch {
}
};

const persistedState = loadState();

const store = createStore(
rootReducer,
persistedState,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
saveState(store.getState());
});

export default store;