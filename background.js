const PROTOCOLS = ["http:", "https:"];

function hasGoodUrl(url) {
  var link = document.createElement("a");
  link.href = url;
  return (
    PROTOCOLS.includes(link.protocol) && link.hostname !== "rememberthelink.com"
  );
}

function initializePageAction(tab) {
  if (hasGoodUrl(tab.url)) {
    chrome.pageAction.setIcon({
      tabId: tab.id,
      path: {
        19: "icons/rememberthelink-19.png",
        38: "icons/rememberthelink-38.png",
      },
    });
    chrome.pageAction.setTitle({
      tabId: tab.id,
      title: "Remember",
    });
    chrome.pageAction.show(tab.id);
  }
}

chrome.tabs.query({}, (tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

// Listen for any changes to the URL of any tab, and update the page action for that tab
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

chrome.pageAction.onClicked.addListener(function (tab) {
  var url =
    "https://rememberthelink.com/new?url=" + encodeURIComponent(tab.url);
  chrome.tabs.update(tab.id, { url: url });
});
