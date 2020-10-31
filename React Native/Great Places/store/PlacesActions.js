import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";
import ENV from "../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, imageUri, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response) {
      throw new Error("Something went wrong");
    }

    const responseData = await response.json();
    if (!responseData.results) {
      throw new Error("Something went wrong");
    }

    const address = responseData.results[0].formatted_address;
    const fileName = imageUri.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        imageUri,
        address,
        location.lat,
        location.lng
      );
    } catch (error) {
      throw new Error(error);
    }

    dispatch({
      type: ADD_PLACE,
      placeData: {
        id: dbResult.insertId,
        title: title,
        image: newPath,
        address: address,
        coords: { lat: location.lat, lng: location.lng },
      },
    });
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (error) {
      throw new Error(error);
    }
  };
};
