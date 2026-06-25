const SITE_STORAGE_KEY = "afghan-campaign-site-data";

const DEFAULT_SITE_DATA = {
  site: {
    brand: "Istruzione Lavoro Libertà",
    footerTitle: "Voci di Libertà Afghana",
    footerTagline: "La libertà di una donna riguarda la dignità di tutti.",
    pageTitle: "Voci di Libertà Afghana | Istruzione. Lavoro. Libertà.",
    metaDescription:
      "Campagna italiana di sensibilizzazione per i diritti, la dignità e la libertà delle donne afghane."
  },
  hero: {
    eyebrow: "Campagna italiana per i diritti delle donne afghane",
    titleLines: ["Istruzione.", "Lavoro.", "Libertà."],
    subtitle: "Campagna italiana per i diritti e la dignità delle donne afghane.",
    copy:
      "Per molte donne afghane, studiare, lavorare e scegliere il proprio futuro è diventato un atto di resistenza.",
    primaryCtaText: "Partecipa alla campagna",
    primaryCtaHref: "#azioni",
    secondaryCtaText: "Lascia un messaggio",
    secondaryCtaHref: "#messaggio"
  },
  campaign: {
    body:
      "La campagna “Istruzione. Lavoro. Libertà.” nasce per amplificare in Italia la voce delle donne che resistono in Afghanistan. Vogliamo promuovere consapevolezza, incontri, eventi, manifestazioni e azioni concrete."
  },
  herat: {
    eyebrow: "Herat, giugno 2026",
    title: "La repressione entra nella vita quotidiana.",
    intro:
      "Nelle ultime settimane, nella provincia di Herat, si è registrato un ulteriore irrigidimento dei controlli sulle donne nello spazio pubblico. Pattugliamenti, arresti, intimidazioni e violenze hanno alimentato un clima di paura che colpisce la libertà di movimento, la presenza pubblica e perfino l’accesso alle cure.",
    pressureTitle: "Non è solo controllo. È intimidazione quotidiana.",
    pressureBody:
      "Secondo testimonianze e fonti locali, l’aumento delle pattuglie e l’inasprimento delle regole sull’abbigliamento femminile hanno reso più rischioso uscire, attraversare i quartieri, entrare nei mercati e vivere gli spazi comuni. In alcuni casi, i controlli sono stati percepiti come invasivi e umilianti.",
    mortezaTitle: "Il nome che non deve essere cancellato",
    mortezaBody:
      "Tra le vittime della repressione c’era Morteza Karimi, un adolescente colpito durante le proteste contro le nuove restrizioni imposte alle donne. La sua morte è diventata il simbolo di una violenza che non vuole solo reprimere, ma anche impedire memoria, cura e testimonianza.",
    closing:
      "Quando un potere teme perfino il ricordo di un ragazzo ucciso durante una protesta, quel ricordo diventa ancora più necessario da custodire e diffondere.",
    ctaText: "Partecipa agli eventi",
    ctaHref: "#eventi"
  },
  events: {
    intro: "Nuovi appuntamenti saranno annunciati presto.",
    ctaLabel: "Partecipa",
    items: [
      {
        date: "Domenica 28 giugno",
        title: "Incontro pubblico in lingua farsi",
        location: "Polocivico Esquilino, via Galilei 57, ore 19:30",
        description:
          "Incontro pubblico in lingua farsi dedicato alla restituzione e al confronto sulla manifestazione del 21 giugno a Roma.",
        href: "#messaggio"
      }
    ]
  },
  donation: {
    enabled: false,
    title: "Anche un piccolo gesto può dare forza a una voce",
    text:
      "La donazione sostiene materiali informativi, eventi pubblici, iniziative di sensibilizzazione e attività della campagna.",
    amounts: ["5 €", "10 €", "20 €", "Importo libero"],
    buttonText: "Dona ora"
  },
  contact: {
    title: "Voci di Libertà Afghana",
    body:
      "Raccogliamo adesioni, proposte, disponibilità per eventi e messaggi di sostegno da tutta Italia.",
    email: "info@vocidilibertaafghana.it",
    instagram: "@vocidilibertaafghana",
    campaignName: "Voci di Libertà Afghana",
    privacyText:
      "I dati raccolti tramite il form saranno usati esclusivamente per rispondere ai messaggi e aggiornare sulla campagna quando richiesto."
  }
};

const cloneSiteData = (data) => JSON.parse(JSON.stringify(data));

const mergeSiteData = (base, override) => {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : cloneSiteData(base);
  }

  if (typeof base !== "object" || base === null) {
    return override ?? base;
  }

  const result = {};
  const keys = new Set([...Object.keys(base), ...Object.keys(override || {})]);

  keys.forEach((key) => {
    result[key] = mergeSiteData(base[key], override?.[key]);
  });

  return result;
};

const loadSiteData = () => {
  try {
    const raw = window.localStorage.getItem(SITE_STORAGE_KEY);

    if (!raw) {
      return cloneSiteData(DEFAULT_SITE_DATA);
    }

    const parsed = JSON.parse(raw);
    return mergeSiteData(DEFAULT_SITE_DATA, parsed);
  } catch (_error) {
    return cloneSiteData(DEFAULT_SITE_DATA);
  }
};

const saveSiteData = (data) => {
  window.localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(data));
};

const resetSiteData = () => {
  window.localStorage.removeItem(SITE_STORAGE_KEY);
  return cloneSiteData(DEFAULT_SITE_DATA);
};
