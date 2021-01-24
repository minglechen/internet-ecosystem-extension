import axios from 'axios';

import { locationStringToLongitudeLatitude, getBrowserLongitudeLatitude, getMilesBetweenLongitudeLatitudes } from './miles.js';
import { milesToCarbon } from './carbon.js';
import { getRating } from './rating';

const itemLocationRegex = /<span>Item location:<\/span>([\s\S]+?)<\/div>/

export const addRating = async (document) => {
  const elements = document.getElementsByClassName("s-item");

  let url = null;

  await Promise.all(Array.prototype.forEach.call(elements, async (element) => {
    try {
      url = element.getElementsByClassName("s-item__link")[0]?.getAttribute("href");

      if (!url) {
        return;
      }

      const locationString = await getLocationStringFromUrl(url);
      const div = await getHtmlFromLocationString(locationString);
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

export const getHtmlFromLocationString = (locationString) => {
  /*
  const longitudeLatitude1 = locationStringToLongitudeLatitude(locationString);
  const longitudeLatitude2 = getBrowserLongitudeLatitude();
  const miles = getMilesBetweenLongitudeLatitudes(longitudeLatitude1, longitudeLatitude2);
  const carbon = milesToCarbon(miles);
  const visualisation = carbonToVisualisation(carbon);
  const leaves = carbonToRating(carbon);
  */
 const leaves = 3;
 const visualisation = "Visualisation";

  const leafUrl = "https://static.thenounproject.com/png/1882848-200.png";
  const leafHtml = `<img src="${leafUrl}" alt="Leaf" width="32px" height="32px" />`;
  const div = ['<style>',
      '.hide {',
      '  display: none;',
      '}',
      '.leaf:hover + .hide {',
      '  display: block;',
      '  color: black;',
      '}',
    '</style>',
    '<div class="leaf">'+leafHtml.repeat(leaves)+'</div>',
    '<div class="hide"><h1>'+visualisation+'</h1></div>'].join("");
  return div;
}
