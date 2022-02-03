import { SET_ORIENTATION } from "../types/constants";

const initialState = {
    loading: true,
    orientation: null,
    error: ''
};

const orientationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORIENTATION:
            _storeData(
                "orientation",
                JSON.stringify(action.payload.orientation)
            );
            return {
                ...state,
                orientation: action.payload.orientation,
            };
        default:
            return state;
    }
};

export default orientationReducer;
