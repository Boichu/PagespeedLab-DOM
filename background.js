let isScriptInjected = false;

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });

console.log(chrome.action, chrome.action.onClicked);
chrome.action.onClicked.addListener((tab) => {
  console.log('extension Clicked');
  if (isScriptInjected) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => location.reload()
    }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('Script removed successfully');
        isScriptInjected = false;
      }
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('Script injected successfully');
        isScriptInjected = true;
      }
    });
  }
});
console.log('extension');