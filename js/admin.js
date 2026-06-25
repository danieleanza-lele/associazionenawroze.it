const adminForm = document.querySelector("[data-admin-form]");
const adminStatus = document.querySelector("[data-admin-status]");
const eventsEditor = document.querySelector("[data-events-editor]");
const resetButton = document.querySelector("[data-reset-site]");

let adminData = loadSiteData();

const createEventEditor = (event = {}) => {
  const item = document.createElement("div");
  item.className = "admin-event-item";
  item.innerHTML = `
    <div class="admin-grid">
      <div class="field">
        <label>Data</label>
        <input type="text" name="event-date" value="${event.date || ""}">
      </div>
      <div class="field">
        <label>Titolo</label>
        <input type="text" name="event-title" value="${event.title || ""}">
      </div>
    </div>
    <div class="field">
      <label>Luogo</label>
      <input type="text" name="event-location" value="${event.location || ""}">
    </div>
    <div class="field">
      <label>Descrizione</label>
      <textarea name="event-description" rows="4">${event.description || ""}</textarea>
    </div>
    <div class="admin-grid">
      <div class="field">
        <label>Link pulsante</label>
        <input type="text" name="event-href" value="${event.href || "#messaggio"}">
      </div>
      <div class="field field-actions">
        <button class="button button-outline-dark" type="button" data-remove-event>Rimuovi evento</button>
      </div>
    </div>
  `;

  item.querySelector("[data-remove-event]")?.addEventListener("click", () => {
    item.remove();
  });

  return item;
};

const renderAdminEvents = () => {
  if (!eventsEditor) {
    return;
  }

  eventsEditor.innerHTML = "";
  adminData.events.items.forEach((event) => {
    eventsEditor.appendChild(createEventEditor(event));
  });
};

const setFieldValue = (name, value) => {
  const field = adminForm?.elements.namedItem(name);

  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
    if (field.type === "checkbox") {
      field.checked = Boolean(value);
      return;
    }

    field.value = value;
  }
};

const populateAdminForm = () => {
  setFieldValue("brand", adminData.site.brand);
  setFieldValue("footerTitle", adminData.site.footerTitle);
  setFieldValue("footerTagline", adminData.site.footerTagline);
  setFieldValue("pageTitle", adminData.site.pageTitle);
  setFieldValue("metaDescription", adminData.site.metaDescription);
  setFieldValue("heroEyebrow", adminData.hero.eyebrow);
  setFieldValue("heroTitleLines", adminData.hero.titleLines.join("\n"));
  setFieldValue("heroSubtitle", adminData.hero.subtitle);
  setFieldValue("heroCopy", adminData.hero.copy);
  setFieldValue("campaignBody", adminData.campaign.body);
  setFieldValue("heratEyebrow", adminData.herat.eyebrow);
  setFieldValue("heratTitle", adminData.herat.title);
  setFieldValue("heratIntro", adminData.herat.intro);
  setFieldValue("heratPressureTitle", adminData.herat.pressureTitle);
  setFieldValue("heratPressureBody", adminData.herat.pressureBody);
  setFieldValue("heratMortezaTitle", adminData.herat.mortezaTitle);
  setFieldValue("heratMortezaBody", adminData.herat.mortezaBody);
  setFieldValue("heratClosing", adminData.herat.closing);
  setFieldValue("heratCtaText", adminData.herat.ctaText);
  setFieldValue("heratCtaHref", adminData.herat.ctaHref);
  setFieldValue("eventsIntro", adminData.events.intro);
  setFieldValue("eventsCtaLabel", adminData.events.ctaLabel);
  setFieldValue("donationEnabled", adminData.donation.enabled);
  setFieldValue("donationTitle", adminData.donation.title);
  setFieldValue("donationText", adminData.donation.text);
  setFieldValue("donationAmounts", adminData.donation.amounts.join(", "));
  setFieldValue("donationButtonText", adminData.donation.buttonText);
  setFieldValue("contactTitle", adminData.contact.title);
  setFieldValue("contactBody", adminData.contact.body);
  setFieldValue("contactEmail", adminData.contact.email);
  setFieldValue("contactInstagram", adminData.contact.instagram);
  setFieldValue("contactCampaignName", adminData.contact.campaignName);
  renderAdminEvents();
};

