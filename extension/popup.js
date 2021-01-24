
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
<<<<<<< HEAD
    startListener(tabs[0].id, {status: "ready"});
    
=======
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', status: 'ready'}, setDOMInfo);
  });
>>>>>>> b6ebc7864b6c12a7b328b68be8af49f9362c3c8d
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