import { _storeData, _retrieveData, _clearData } from "../../storage/Storage";
import {
    FETCH_TIMES_REQUEST,
    FETCH_TIMES_SUCCESS,
    FETCH_TIMES_FAILURE,
} from "../types/constants";

const initialState = {
    loading: false,
    prayerTimes: null,
    error: "",
};

const prayerTimesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TIMES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TIMES_SUCCESS:
            return {
                ...state,
                loading: false,
                prayerTimes: action.payload.prayerTimes,
                error: "",
            };
        case FETCH_TIMES_FAILURE:
            return {
                ...state,
                loading: false,
                prayerTimes: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default prayerTimesReducer;
