var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "rememberthelink-link",
  label: "Remember this page",
  icon: {
    "16": "./rtl16.png",
    "32": "./rtl32.png",
    "64": "./rtl64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  var url = tabs.activeTab.url;
  if (url.match(/^https?\:\/\/rememberthelink\.com\//)) {
      tabs.activeTab.close();
  }
  else {
    tabs.activeTab.url = "http://rememberthelink.com/new?url=" + encodeURIComponent(url);
  }
}
