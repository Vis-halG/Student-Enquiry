/* =============================
   STATE
============================= */
const state = {
  isMobileMenuOpen: false
};

/* =============================
   PAGE LOAD (BANNER LOGIC)
============================= */
window.addEventListener("DOMContentLoaded", () => {

  // अगर पहले banner बंद किया गया था
  if (localStorage.getItem("bannerClosed") === "true") {
    const banner = document.getElementById("counselingBanner");
    const header = document.getElementById("siteHeader");

    if (banner) {
      banner.style.display = "none";   // Banner हटाओ
    }

    if (header) {
      header.style.top = "0";           // Header ऊपर लाओ
    }
  }
});

/* =============================
   CLOSE BANNER (ON X CLICK)
============================= */
function handleCloseBanner() {
  const banner = document.getElementById("counselingBanner");
  const header = document.getElementById("siteHeader");

  if (banner) {
    banner.classList.add("hidden");   // Slide-up animation
  }

  if (header) {
    header.style.top = "0";
  }

  // Store permanently (so refresh पर वापस न आए)
  localStorage.setItem("bannerClosed", "true");
}

/* =============================
   MOBILE MENU TOGGLE
============================= */
function handleToggleMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const menuIcon = document.getElementById('menuIcon');
  const menuToggle = document.querySelector('.menu-toggle');

  state.isMobileMenuOpen = !state.isMobileMenuOpen;

  if (state.isMobileMenuOpen) {
    mobileNav.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');

    // Cross icon
    menuIcon.innerHTML = `
      <path d="m256-200-56-56
      224-224-224-224 56-56 224 224 224-224 
      56 56-224 224 224 224-56 56-224-224
      -224 224Z"/>
    `;

    document.body.style.overflow = 'hidden';

  } else {
    mobileNav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');

    // Hamburger icon
    menuIcon.innerHTML = `
      <path d="M120-240v-80h720v80H120Zm0-200
      v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
    `;

    document.body.style.overflow = '';
  }
}

/* =============================
   CLOSE MENU ON OUTSIDE CLICK
============================= */
document.addEventListener("click", (event) => {
  const mobileNav = document.getElementById("mobileNav");
  const menuToggle = document.querySelector(".menu-toggle");

  if (
    state.isMobileMenuOpen &&
    !mobileNav.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    handleToggleMenu();
  }
});

/* =============================
   CLOSE MENU ON LINK CLICK
============================= */
document.querySelectorAll(".mobile-nav__item a").forEach((link) => {
  link.addEventListener("click", () => {
    if (state.isMobileMenuOpen) handleToggleMenu();
  });
});

/* =============================
   AUTO CLOSE ON RESIZE
============================= */
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    if (window.innerWidth >= 1050 && state.isMobileMenuOpen) {
      handleToggleMenu();
    }
  }, 200);
});

