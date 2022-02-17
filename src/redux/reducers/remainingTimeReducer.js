import { _storeData, _retrieveData, _clearData } from "../../storage/Storage";
import {
    GET_REMAINING_TIME
} from "../types/constants";

const initialState = {
    loading: false,
    remainingTime: null,
    error: "",
};

const prayerTimesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REMAINING_TIME:
            return {
                ...state,
                remainingTime: action.payload.remainingTime
            };
        default:
            return state;
    }
};

export default prayerTimesReducer;
