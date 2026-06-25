const GITHUB_CONFIG = {
  owner: "danieleanza-lele",
  repo: "associazionenawroze.it",
  branch: "main",
  contentPath: "_data/siteData.source.json"
};

const STORAGE_KEY = "nawroze_github_admin_token";

const authForm = document.querySelector("[data-auth-form]");
const adminForm = document.querySelector("[data-admin-form]");
const tokenField = document.querySelector("[data-github-token]");
const rememberField = document.querySelector("[data-remember-token]");
const connectButton = document.querySelector("[data-connect-button]");
const logoutButton = document.querySelector("[data-logout-button]");
const addEventButton = document.querySelector("[data-add-event]");
const eventsEditor = document.querySelector("[data-events-editor]");
const statusBox = document.querySelector("[data-admin-status]");
const repoInfo = document.querySelector("[data-repo-info]");
const saveButton = document.querySelector("[data-save-button]");

let currentToken = "";
let currentSha = "";
let currentData = null;

const setStatus = (message, tone = "neutral") => {
  if (!statusBox) {
    return;
  }

  statusBox.textContent = message;
  statusBox.dataset.tone = tone;
};

const encodeBase64Unicode = (value) => btoa(unescape(encodeURIComponent(value)));
const decodeBase64Unicode = (value) =>
  decodeURIComponent(escape(atob(value.replace(/\n/g, ""))));

const apiUrl = () =>
  `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.contentPath}`;

