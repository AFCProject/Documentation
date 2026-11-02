// Headings inside a `=== "Tab"` block (pymdownx.tabbed) are only visible when their tab is the
// selected one, but the table of contents lists every heading on the page regardless of which
// tab is active, and clicking a TOC entry for a non-active tab just scrolls to hidden content.
//
// This keeps the TOC in sync with the currently selected tab: a heading's TOC entry is shown only
// while its tab (and any tab(s) it's nested inside, for nested tab sets) is the one selected, and
// the list updates live as the user switches tabs. Headings outside any tabbed block are always
// shown.
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

    var item = link.closest(".md-nav__item");
    if (!item) return;

    // offsetParent is null when the heading (or an ancestor, such as an inactive
    // .tabbed-block) is display:none, which is exactly how pymdownx.tabbed hides
    // unselected tabs' content.
    item.style.display = target.closest(".tabbed-block") && target.offsetParent === null
      ? "none"
      : "";
  });
}

// Re-run whenever mkdocs-material swaps in a new page (instant navigation).
document$.subscribe(syncTocWithTabs);

// Re-run whenever a tab is switched; this listener is registered once since the script itself
// is only loaded once and survives instant navigation.
document.addEventListener("change", function (event) {
  if (event.target.matches && event.target.matches('.tabbed-set > input[type="radio"]')) {
    syncTocWithTabs();
  }
});
