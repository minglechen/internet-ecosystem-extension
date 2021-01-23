const getUrlsFromPage = (document) => {
  return [
    "https://???"
  ];
}

const getLocationStringFromUrl = (url) => {
  return "Framingham, Massachusetts, United States";
}

const getHtmlFromLocationString = (locationString) => {
  return "<div>5 leaves</div>";
}

// Content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.ping) { sendResponse({pong: true}); return; }
  /* Content script action */
});

