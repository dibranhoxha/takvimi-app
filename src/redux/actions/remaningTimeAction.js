import uuid from "react-native-uuid";
import { GET_REMAINING_TIME } from "../types/constants";
import moment from "moment";

export const setRemainingTime = (remainingTime) => {
    return {
        type: GET_REMAINING_TIME,
        payload: { remainingTime },
    };
};

export const getRemainingTime = (time) => {
    return (dispatch) => {
        const currentTime = getCurrentTime();
        const remainingTime = calculateRemainingTime(time, currentTime);
        dispatch(setRemainingTime(remainingTime));
    };
};

// const calculateRemainingTime = (start, end) => {
//     console.log("start: " + start + ", end: " + end);
//     const [startHour, startMinute] = start.split(":");
//     const [endHour, endMinute] = end.split(":");
//     const formattedStartHour =
//         startHour.length > 1 ? startHour.split("")[0] : startHour;
//     const formattedStartMinute =
//         startMinute.length > 1 ? startMinute.split("")[0] : startMinute;
//     const formattedEndHour =
//         endHour.length > 1 ? endHour.split("")[0] : endHour;
//     const formattedEndMinute =
//         endMinute.length > 1 ? endMinute.split("")[0] : endMinute;
//     const hourDiff = Math.abs(parseInt(startHour) - parseInt(endHour));
//     const minutesDiff = parseInt(startMinute) - parseInt(endMinute);
//     let diff = parseInt(end.toString()) - parseInt(start.toString());
//     const hours = hourDiff > 12 ? hourDiff - 12 : hourDiff;
//     const minutes = minutesDiff < 0 ? 60 + minutesDiff : minutesDiff;

//     return `${hours > 0 ? `${hours} hours and` : ""} ${minutes} minutes left`;
// };

const calculateRemainingTime = (start, end) => {
    const hours = moment.utc(moment(start, "HH:mm:ss").diff(moment(end, "HH:mm:ss"))).format("hh")
    const minutes = moment.utc(moment(start, "HH:mm:ss").diff(moment(end, "HH:mm:ss"))).format("mm")
    
    return `${hours > 0 ? `${hours} hours` : ""} ${hours>0 && minutes>0?"and":""} ${minutes>0? `${minutes} minutes left`:""} `;
};

const getCurrentTime = () => {
    const date = new Date();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const currentTime = `${hour}:${minutes}`;
    return currentTime;
};
