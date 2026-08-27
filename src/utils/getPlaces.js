import axios from 'axios';
import {Dimensions} from 'react-native';
import GetLocation from 'react-native-get-location';
export const googleAPIKey = 'AIzaSyDTpoubfRceT14hL09hhAK6303DX7dOvxA';
export const placeType = 'cafe';

export const screen = Dimensions.get('window');

export const ASPECT_RATIO = screen.width / screen.height;

export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const NEARBY_PLACES_RADIUS_METERS = 5000;

export const ITEM_SPACING = 10;
export const ITEM_PREVIEW = 10;
export const ITEM_PREVIEW_HEIGHT = 150;

export async function getNearbyPlaces(latitude, longitude, radius) {
  const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
  const location = `${latitude},${longitude}&radius=${radius}`;
  const urlWithParams = `${url}?query=fitness,gym&location=${location}&key=${googleAPIKey}`;

  try {
    const response = await axios.get(urlWithParams);
    const res = response.data.results;
    const places = [];

    // for (let googlePlace of res.results) {
    //   var place = {};
    //   var myLat = googlePlace.geometry.location.lat;
    //   var myLong = googlePlace.geometry.location.lng;
    //   var coordinate = {
    //     latitude: myLat,
    //     longitude: myLong,
    //   };
    //   place['placeTypes'] = googlePlace.types;
    //   place['coordinate'] = coordinate;
    //   place['placeId'] = googlePlace.place_id;
    //   place['placeName'] = googlePlace.name;
    //   places.push(place);
    // }
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getLocation = async () => {
  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });

    const {latitude, longitude} = location;

    if (!latitude || !longitude) {
      return null;
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${googleAPIKey}`;

    const response = await axios.get(url);

    return location;
  } catch (error) {
    const {code, message} = error;
    console.warn(code, message);
  }
};

export const getGymsNearby = async () => {
  const screen = Dimensions.get('window');

  const ASPECT_RATIO = screen.width / screen.height;

  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });

    const {latitude, longitude} = location;

    if (!latitude || !longitude) {
      return null;
    }

    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const currentLocation = `${latitude},${longitude}&radius=${ASPECT_RATIO}`;
    const urlWithParams = `${url}?query=fitness,gym&location=${currentLocation}&key=${googleAPIKey}`;

    const response = await axios.get(urlWithParams);
    const res = response.data.results;

    return res;
  } catch (error) {
    const {code, message} = error;
    console.warn(code, message);
  }
};
