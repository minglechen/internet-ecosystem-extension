const locationStringToLongitudeLatitude = (locationString) => {
  /*
  Use a google api to convert the location string into longitude and latitude
  */
 var geocoder = new google.maps.Geocoder();
 
 geocoder.geocode( { 'address': locationString}, function(results, status) {
 
 if (status == google.maps.GeocoderStatus.OK) {
  var latitude = results[0].geometry.location.lat();
  var longitude = results[0].geometry.location.lng();
    return {
      latitude,
      longitude,
    }
     } 
 }); 
}

const getBrowserLongitudeLatitude = () => {
  /*
   Use Geolocation API to get the browser longitude and latitude
   Cally a helper function `returnBrowserLongitudeLatitude`
  */
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(returnLongitudeLatitude); // success callback
  }
  else{
    console.log(`Geolocation is not supported by this browser.`);
  }
}

const returnLongitudeLatitude = (position) => {
  /*
  Return the longitude and latitude for the position
  */
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;
  return {
    longitude,
    latitude,
  }
}

const getMilesBetweenLongitudeLatitudes = (longitude1, latitude1, longitude2, latitude2) => {
  /*
  input: longitude, latitude of two positions in degrees
  output: miles between the two locations
  implementation detail: uses Haversine formula to determine the great-circle distance between two points on a sphere
  */
 var R = 3958.8; // Radius of the Earth in miles
 var rlat1 = degreeToRadius(latitude1); // Convert degrees to radians
 var rlat2 = degreeToRadius(latitude2); // Convert degrees to radians
 var difflat = rlat2-rlat1; // Radian difference (latitudes)
 var difflon = degreeToRadius(longitude2-longitude1); // Radian difference (longitudes)
 var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
 return d;
}

const degreeToRadius = (deg) => {
  return deg*Math.PI/180;
}
