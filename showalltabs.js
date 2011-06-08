function moveTab() {
  var tabId = parseInt(this.id.substring(1), 10);
  chrome.tabs.update(tabId, {"selected": true});
}

window.onload = function() {
  var currentTab = null;
  var ul = document.querySelector("ul");
  var fragment = document.createDocumentFragment();

  chrome.tabs.getSelected(null, function(tab) {
    currentTab = tab;
  });

  chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i = 0, l = tabs.length; i < l; i++) {
      var li = document.createElement("li");
      var favicon = document.createElement("img");
      var title = document.createElement("span");

      favicon.setAttribute("class", "favicon");
      favicon.setAttribute("src", tabs[i].favIconUrl);

      title.setAttribute("class", "title");
      title.appendChild(document.createTextNode(tabs[i].title));

      if (currentTab.id === tabs[i].id) {
        li.setAttribute("class", "current");
      }
      li.setAttribute("id", "t" + tabs[i].id);
      li.setAttribute("title", tabs[i].url);
      li.appendChild(favicon);
      li.appendChild(title);
      li.addEventListener("click", moveTab, false);

      fragment.appendChild(li);
    }
    ul.appendChild(fragment);
  });
};
