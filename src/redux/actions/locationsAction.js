import uuid from "react-native-uuid";

import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE,
} from "../types/constants";

const API = "https://restcountries.com/v2/all";

export const fetchLocationsRequest = () => {
  return {
    type: FETCH_LOCATIONS_REQUEST,
  };
};

export const fetchLocationsSuccess = (locations) => {
  return {
    type: FETCH_LOCATIONS_SUCCESS,
    payload: { locations },
  };
};

export const fetchLocationsFailure = (error) => {
  return {
    type: FETCH_LOCATIONS_FAILURE,
    payload: { error },
  };
};

export const fetchLocations = () => {
  return (dispatch) => {
    dispatch(fetchLocationsRequest());
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        dispatch(fetchLocationsSuccess(data));
      })
      .catch((error) => {
        const errorMessage = error.message || "Unknown Error occurred";
        dispatch(fetchLocationsFailure(errorMessage));
      });
  };
};

