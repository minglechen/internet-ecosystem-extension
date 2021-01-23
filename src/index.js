import { getUrlsFromPage } from './ebay.js';

window.onload = () => {
  if (true) { // change to check if on search page later
    getUrlsFromPage(document);
  }
}

// Content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.ping) { sendResponse({pong: true}); return; }
  /* Content script action */
});