const collectEvents = () => {
  const items = Array.from(eventsEditor?.querySelectorAll(".admin-event-item") || []);

  return items
    .map((item) => ({
      date: item.querySelector('[name="event-date"]')?.value.trim() || "",
      title: item.querySelector('[name="event-title"]')?.value.trim() || "",
      location: item.querySelector('[name="event-location"]')?.value.trim() || "",
      description: item.querySelector('[name="event-description"]')?.value.trim() || "",
      href: item.querySelector('[name="event-href"]')?.value.trim() || "#messaggio"
    }))
    .filter((event) => event.title);
};

if (adminForm) {
  populateAdminForm();

  adminForm.addEventListener("submit", (event) => {
    event.preventDefault();

    adminData = {
      site: {
        brand: adminForm.brand.value.trim(),
        footerTitle: adminForm.footerTitle.value.trim(),
        footerTagline: adminForm.footerTagline.value.trim(),
        pageTitle: adminForm.pageTitle.value.trim(),
        metaDescription: adminForm.metaDescription.value.trim()
      },
      hero: {
        eyebrow: adminForm.heroEyebrow.value.trim(),
        titleLines: adminForm.heroTitleLines.value
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        subtitle: adminForm.heroSubtitle.value.trim(),
        copy: adminForm.heroCopy.value.trim(),
        primaryCtaText: DEFAULT_SITE_DATA.hero.primaryCtaText,
        primaryCtaHref: DEFAULT_SITE_DATA.hero.primaryCtaHref,
        secondaryCtaText: DEFAULT_SITE_DATA.hero.secondaryCtaText,
        secondaryCtaHref: DEFAULT_SITE_DATA.hero.secondaryCtaHref
      },
      campaign: {
        body: adminForm.campaignBody.value.trim()
      },
      herat: {
        eyebrow: adminForm.heratEyebrow.value.trim(),
        title: adminForm.heratTitle.value.trim(),
        intro: adminForm.heratIntro.value.trim(),
        pressureTitle: adminForm.heratPressureTitle.value.trim(),
        pressureBody: adminForm.heratPressureBody.value.trim(),
        mortezaTitle: adminForm.heratMortezaTitle.value.trim(),
        mortezaBody: adminForm.heratMortezaBody.value.trim(),
        closing: adminForm.heratClosing.value.trim(),
        ctaText: adminForm.heratCtaText.value.trim(),
        ctaHref: adminForm.heratCtaHref.value.trim()
      },
      events: {
        intro: adminForm.eventsIntro.value.trim(),
        ctaLabel: adminForm.eventsCtaLabel.value.trim(),
        items: collectEvents()
      },
      donation: {
        enabled: adminForm.donationEnabled.checked,
        title: adminForm.donationTitle.value.trim(),
        text: adminForm.donationText.value.trim(),
        amounts: adminForm.donationAmounts.value
          .split(",")
          .map((amount) => amount.trim())
          .filter(Boolean),
        buttonText: adminForm.donationButtonText.value.trim()
      },
      contact: {
        title: adminForm.contactTitle.value.trim(),
        body: adminForm.contactBody.value.trim(),
        email: adminForm.contactEmail.value.trim(),
        instagram: adminForm.contactInstagram.value.trim(),
        campaignName: adminForm.contactCampaignName.value.trim()
      }
    };

    saveSiteData(adminData);

    if (adminStatus) {
      adminStatus.textContent = "Modifiche salvate nel browser. Ricarica il sito pubblico per vederle.";
    }
  });
}

document.querySelector("[data-add-event]")?.addEventListener("click", () => {
  eventsEditor?.appendChild(createEventEditor());
});

resetButton?.addEventListener("click", () => {
  adminData = resetSiteData();
  populateAdminForm();

  if (adminStatus) {
    adminStatus.textContent = "Contenuti ripristinati ai valori iniziali.";
  }
});
