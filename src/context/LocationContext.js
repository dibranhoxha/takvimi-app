import React, { createContext, useReducer, useContext } from 'react';
import { _storeData, _retrieveData, _clearData } from './Storage';

const initialState = {
    location: _retrieveData("locations")
};

const LocationStateContext = createContext(initialState);
const LocationDispatchContext = createContext(initialState);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOCATION':
            _storeData('location', JSON.stringify(action.payload.location));
            return {
                ...state,
                location: action.payload.location,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const LocationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <LocationStateContext.Provider value={state}>
            <LocationDispatchContext.Provider value={dispatch}>{children}</LocationDispatchContext.Provider>
        </LocationStateContext.Provider>
    );
};

const useLocationState = () => {
    const context = useContext(LocationStateContext);
    if (typeof context === 'undefined') {
        throw new Error('useLocationState must be used within a LocationContextProvider');
    }
    return context;
};

const useLocationDispatch = () => {
    const context = useContext(LocationDispatchContext);
    if (typeof context === 'undefined') {
        throw new Error('useLocationDispatch must be used within a LocationContextProvider');
    }
    return context;
};

export const useLocation = () => {
    return [useLocationState(), useLocationDispatch()];
};