const headers = (token) => ({
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${token}`,
  "X-GitHub-Api-Version": "2022-11-28"
});

const setAdminEnabled = (enabled) => {
  if (!adminForm) {
    return;
  }

  adminForm.querySelectorAll("input, textarea, button").forEach((field) => {
    field.disabled = !enabled;
  });

  if (logoutButton) {
    logoutButton.disabled = !enabled;
  }
};

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

const renderEvents = (items = []) => {
  if (!eventsEditor) {
    return;
  }

  eventsEditor.innerHTML = "";
  items.forEach((event) => {
    eventsEditor.appendChild(createEventEditor(event));
  });
};

const setFieldValue = (name, value) => {
  const field = adminForm?.elements.namedItem(name);

  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
    if (field.type === "checkbox") {
      field.checked = Boolean(value);
    } else {
      field.value = value ?? "";
    }
  }
};

const populateForm = (data) => {
  setFieldValue("brand", data.site.brand);
  setFieldValue("footerTitle", data.site.footerTitle);
  setFieldValue("footerTagline", data.site.footerTagline);
  setFieldValue("pageTitle", data.site.pageTitle);
  setFieldValue("metaDescription", data.site.metaDescription);
  setFieldValue("heroEyebrow", data.hero.eyebrow);
  setFieldValue("heroTitleLines", data.hero.titleLines.join("\n"));
  setFieldValue("heroSubtitle", data.hero.subtitle);
  setFieldValue("heroCopy", data.hero.copy);
  setFieldValue("campaignBody", data.campaign.body);
  setFieldValue("heratEyebrow", data.herat.eyebrow);
  setFieldValue("heratTitle", data.herat.title);
  setFieldValue("heratIntro", data.herat.intro);
  setFieldValue("heratPressureTitle", data.herat.pressureTitle);
  setFieldValue("heratPressureBody", data.herat.pressureBody);
  setFieldValue("heratMortezaTitle", data.herat.mortezaTitle);
  setFieldValue("heratMortezaBody", data.herat.mortezaBody);
  setFieldValue("heratClosing", data.herat.closing);
  setFieldValue("heratCtaText", data.herat.ctaText);
  setFieldValue("heratCtaHref", data.herat.ctaHref);
  setFieldValue("eventsIntro", data.events.intro);
  setFieldValue("eventsCtaLabel", data.events.ctaLabel);
  setFieldValue("donationEnabled", data.donation.enabled);
  setFieldValue("donationTitle", data.donation.title);
  setFieldValue("donationText", data.donation.text);
  setFieldValue("donationAmounts", data.donation.amounts.join(", "));
  setFieldValue("donationButtonText", data.donation.buttonText);
  setFieldValue("contactTitle", data.contact.title);
  setFieldValue("contactBody", data.contact.body);
  setFieldValue("contactEmail", data.contact.email);
  setFieldValue("contactInstagram", data.contact.instagram);
  setFieldValue("contactCampaignName", data.contact.campaignName);
  setFieldValue("thanksTitle", data.thanks.title);
  setFieldValue("thanksText", data.thanks.text);
  setFieldValue("thanksButtonText", data.thanks.buttonText);
  setFieldValue("thanksButtonHref", data.thanks.buttonHref);
  renderEvents(data.events.items || []);
};

const collectEvents = () =>
  Array.from(eventsEditor?.querySelectorAll(".admin-event-item") || [])
    .map((item) => ({
      date: item.querySelector('[name="event-date"]')?.value.trim() || "",
      title: item.querySelector('[name="event-title"]')?.value.trim() || "",
      location: item.querySelector('[name="event-location"]')?.value.trim() || "",
      description: item.querySelector('[name="event-description"]')?.value.trim() || "",
      href: item.querySelector('[name="event-href"]')?.value.trim() || "#messaggio"
    }))
    .filter((event) => event.title);

const buildPayload = () => {
  const nextData = structuredClone(currentData);

  nextData.site.brand = adminForm.brand.value.trim();
  nextData.site.footerTitle = adminForm.footerTitle.value.trim();
  nextData.site.footerTagline = adminForm.footerTagline.value.trim();
  nextData.site.pageTitle = adminForm.pageTitle.value.trim();
  nextData.site.metaDescription = adminForm.metaDescription.value.trim();
  nextData.hero.eyebrow = adminForm.heroEyebrow.value.trim();
  nextData.hero.titleLines = adminForm.heroTitleLines.value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  nextData.hero.subtitle = adminForm.heroSubtitle.value.trim();
  nextData.hero.copy = adminForm.heroCopy.value.trim();
  nextData.campaign.body = adminForm.campaignBody.value.trim();
  nextData.herat.eyebrow = adminForm.heratEyebrow.value.trim();
  nextData.herat.title = adminForm.heratTitle.value.trim();
  nextData.herat.intro = adminForm.heratIntro.value.trim();
  nextData.herat.pressureTitle = adminForm.heratPressureTitle.value.trim();
  nextData.herat.pressureBody = adminForm.heratPressureBody.value.trim();
  nextData.herat.mortezaTitle = adminForm.heratMortezaTitle.value.trim();
  nextData.herat.mortezaBody = adminForm.heratMortezaBody.value.trim();
  nextData.herat.closing = adminForm.heratClosing.value.trim();
  nextData.herat.ctaText = adminForm.heratCtaText.value.trim();
  nextData.herat.ctaHref = adminForm.heratCtaHref.value.trim();
  nextData.events.intro = adminForm.eventsIntro.value.trim();
  nextData.events.ctaLabel = adminForm.eventsCtaLabel.value.trim();
  nextData.events.items = collectEvents();
  nextData.donation.enabled = adminForm.donationEnabled.checked;
  nextData.donation.title = adminForm.donationTitle.value.trim();
  nextData.donation.text = adminForm.donationText.value.trim();
  nextData.donation.amounts = adminForm.donationAmounts.value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  nextData.donation.buttonText = adminForm.donationButtonText.value.trim();
  nextData.contact.title = adminForm.contactTitle.value.trim();
  nextData.contact.body = adminForm.contactBody.value.trim();
  nextData.contact.email = adminForm.contactEmail.value.trim();
  nextData.contact.instagram = adminForm.contactInstagram.value.trim();
  nextData.contact.campaignName = adminForm.contactCampaignName.value.trim();
  nextData.thanks.title = adminForm.thanksTitle.value.trim();
  nextData.thanks.text = adminForm.thanksText.value.trim();
  nextData.thanks.buttonText = adminForm.thanksButtonText.value.trim();
  nextData.thanks.buttonHref = adminForm.thanksButtonHref.value.trim();

  return nextData;
};

const loadContent = async (token) => {
  const response = await fetch(`${apiUrl()}?ref=${encodeURIComponent(GITHUB_CONFIG.branch)}`, {
    headers: headers(token)
  });

  if (!response.ok) {
    throw new Error(`GitHub ha risposto con stato ${response.status}.`);
  }

  const payload = await response.json();
  currentSha = payload.sha;
  currentData = JSON.parse(decodeBase64Unicode(payload.content));
  populateForm(currentData);
};

const connect = async (token) => {
  currentToken = token.trim();

  if (!currentToken) {
    setStatus("Inserisci un token GitHub.", "error");
    return;
  }

  setStatus("Connessione a GitHub in corso...", "neutral");
  connectButton.disabled = true;

  try {
    await loadContent(currentToken);
    setAdminEnabled(true);
    setStatus("Contenuti caricati da GitHub. Ora puoi modificare e salvare.", "success");
    if (rememberField?.checked) {
      window.localStorage.setItem(STORAGE_KEY, currentToken);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    setStatus(`Connessione fallita: ${error.message}`, "error");
    setAdminEnabled(false);
  } finally {
    connectButton.disabled = false;
  }
};

const saveContent = async (event) => {
  event.preventDefault();

  if (!currentToken || !currentData) {
    setStatus("Prima collega GitHub e carica i contenuti.", "error");
    return;
  }

  const nextData = buildPayload();
  const content = `${JSON.stringify(nextData, null, 2)}\n`;

  setStatus("Salvataggio su GitHub in corso...", "neutral");
  saveButton.disabled = true;

  try {
    const response = await fetch(apiUrl(), {
      method: "PUT",
      headers: {
        ...headers(currentToken),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Update site content from admin",
        content: encodeBase64Unicode(content),
        sha: currentSha,
        branch: GITHUB_CONFIG.branch
      })
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.message || `GitHub ha risposto con stato ${response.status}.`);
    }

    const payload = await response.json();
    currentSha = payload.content.sha;
    currentData = nextData;
    setStatus("Salvataggio completato. Netlify eseguirà un nuovo deploy automatico.", "success");
  } catch (error) {
    setStatus(`Salvataggio fallito: ${error.message}`, "error");
  } finally {
    saveButton.disabled = false;
  }
};

authForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await connect(tokenField?.value || "");
});

adminForm?.addEventListener("submit", saveContent);

addEventButton?.addEventListener("click", () => {
  eventsEditor?.appendChild(createEventEditor());
});

logoutButton?.addEventListener("click", () => {
  currentToken = "";
  currentSha = "";
  currentData = null;
  window.localStorage.removeItem(STORAGE_KEY);
  if (tokenField) {
    tokenField.value = "";
  }
  adminForm?.reset();
  if (eventsEditor) {
    eventsEditor.innerHTML = "";
  }
  setAdminEnabled(false);
  setStatus("Sessione chiusa. Il token è stato rimosso dal browser.", "neutral");
});

if (repoInfo) {
  repoInfo.textContent = `${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo} · branch ${GITHUB_CONFIG.branch}`;
}

setAdminEnabled(false);

const savedToken = window.localStorage.getItem(STORAGE_KEY);

if (savedToken && tokenField) {
  tokenField.value = savedToken;
  if (rememberField) {
    rememberField.checked = true;
  }
  connect(savedToken);
}
