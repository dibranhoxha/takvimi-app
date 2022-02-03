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

export const fetchOrientation = (city = "Pristina", country = "Kosovo") => {
    return (dispatch) => {
        dispatch(fetchOrientationRequest);
        fetch(
            `${API}/v1/qibla:/${latitude}/:${longitude}&method=4`
        )
            .then((response) => response.json())
            .then(({ data }) => {
                // console.log("d: ", data.timings);
                // console.log(timings);
                const listOfTimes = addID(data.timings);
                console.log({ listOfTimes });
                dispatch(fetchOrientationSuccess(listOfTimes));
            })
            .catch((error) => {
                const errorMessage = error.message || "Unknown Error occurred";
                dispatch(fetchOrientationFailure(errorMessage));
            });
    };
};

const addID = (timesObj) => {
    // console.log(timesObj);
    const list = [];
    for (const key in timesObj) {
        const obj = {
            timeName: key,
            time: timesObj[key],
            id: uuid.v4(),
            active: false,
        };
        list.push(obj);
    }
    return list;
};
