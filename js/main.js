const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const navLinks = navigation ? Array.from(navigation.querySelectorAll("a")) : [];
const donationNote = document.querySelector("[data-donation-note]");
const donateButton = document.querySelector("[data-donate-button]");
const currentYear = document.querySelector("[data-current-year]");
const backToTop = document.querySelector("[data-back-to-top]");

const setHeaderState = () => {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }

  if (backToTop) {
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  }
};

const closeMenu = () => {
  if (!menuToggle || !navigation) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
};

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (
      target instanceof Node &&
      !navigation.contains(target) &&
      !menuToggle.contains(target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement) || !target.classList.contains("donation-chip")) {
    return;
  }

  const chips = Array.from(document.querySelectorAll(".donation-chip"));
  chips.forEach((chip) => chip.classList.remove("is-active"));
  target.classList.add("is-active");

  if (donationNote) {
    const value = target.getAttribute("data-donation-value") || "Importo libero";
    donationNote.textContent = `Importo selezionato: ${value}.`;
  }
});

if (donateButton && donationNote) {
  donateButton.addEventListener("click", () => {
    const activeChip = document.querySelector(".donation-chip.is-active");
    const value = activeChip?.getAttribute("data-donation-value") || "Importo libero";
    donationNote.textContent = `Importo selezionato: ${value}. Collegamento pagamento da attivare.`;
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
