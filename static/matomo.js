var _paq = (window._paq = window._paq || []);
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function () {
  var u = "https://matomo.ethereum.org/";
  _paq.push(["setTrackerUrl", u + "matomo.php"]);
  _paq.push(["setSiteId", "31"]);
  var secondaryTracker = "https://ethereumfoundation.matomo.cloud/matomo.php";
  var secondaryWebsiteId = "31";
  _paq.push(["addTracker", secondaryTracker, secondaryWebsiteId]);
  var d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];
  g.async = true;
  g.src = u + "matomo.js";
  s.parentNode.insertBefore(g, s);
})();
