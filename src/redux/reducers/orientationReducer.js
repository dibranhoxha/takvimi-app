import { _storeData, _retrieveData, _clearData } from "../../storage/Storage";
import {
    FETCH_ORIENTATION_REQUEST,
    FETCH_ORIENTATION_SUCCESS,
    FETCH_ORIENTATION_FAILURE,
} from "../types/constants";

const initialState = {
    loading: false,
    orientation: _retrieveData("orientation"),
    error: "",
};

const orientationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORIENTATION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ORIENTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                orientation: action.payload.orientation,
                error: "",
            };
        case FETCH_ORIENTATION_FAILURE:
            return {
                ...state,
                loading: false,
                orientation: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default orientationReducer;
