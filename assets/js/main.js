/* Bovo — minimal progressive-enhancement script.
   No analytics, no trackers, no third-party requests. */

(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("primary-nav");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Gentle reveal on scroll. Content is visible by default; the hidden
     starting state is only applied when the observer is available. */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || reduced || !items.length) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  document.documentElement.classList.add("js-reveal");

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

  items.forEach(function (el) { observer.observe(el); });

  /* If the observer has not reported anything shortly after load, assume it
     is not running in this environment and show all content statically. */
  setTimeout(function () {
    var hidden = document.querySelectorAll(".reveal:not(.is-visible)");
    if (hidden.length === items.length) {
      document.documentElement.classList.remove("js-reveal");
      items.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }, 1500);
})();
