// // Background
// function ensureSendMessage(tabId, message, callback) {
//   chrome.tabs.sendMessage(tabId, { ping: true }, function (response) {
//     if (response && response.pong) { // Content script ready
//       chrome.tabs.sendMessage(tabId, message, callback);
//     } else { // No listener on the other end
//       chrome.tabs.executeScript(tabId, { file: "index.js" }, function() {
//         if (chrome.runtime.lastError) {
//           console.error(chrome.runtime.lastError);
//           throw Error("Unable to inject script into tab " + tabId);
//         }

//         // OK, now it's injected and ready
//         chrome.tabs.sendMessage(tabId, message, callback);
//       });
//     }
//   });
// }

// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   ensureSendMessage(tabs[0].id, { greeting: "hello" });
// });
