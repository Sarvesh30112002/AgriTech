import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
    isAuthenticated: false,
    userData: {}
};
const { useGlobalState, setGlobalState } = createGlobalState(initialState);

export { useGlobalState, setGlobalState };