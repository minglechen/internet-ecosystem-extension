import { addRating } from './ebay.js';

window.onload = () => {
  addRating(document);
}


chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if ((msg.from === 'popup') && (msg.status === 'ready')) {

    var domInfo = {
      status: "success",
      waiting: "initial",
      notSupported: "none"
    };

    // Directly respond to the sender (popup), 
    // through the specified callback.
    response(domInfo);
  }
});