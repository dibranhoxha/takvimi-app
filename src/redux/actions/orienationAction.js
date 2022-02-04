import uuid from "react-native-uuid";

import {
    FETCH_ORIENTATION_REQUEST,
    FETCH_ORIENTATION_SUCCESS,
    FETCH_ORIENTATION_FAILURE,
} from "../types/constants";

const API = "http://api.aladhan.com";

export const fetchOrientationRequest = () => {
    return {
        type: FETCH_ORIENTATION_REQUEST,
    };
};

export const fetchOrientationSuccess = (orientation) => {
    return {
        type: FETCH_ORIENTATION_SUCCESS,
        payload: { orientation },
    };
};

export const fetchOrientationFailure = (error) => {
    return {
        type: FETCH_ORIENTATION_FAILURE,
        payload: { error },
    };
};

export const fetchOrientation = (latitude = 42.574564, longitude = 21.029508) => {
    return (dispatch) => {
        dispatch(fetchOrientationRequest());
        fetch(
            `${API}/v1/qibla/${latitude}/${longitude}`
        )
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                if(result.code === 200) {
                    dispatch(fetchOrientationSuccess(result.data));
                } else {
                    fetchOrientationFailure(result.data)
                }
            })
            .catch((error) => {
                const errorMessage = error.message || "Unknown Error occurred";
                dispatch(fetchOrientationFailure(errorMessage));
            });
    };
};

