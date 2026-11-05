// Keep the TOC in sync with whichever pymdownx.tabbed tab is currently selected.
function syncTocWithTabs() {
  document.querySelectorAll(".md-nav--secondary .md-nav__link").forEach(function (link) {
    var href = link.getAttribute("href") || "";
    var hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    var target;
    try {
      target = document.getElementById(decodeURIComponent(href.slice(hashIndex + 1)));
    } catch (e) {
      return;
    }
    if (!target) return;

    // Only hide the link itself (not its .md-nav__item), since sibling sub-headings
    // nested under it may belong to a different, currently visible tab.
    link.style.display = target.closest(".tabbed-block") && target.offsetParent === null
      ? "none"
      : "";
  });
}

document$.subscribe(syncTocWithTabs);

// Registered once (not inside document$.subscribe) since the script itself only loads once.
document.addEventListener("change", function (event) {
  if (event.target.matches && event.target.matches('.tabbed-set > input[type="radio"]')) {
    syncTocWithTabs();
  }
});
