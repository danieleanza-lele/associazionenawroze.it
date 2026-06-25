const siteData = loadSiteData();

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const navLinks = navigation ? Array.from(navigation.querySelectorAll("a")) : [];
const donationNote = document.querySelector("[data-donation-note]");
const donateButton = document.querySelector("[data-donate-button]");
const currentYear = document.querySelector("[data-current-year]");
const eventGrid = document.querySelector("[data-event-grid]");
const heroTitle = document.querySelector("[data-hero-title]");
const donationOptions = document.querySelector("[data-donation-options]");
const donationSection = document.querySelector("[data-donation-section]");
const donationNavLink = document.querySelector("[data-donation-nav]");
const donationFooterLink = document.querySelector("[data-donation-footer-link]");
const backToTop = document.querySelector("[data-back-to-top]");

const bindText = (selector, value) => {
  const element = document.querySelector(selector);

  if (element && typeof value === "string") {
    element.textContent = value;
  }
};

const bindLink = (selector, text, href) => {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  element.textContent = text;
  element.setAttribute("href", href);
};

const renderHeroTitle = () => {
  if (!heroTitle) {
    return;
  }

  const colors = ["flag-black", "flag-red", "flag-green"];
  const lines = siteData.hero.titleLines.length
    ? siteData.hero.titleLines
    : DEFAULT_SITE_DATA.hero.titleLines;

  heroTitle.innerHTML = "";

  lines.forEach((line, index) => {
    const span = document.createElement("span");
    span.className = colors[index] || "flag-black";
    span.textContent = line;
    heroTitle.appendChild(span);

    if (index < siteData.hero.titleLines.length - 1) {
      heroTitle.appendChild(document.createElement("br"));
    }
  });
};

const renderEvents = () => {
  if (!eventGrid) {
    return;
  }

  eventGrid.innerHTML = "";

  if (!siteData.events.items.length) {
    const emptyCard = document.createElement("article");
    emptyCard.className = "event-card";
    emptyCard.innerHTML = `
      <p class="event-date">Nessun evento pubblicato</p>
      <h3>Nuovi appuntamenti in preparazione</h3>
      <p class="event-location">Aggiorna questa sezione da admin.html</p>
      <p>Puoi aggiungere più eventi dall'area admin locale e saranno mostrati qui automaticamente.</p>
    `;
    eventGrid.appendChild(emptyCard);
    return;
  }

  siteData.events.items.forEach((event) => {
    const article = document.createElement("article");
    article.className = "event-card";
    article.innerHTML = `
      <p class="event-date">${event.date}</p>
      <h3>${event.title}</h3>
      <p class="event-location">${event.location}</p>
      <p>${event.description}</p>
      <a class="button button-outline-dark" href="${event.href || "#messaggio"}">${siteData.events.ctaLabel}</a>
    `;
    eventGrid.appendChild(article);
  });
};

const renderDonationOptions = () => {
  if (!donationOptions) {
    return;
  }

  donationOptions.innerHTML = "";

  siteData.donation.amounts.forEach((amount, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `donation-chip${index === 0 ? " is-active" : ""}`;
    button.setAttribute("data-donation-value", amount);
    button.textContent = amount;
    donationOptions.appendChild(button);
  });

  if (donationNote) {
    donationNote.textContent = `Importo selezionato: ${siteData.donation.amounts[0] || "Importo libero"}.`;
  }
};

const setHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 20);

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

const bindSiteData = () => {
  document.title = siteData.site.pageTitle;

  const metaDescription = document.querySelector('meta[name="description"]');

  if (metaDescription) {
    metaDescription.setAttribute("content", siteData.site.metaDescription);
  }

  bindText("[data-brand-text]", siteData.site.brand);
  bindText("[data-hero-eyebrow]", siteData.hero.eyebrow);
  bindText("[data-hero-subtitle]", siteData.hero.subtitle);
  bindText("[data-hero-copy]", siteData.hero.copy);
  bindLink("[data-hero-primary]", siteData.hero.primaryCtaText, siteData.hero.primaryCtaHref);
  bindLink("[data-hero-secondary]", siteData.hero.secondaryCtaText, siteData.hero.secondaryCtaHref);
  bindText("[data-campaign-body]", siteData.campaign.body);
  bindText("[data-herat-eyebrow]", siteData.herat.eyebrow);
  bindText("[data-herat-title]", siteData.herat.title);
  bindText("[data-herat-intro]", siteData.herat.intro);
  bindText("[data-herat-pressure-title]", siteData.herat.pressureTitle);
  bindText("[data-herat-pressure-body]", siteData.herat.pressureBody);
  bindText("[data-herat-morteza-title]", siteData.herat.mortezaTitle);
  bindText("[data-herat-morteza-body]", siteData.herat.mortezaBody);
  bindText("[data-herat-closing]", siteData.herat.closing);
  bindLink("[data-herat-cta]", siteData.herat.ctaText, siteData.herat.ctaHref);
  bindText("[data-events-intro]", siteData.events.intro);
  if (donationSection) {
    donationSection.hidden = !siteData.donation.enabled;
  }

  if (donationNavLink) {
    donationNavLink.hidden = !siteData.donation.enabled;
  }

  if (donationFooterLink) {
    donationFooterLink.hidden = !siteData.donation.enabled;
  }

  if (siteData.donation.enabled) {
    bindText("[data-donation-title]", siteData.donation.title);
    bindText("[data-donation-text]", siteData.donation.text);
    bindText("[data-donate-button]", siteData.donation.buttonText);
  }
  bindText("[data-contact-title]", siteData.contact.title);
  bindText("[data-contact-body]", siteData.contact.body);
  bindText("[data-contact-email]", siteData.contact.email);
  bindText("[data-contact-instagram]", siteData.contact.instagram);
  bindText("[data-contact-campaign]", siteData.contact.campaignName);
  bindText("[data-footer-title]", siteData.site.footerTitle);
  bindText("[data-footer-tagline]", siteData.site.footerTagline);
  bindText("[data-footer-copyright-brand]", siteData.site.footerTitle);

  const emailLink = document.querySelector("[data-contact-email-link]");

  if (emailLink) {
    emailLink.setAttribute("href", `mailto:${siteData.contact.email}`);
  }

  renderHeroTitle();
  renderEvents();
  if (siteData.donation.enabled) {
    renderDonationOptions();
  }
};

bindSiteData();

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

  if (
    !siteData.donation.enabled ||
    !(target instanceof HTMLElement) ||
    !target.classList.contains("donation-chip")
  ) {
    return;
  }

  const chips = Array.from(document.querySelectorAll(".donation-chip"));
  chips.forEach((item) => item.classList.remove("is-active"));
  target.classList.add("is-active");

  const value = target.getAttribute("data-donation-value") || "Importo libero";

  if (donationNote) {
    donationNote.textContent = `Importo selezionato: ${value}.`;
  }
});

if (siteData.donation.enabled && donateButton && donationNote) {
  donateButton.addEventListener("click", () => {
    const activeChip = document.querySelector(".donation-chip.is-active");
    const value = activeChip?.getAttribute("data-donation-value") || "Importo libero";
    donationNote.textContent = `Importo selezionato: ${value}. Integrazione pagamento da collegare.`;
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
