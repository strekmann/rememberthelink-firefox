const PROTOCOLS = ["http:", "https:"];

function hasGoodUrl(url) {
    var link = document.createElement('a');
    link.href = url;
    console.log(link);
    return PROTOCOLS.includes(link.protocol) && link.hostname !== 'rememberthelink.com';
}

function initializePageAction(tab) {
    if (hasGoodUrl(tab.url)) {
        browser.pageAction.setIcon({
            tabId: tab.id,
            path: {
                19: "icons/rememberthelink-19.png",
                38: "icons/rememberthelink-38.png"
            }
        });
        browser.pageAction.setTitle({
            tabId: tab.id,
            title: "Remember"
        });
        browser.pageAction.show(tab.id);
    }
}

var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
    for (let tab of tabs) {
        initializePageAction(tab);
    }
});

// Listen for any changes to the URL of any tab, and update the page action for that tab
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    initializePageAction(tab);
});

browser.pageAction.onClicked.addListener(function(tab) {
    var url = 'https://rememberthelink.com/new?url=' + tab.url;
    browser.tabs.update(tab.id, { url: url });
});
