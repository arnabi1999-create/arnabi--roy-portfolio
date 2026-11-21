/* Arnabi Roy — Portfolio scripts (plain JavaScript, no libraries) */
(function () {
  "use strict";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Sticky header shadow
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  function closeMenu() {
    if (!toggle || !links) return;
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Highlight the current section in the nav
  var navAnchors = document.querySelectorAll(".nav-links a");
  var sections = [];
  navAnchors.forEach(function (a) {
    var s = document.querySelector(a.getAttribute("href"));
    if (s) sections.push({ a: a, s: s });
  });
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navAnchors.forEach(function (a) { a.classList.remove("active"); });
          sections.forEach(function (x) {
            if (x.s === en.target) x.a.classList.add("active");
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (x) { spy.observe(x.s); });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Copy email button
  var copyBtn = document.getElementById("copy-email");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = "royarnabi1999@gmail.com";
      function done() {
        copyBtn.textContent = "Copied ✓";
        setTimeout(function () { copyBtn.textContent = "Copy email"; }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, function () { window.prompt("Copy this email:", email); });
      } else {
        window.prompt("Copy this email:", email);
      }
    });
  }

  // "Fill-in mode": add ?fill to the page address to see the yellow
  // "To add" boxes that mark details still missing from the case studies.
  if (/[?&]fill(=|&|$)/.test(window.location.search)) {
    document.body.classList.add("show-ph");
    document.querySelectorAll("details.case").forEach(function (d) { d.open = true; });
    var b = document.createElement("div");
    b.className = "fill-banner";
    b.textContent = "Fill-in mode: the yellow boxes are details to add to your case studies. Visitors never see them. Remove “?fill” from the web address to see the public version.";
    document.body.appendChild(b);
  }
})();
