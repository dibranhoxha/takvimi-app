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

export const fetchTimes = (city = "Pristina", country = "Kosovo") => {
    return (dispatch) => {
        dispatch(fetchTimesRequest());
        fetch(
            `${API}/v1/timingsByCity?city=${city}&country=${country}&method=4`
        )
            .then((response) => response.json())
            .then(({ data }) => {
                // console.log({ data });
                const listOfTimes = formatTimes(data.timings);
                const closedTime = getClosedTime(listOfTimes);
                const timesData = formatObject(data, listOfTimes, closedTime);
                dispatch(fetchTimesSuccess(timesData));
            })
            .catch((error) => {
                const errorMessage = error.message || "Unknown Error occurred";
                dispatch(fetchTimesFailure(errorMessage));
            });
    };
};


const getClosedTime = (times) => {
    const sortedTimes = times
    .slice()
    .sort((a, b) => b.time.toString() < getCurrentTime().toString());
    return sortedTimes[0];
};


const getCurrentTime = () => {
    const date = new Date();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const currentTime = `${hour}:${minutes}`;
    return currentTime;
};

const formatObject = (data, listOfTimes, closedTime) => {
    const timesData = {
        ...data,
        date: {
            ...data.date,
            gregorian: {
                ...data.date.gregorian,
                month: {
                    ...data.date.gregorian.month,
                    sq: getTranslatedMonth(
                        data.date.gregorian.month
                    ),
                },
            },
        },
        timings: listOfTimes,
        closedTime: closedTime,
    };
    return timesData;
}

const getTranslatedMonth = (month) => {
    switch (month.en.toLowerCase()) {
        case "january":
            return "Janar";
        case "february":
            return "Shkurt";
        case "march":
            return "Mars";
        case "april":
            return "Prill";
        case "may":
            return "Maj";
        case "june":
            return "Qershor";
        case "july":
            return "Korrik";
        case "august":
            return "Gusht";
        case "september":
            return "Shtator";
        case "october":
            return "Tetor";
        case "november":
            return "Nentor";
        case "december":
            return "Dhjetor";
        default:
            return month;
    }
};

const getTranslatedValue = (key) => {
    switch (key.toLowerCase()) {
        case "fajr":
            return "Sabahu";
        case "sunrise":
            return "Lindja e Diellit";
        case "dhuhr":
            return "Dreka";
        case "asr":
            return "Ikindia";
        case "sunset":
            return "Perendimi i Diellit";
        case "maghrib":
            return "Akshami";
        case "isha":
            return "Jacia";
        case "imsak":
            return "Imsaku";
        default:
            return key;
    }
};

const formatTimes = (timesObj) => {
    const list = [];
    Object.keys(timesObj).map((key) => {
        const obj = {
            timeName: getTranslatedValue(key),
            time: timesObj[key],
            id: uuid.v4(),
            active: false,
        };
        key !== "Sunset" && key !== "Midnight" && list.push(obj);
    });
    return list.sort((a, b) => a.time.localeCompare(b.time));
};
