import axios from 'axios';

import { locationStringToLongitudeLatitude, getBrowserLongitudeLatitude, getMilesBetweenLongitudeLatitudes } from './miles.js';
import { getRating } from './rating';

const itemLocationRegex = /<span>Item location:<\/span>([\s\S]+?)<\/div>/

export const addRating = async (document) => {
  const elements = document.getElementsByClassName("s-item");

  let url = null;
  let userLongitudeLatitude;

  try {
    userLongitudeLatitude = await getBrowserLongitudeLatitude();
  } catch {
    console.log("Geolocation denied");
    return;
  }


  await Promise.all(Array.prototype.forEach.call(elements, async (element) => {
    try {
      url = element.getElementsByClassName("s-item__link")[0]?.getAttribute("href");

      if (!url) {
        console.log("URL not found")
        return;
      }

      const locationString = await getLocationStringFromUrl(url);
      const div = await getHtmlFromLocationString(locationString, userLongitudeLatitude);
      element.getElementsByClassName("s-item__info clearfix")[0].innerHTML += div;
    } catch (err) {
      console.log(`ERROR: ${err}, URL="${url}"`);
    }
  }));
}

export const getLocationStringFromUrl = async (url) => {
  const { data } = await axios.get(url);

  const match = data.match(itemLocationRegex);
  const text = match[1].trim();

  return text;
}

export const getHtmlFromLocationString = async (locationString, userLongitudeLatitude) => {
  const longitudeLatitude = await locationStringToLongitudeLatitude(locationString);
  const miles = getMilesBetweenLongitudeLatitudes(longitudeLatitude, userLongitudeLatitude);
  const { carbon, rating, visualisation } = getRating(miles);;

  const leafUrl = 'https://static.thenounproject.com/png/1882848-200.png';
  const leafHtml = (green) => `<img src="${leafUrl}" alt="Leaf"${green ? 'class="iee--green"' : ''}/>`;

  return `
    <div class="iee--leaves">
      ${leafHtml(true).repeat(rating)}${leafHtml(false).repeat(5 - rating)}
      <div class="iee--hide">
        <p>${miles.toFixed(2)} miles</p>
        <p>${carbon.toFixed(2)} grams of carbon</p>
        <p>${visualisation}</p>
      </div>
    </div>
  `;
}

