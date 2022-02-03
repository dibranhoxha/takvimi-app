import { SET_LOCATIONS } from "../types/constants";

const initialState = {
    loading: true,
    locations: [],
    error: ''
};

const locationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCATIONS:
            _storeData("locations", JSON.stringify(action.payload.locations));
            return {
                ...state,
                locations: action.payload.locations,
            };
        default:
            return state;
    }
};

export default locationsReducer;
