import axios from 'axios';

export const locationStringToLongitudeLatitude = async (locationString) => {
  /*
   Use a google geoencoding api to convert the location string into longitude and latitude
   */

  const { data } = await axios.post("www.api.com", { locationString });

  const { longitude, latitude } = data;

  return {
    latitude,
    longitude,
  };
}

getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const getBrowserLongitudeLatitude = async () => {
  /*
   Use Geolocation API to get the browser longitude and latitude
   */
  if (navigator.geolocation){
    const { coords } = await getPosition();
    const { longitude, latitude } = coords;

    return {
      longitude,
      latitude,
    }
  }

  console.log(`Geolocation is not supported by this browser.`);
  return {
    longitude: 0,
    latitude: 0,
  }
}

export const getMilesBetweenLongitudeLatitudes = ({longitude1, latitude1}, {longitude2, latitude2}) => {
  /*
   input: longitude, latitude of two positions in degrees
   output: miles between the two locations
   implementation detail: uses Haversine formula to determine the great-circle distance between two points on a sphere
   */

  const R = 3958.8; // Radius of the Earth in miles
  const rlat1 = degreeToRadius(latitude1); // Convert degrees to radians
  const rlat2 = degreeToRadius(latitude2); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = degreeToRadius(longitude2-longitude1); // Radian difference (longitudes)
  return 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
}

const degreeToRadius = (deg) =>  deg * Math.PI / 180;
