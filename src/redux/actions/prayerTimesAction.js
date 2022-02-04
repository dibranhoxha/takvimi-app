import uuid from "react-native-uuid";

import {
    FETCH_TIMES_REQUEST,
    FETCH_TIMES_SUCCESS,
    FETCH_TIMES_FAILURE,
} from "../types/constants";

const API = "http://api.aladhan.com";

export const fetchTimesRequest = () => {
    return {
        type: FETCH_TIMES_REQUEST,
    };
};

export const fetchTimesSuccess = (prayerTimes) => {
    return {
        type: FETCH_TIMES_SUCCESS,
        payload: { prayerTimes },
    };
};

export const fetchTimesFailure = (error) => {
    return {
        type: FETCH_TIMES_FAILURE,
        payload: { error },
    };
};

export const fetchTimes = (city = 'Pristina', country = 'Kosovo') => {
    return (dispatch) => {
        dispatch(fetchTimesRequest())
        fetch(
            `${API}/v1/timingsByCity?city=${city}&country=${country}&method=4`
        )
            .then(response => response.json())
            .then(({ data }) => {
                const listOfTimes = addID(data.timings);
                dispatch(fetchTimesSuccess(listOfTimes))

            })
            .catch((error) => {
                const errorMessage = error.message || 'Unknown Error occurred'
                dispatch(fetchTimesFailure(errorMessage))
            })
    }
}

const addID = (timesObj) => {
    const list = []
    for (const key in timesObj) {
        const obj ={
            timeName: key,
            time: timesObj[key],
            id: uuid.v4(),
            active: false
        }
        list.push(obj)
    }
    return list
};
