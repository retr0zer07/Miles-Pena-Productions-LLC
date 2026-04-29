(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("is-hidden-mobile");
      navToggle.setAttribute("aria-expanded", String(!nav.classList.contains("is-hidden-mobile")));
    });
  }

  const currentYear = document.getElementById("currentYear");
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  const consentKey = "mpp_cookie_consent";
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");
  const manageBtns = document.querySelectorAll(".manage-cookies");

  const consent = localStorage.getItem(consentKey);
  if (!consent && cookieBanner) {
    cookieBanner.classList.remove("is-hidden");
  }

  function setConsent(value) {
    localStorage.setItem(consentKey, value);
    if (cookieBanner) {
      cookieBanner.classList.add("is-hidden");
    }
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      setConsent("accepted");
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", function () {
      setConsent("rejected");
    });
  }

  manageBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (cookieBanner) {
        cookieBanner.classList.remove("is-hidden");
      }
    });
  });

  const a11yKey = "mpp_a11y";
  const a11yBtn = document.getElementById("a11y-toggle");
  const a11yPanel = document.getElementById("a11y-panel");
  const plusFontBtn = document.getElementById("a11y-font-plus");
  const resetFontBtn = document.getElementById("a11y-font-reset");
  const contrastBtn = document.getElementById("a11y-contrast");
  const motionBtn = document.getElementById("a11y-motion");

  function loadA11y() {
    try {
      return JSON.parse(localStorage.getItem(a11yKey) || "{}");
    } catch (_error) {
      return {};
    }
  }

  function saveA11y(state) {
    localStorage.setItem(a11yKey, JSON.stringify(state));
  }

  function applyA11y(state) {
    document.body.classList.toggle("a11y-large-text", Boolean(state.largeText));
    document.body.classList.toggle("a11y-high-contrast", Boolean(state.highContrast));
    document.body.classList.toggle("a11y-reduce-motion", Boolean(state.reduceMotion));
  }

  const a11yState = loadA11y();
  applyA11y(a11yState);

  if (a11yBtn && a11yPanel) {
    a11yBtn.addEventListener("click", function () {
      a11yPanel.classList.toggle("is-hidden");
    });

    document.addEventListener("click", function (event) {
      const target = event.target;
      if (!a11yPanel.classList.contains("is-hidden") && target instanceof Element) {
        if (!a11yPanel.contains(target) && !a11yBtn.contains(target)) {
          a11yPanel.classList.add("is-hidden");
        }
      }
    });
  }

  if (plusFontBtn) {
    plusFontBtn.addEventListener("click", function () {
      a11yState.largeText = true;
      applyA11y(a11yState);
      saveA11y(a11yState);
    });
  }

  if (resetFontBtn) {
    resetFontBtn.addEventListener("click", function () {
      a11yState.largeText = false;
      applyA11y(a11yState);
      saveA11y(a11yState);
    });
  }

  if (contrastBtn) {
    contrastBtn.addEventListener("click", function () {
      a11yState.highContrast = !a11yState.highContrast;
      applyA11y(a11yState);
      saveA11y(a11yState);
    });
  }

  if (motionBtn) {
    motionBtn.addEventListener("click", function () {
      a11yState.reduceMotion = !a11yState.reduceMotion;
      applyA11y(a11yState);
      saveA11y(a11yState);
    });
  }
})();
