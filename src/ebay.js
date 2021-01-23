import axios from 'axios';

const getUrlsFromPage = (document) => {
  return [
    'https://???'
  ];
}

const getLocationStringFromUrl = async (url) => {
  const html = await axios.get(url);
  const dom = new DOMParser().parseFromString(html, 'text/html');

  const xpath = "//span[text()='Item location:']"
  const matchingElement = dom.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  const textNode = matchingElement.nextSibling;
  const text = textNode.data.trim();

  return text;
}

const getHtmlFromLocationString = (locationString) => {
  return '<div>5 leaves</div>';
}
