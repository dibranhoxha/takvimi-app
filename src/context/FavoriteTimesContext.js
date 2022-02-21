import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useState,
} from "react";
import { _storeData, _retrieveData, _clearData } from "../storage/Storage";

const initialState = {
    favoriteTimes: [],
};

const FavoriteTimesStateContext = createContext(initialState);
const FavoriteTimesDispatchContext = createContext(initialState);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FAVORITE_TIMES":
            return {
                ...state,
                favoriteTimes: action.payload.favoriteTimes,
            };
        default:
            return state;
    }
};

export const FavoriteTimesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <FavoriteTimesStateContext.Provider value={state}>
            <FavoriteTimesDispatchContext.Provider value={dispatch}>
                {children}
            </FavoriteTimesDispatchContext.Provider>
        </FavoriteTimesStateContext.Provider>
    );
};

const useFavoriteTimesState = () => {
    const context = useContext(FavoriteTimesStateContext);
    if (typeof context === "undefined") {
        throw new Error(
            "useFavoriteTimesState must be used within a FavoriteTimesContextProvider"
        );
    }
    return context;
};

const useFavoriteTimesDispatch = () => {
    const context = useContext(FavoriteTimesDispatchContext);
    if (typeof context === "undefined") {
        throw new Error(
            "useFavoriteTimesDispatch must be used within a FavoriteTimesContextProvider"
        );
    }
    return context;
};

export const useFavoriteTimes = () => {
    return [useFavoriteTimesState(), useFavoriteTimesDispatch()];
};
