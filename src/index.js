import { addRating } from './ebay.js';

window.onload = () => {
  addRating(document);
}

// Content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.ping) {
    sendResponse({ pong: true });
    return;
  }

  /* Content script action */
});
