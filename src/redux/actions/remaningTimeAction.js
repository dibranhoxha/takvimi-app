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

const calculateRemainingTime = (start, end) => {
    const hours = moment
        .utc(moment(start, "HH:mm:ss").diff(moment(end, "HH:mm:ss")))
        .format("hh");
    const minutes = moment
        .utc(moment(start, "HH:mm:ss").diff(moment(end, "HH:mm:ss")))
        .format("mm");

    return `${hours > 0 ? `${hours} hours` : ""} ${
        hours > 0 && minutes > 0 ? "and" : ""
    } ${minutes > 0 ? `${minutes} minutes` : ""} left`;
};

// const calculateRemainingTime = (start, end) => {
//     var momentStartTime = moment(start, "hh:mm a");
//     var momentEndTime = moment(end, "hh:mm a");
//     let hours = momentEndTime.diff(momentStartTime, "hours");
//     let minutes = momentEndTime.diff(momentStartTime, "minutes");
//     minutes = minutes > 0?minutes:-minutes

//     return `${hours > 0 ? `${hours} hours` : ""} ${
//         hours > 0 && minutes > 0 ? "and" : ""
//     } ${minutes > 0 ? `${minutes} minutes` : ""} left`;
// };

const getCurrentTime = () => {
    const date = new Date();
    const minutes = date.getMinutes();
    const hour = date.getHours();
    const currentTime = `${hour}:${minutes}`;
    return currentTime;
};
