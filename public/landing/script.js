(function () {
  "use strict";

  // Navbar con fondo al hacer scroll
  var nav = document.querySelector(".nav-70");
  var heroMedia = document.querySelector(".hero__media");
  var heroContent = document.querySelector(".hero__content");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("is-stuck", y > 40);

    // Difuminado / parallax del hero: la foto se desvanece y el texto aparece
    if (heroMedia) {
      var vh = window.innerHeight || 800;
      var p = Math.min(y / vh, 1);
      heroMedia.style.transform = "scale(" + (1.08 - p * 0.06) + ") translateY(" + p * 60 + "px)";
      heroMedia.style.opacity = String(1 - p * 0.65);
      if (heroContent) heroContent.style.transform = "translateY(" + p * -30 + "px)";
    }
  }

  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  // Animaciones de aparición
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
            setTimeout(function () {
              el.classList.add("in");
            }, delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // Contadores
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseFloat(el.getAttribute("data-count"));
          var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
          var start = performance.now();
          var dur = 1600;
          function step(now) {
            var t = Math.min((now - start) / dur, 1);
            var eased = 1 - Math.pow(1 - t, 3);
            el.textContent = (target * eased).toFixed(dec);
            if (t < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          cio.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) {
      cio.observe(el);
    });
  }

  // El claim siempre en una sola línea: se escala al ancho disponible
  function fitClaim() {
    var line = document.querySelector(".claim-line");
    if (!line) return;
    line.style.fontSize = "";
    var parent = line.parentElement;
    var available = parent.clientWidth;
    var current = parseFloat(window.getComputedStyle(line).fontSize);
    var width = line.scrollWidth;
    if (width > available) {
      line.style.fontSize = Math.max(14, current * (available / width) * 0.98) + "px";
    }
  }
  window.addEventListener("resize", fitClaim);
  window.addEventListener("load", fitClaim);
  fitClaim();

  // Scroll suave para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      var collapse = document.querySelector(".navbar-collapse.show");
      if (collapse && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });

  // Año dinámico en el footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
