import { combineReducers } from "redux";
import locationsReducer from "./locationsReducer";
import prayerTimesReducer from "./prayerTimesReducer";
import orientationReducer from "./orientationReducer";

const rootReducer = combineReducers({
    locations: locationsReducer,
    prayerTimes: prayerTimesReducer,
    orientation: orientationReducer
});

export default rootReducer;