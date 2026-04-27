const menuToggle = document.querySelector(".menu-toggle");
const navOverlay = document.querySelector(".nav-overlay");
const navClose = document.querySelector(".nav-close");

function setNavOpen(isOpen) {
  document.body.classList.toggle("nav-open", isOpen);
  if (menuToggle) menuToggle.setAttribute("aria-expanded", String(isOpen));
  if (navOverlay) navOverlay.setAttribute("aria-hidden", String(!isOpen));
}

if (menuToggle && navOverlay) {
  menuToggle.addEventListener("click", () => setNavOpen(true));
}

if (navClose) {
  navClose.addEventListener("click", () => setNavOpen(false));
}

if (navOverlay) {
  navOverlay.addEventListener("click", (e) => {
    const target = e.target;
    const clickedLink = target && target.closest && target.closest("a");
    if (clickedLink) setNavOpen(false);
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setNavOpen(false);
});

const carousels = document.querySelectorAll("[data-carousel]");
const reduceMotion =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

carousels.forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll("img"));
  if (slides.length < 2) return;

  let idx = slides.findIndex((s) => s.classList.contains("is-active"));
  if (idx < 0) idx = 0;
  slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));

  if (reduceMotion) return;

  function centerSlide(slide) {
    const left =
      slide.offsetLeft - (carousel.clientWidth - slide.clientWidth) / 2;

    // Prefer smooth scrolling, but fall back if unsupported.
    try {
      carousel.scrollTo({ left, behavior: "smooth" });
    } catch {
      carousel.scrollLeft = left;
    }
  }

  // Initial centering once layout is ready
  requestAnimationFrame(() => {
    centerSlide(slides[idx]);
    requestAnimationFrame(() => centerSlide(slides[idx]));
  });

  setInterval(() => {
    slides[idx].classList.remove("is-active");
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add("is-active");
    requestAnimationFrame(() => {
      centerSlide(slides[idx]);
      requestAnimationFrame(() => centerSlide(slides[idx]));
    });
  }, 3000);
});

const revealNodes = document.querySelectorAll(".section, .site-footer");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal", "in-view");
      }
    });
  },
  { threshold: 0.15 }
);

revealNodes.forEach((node) => {
  node.classList.add("reveal");
  observer.observe(node);
});
