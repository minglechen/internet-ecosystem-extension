import { addRating } from './ebay.js';

window.onload = () => {
  addRating(document);
}

chrome.runtime.onConnect.addListener(function(port) {
console.assert(port.name == "connect");
port.onMessage.addListener((msg, sender, response) => {
  if (msg.status === 'ready') {
    var domInfo = {
      status: "success",
      waiting: "initial",
      notSupported: "none"
    };

    port.postMessage(domInfo);
  }
  if (msg.status === 'setLocation') {

    var domInfo = {
      status: "succesfully set location",
      waiting: "initial",
      notSupported: "none"
    };

    port.postMessage(domInfo);
  }
});
});