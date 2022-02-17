import { _storeData, _retrieveData, _clearData } from "../../storage/Storage";
import {
    FETCH_LOCATIONS_REQUEST,
    FETCH_LOCATIONS_SUCCESS,
    FETCH_LOCATIONS_FAILURE,
} from "../types/constants";

const initialState = {
    loading: false,
    locations: _retrieveData("locations"),
    error: "",
};

const locationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOCATIONS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_LOCATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                locations: action.payload.locations,
                error: "",
            };
        case FETCH_LOCATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                locations: [],
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default locationsReducer;
