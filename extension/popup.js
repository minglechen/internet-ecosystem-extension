
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', status: 'ready'}, setDOMInfo);
  });
});

const setDOMInfo = info => {
  document.getElementById('pText').textContent = info.status;
  document.getElementById("waiting").style.display = info.waiting;
	document.getElementById("notSupported").style.display = info.notSupported;
};