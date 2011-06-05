function moveTab() {
  var tabId = parseInt(this.id.substring(1), 10);
  chrome.tabs.update(tabId, {"selected":true});
}

window.onload = function() {
  var currentTab = null;
  chrome.tabs.getSelected(null, function(tab) {
    currentTab = tab;
  });

  var ul = document.querySelector("ul");

  chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      var li = document.createElement("li");
      var favicon = document.createElement("img");
      var title = document.createElement("span");

      favicon.setAttribute("class", "favicon");
      favicon.setAttribute("src", tabs[i].favIconUrl);

      title.setAttribute("class", "title");
      title.innerText = tabs[i].title;

      if (currentTab.url === tabs[i].url) {
        li.setAttribute("class", "current");
      }
      li.setAttribute("id", "t" + tabs[i].id);
      li.setAttribute("title", tabs[i].url);
      li.appendChild(favicon);
      li.appendChild(title);
      li.addEventListener("click", moveTab, false);

      ul.appendChild(li);
    }
  });
};
