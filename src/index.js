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

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.function == 'html') {
      port.postMessage({ html: document.documentElement.outerHTML, description: document.querySelector("meta[name=\'description\']").getAttribute('content'), title: document.title });
    }
  });
});