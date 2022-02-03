import { SET_LOCATION } from "../types/constants";

export const setLocation = (location = 'Albania') => {
    return {
        type: SET_LOCATION,
        payload: { locations: location}
    };
};
