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

/*
export const getHtmlFromLocationString = async (locationString, userLongitudeLatitude) => {
  const longitudeLatitude = await locationStringToLongitudeLatitude(locationString);
  const miles = getMilesBetweenLongitudeLatitudes(longitudeLatitude, userLongitudeLatitude);
  const { carbon, rating, visualisation } = getRating(miles);

  const leafUrl = 'https://static.thenounproject.com/png/1882848-200.png';
  const filter = 'style="filter: invert(1) contrast(1000%) sepia(1) saturate(20) hue-rotate(230deg) invert(1);"le="filter=invert(1) contrast(1000%) sepia(1) saturate(20) hue-rotate(230deg) invert(1)"';
  const leafHtml = (green) => `<img src="${leafUrl}" alt="Leaf" width="32px" height="32px"${green ? filter : ''}/>`;

  return `<div>${leafHtml(true).repeat(rating)}${leafHtml(false).repeat(5 - rating)}</div>`;
}
*/

export const getHtmlFromLocationString = async (locationString, userLongitudeLatitude) => {
  const longitudeLatitude = await locationStringToLongitudeLatitude(locationString);
  const miles = getMilesBetweenLongitudeLatitudes(longitudeLatitude, userLongitudeLatitude);
  const { carbon, rating, visualisation } = getRating(miles);;

  const leafUrl = 'https://static.thenounproject.com/png/1882848-200.png';
  const filter = 'style="filter: invert(1) contrast(1000%) sepia(1) saturate(20) hue-rotate(230deg) invert(1);"le="filter=invert(1) contrast(1000%) sepia(1) saturate(20) hue-rotate(230deg) invert(1)"';
  const leafHtml = (green) => `<img src="${leafUrl}" alt="Leaf" width="32px" height="32px"${green ? filter : ''}/>`;

  const leavesHtml = `<div class="leaf">${leafHtml(true).repeat(rating)}${leafHtml(false).repeat(5 - rating)}</div>`;

  const div = ['<style>',
    '.hide {',
    '  display: none;',
    '}',
    '.leaf:hover + .hide {',
    '  display: block;',
    '  color: black;',
    '}',
    '</style>',
    leavesHtml,
    '<div class="hide"><h1>'+visualisation+'</h1></div>'
  ].join("");
  return div;
}
