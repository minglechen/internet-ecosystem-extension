
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    startListener(tabs[0].id, {status: "ready"});
    
});

});

function setDOMInfo(info) {
  document.getElementById('pText').textContent = info.status;
  document.getElementById("waiting").style.display = info.waiting;
	document.getElementById("notSupported").style.display = info.notSupported;
};


function startListener(id, m){
  var port = chrome.tabs.connect(id, {name: "connect"});
    port.postMessage(m)
    port.onMessage.addListener(function(msg) {
      setDOMInfo(msg);
    });
}

function takeLocation(){
  alert("take location  ");

}