

function buttonClick(){
  chrome.tabs.executeScript(null, {
    file: 'inject.js'
  });
}