import { combineReducers } from "redux";
import locationsReducer from "./locationsReducer";
import prayerTimesReducer from "./prayerTimesReducer";
import orientationReducer from "./orientationReducer";
import remainingTimeReducer from "./remainingTimeReducer";

const rootReducer = combineReducers({
    locations: locationsReducer,
    prayerTimes: prayerTimesReducer,
    remainingTime: remainingTimeReducer,
    orientation: orientationReducer,
});

export default rootReducer;