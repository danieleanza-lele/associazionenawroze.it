# Voci di Libertà Afghana

Landing page one-page statica in italiano per una campagna di sensibilizzazione sui diritti, la dignità e la libertà delle donne afghane. Il sito deriva da un export Google Stitch, riorganizzato in HTML, CSS e JavaScript puliti, responsivi e facili da pubblicare.

## Struttura del progetto

```text
.
|-- admin.html
|-- index.html
|-- css/
|   `-- style.css
|-- js/
|   |-- admin.js
|   |-- site-data.js
|   `-- main.js
|-- assets/
|   `-- images/
|       `-- hero-afghan-woman.png
`-- README.md
```

## Avvio in locale

Puoi usare una di queste opzioni:

1. Apri direttamente `index.html` nel browser.
2. Oppure usa VS Code con Live Server sulla cartella del progetto.
3. In alternativa, avvia un server statico qualsiasi dalla root del progetto.

Il sito non richiede build, dipendenze o framework.

## Area admin locale

Apri [admin.html](/C:/dev/afghanistan/admin.html) per gestire i contenuti essenziali del sito dal browser.

Funzionalità incluse:

- modifica titolo header e footer;
- aggiorna hero, testo campagna, contatti e donazioni;
- aggiunge, modifica e rimuove più eventi;
- salva tutto in `localStorage`, senza backend.

Nota importante:

- le modifiche restano nel browser e nel dispositivo corrente;
- se svuoti il `localStorage`, torni ai contenuti di default;
- per una vera area admin online servirà poi un backend o un CMS.

## Dove modificare i contenuti

### Testi e struttura della pagina

Modifica [index.html](/C:/dev/afghanistan/index.html).

Sezioni principali:

- Header e navigazione: parte iniziale del file.
- Hero: sezione `hero-section`.
- Problema: sezione `#problema`.
- Eventi: sezione `#eventi`.
- Azioni: sezione `#azioni`.
- Donazioni: sezione `#donazione`.
- Contatti e form: sezione `#contatti`.
- Footer: parte finale del file.

### Eventi

Gli eventi non sono più hardcoded nel markup della pagina pubblica: vengono renderizzati da [js/main.js](/C:/dev/afghanistan/js/main.js) leggendo i dati condivisi in [js/site-data.js](/C:/dev/afghanistan/js/site-data.js) oppure i dati salvati da [admin.html](/C:/dev/afghanistan/admin.html).

Per aggiungere eventi, il metodo consigliato è usare [admin.html](/C:/dev/afghanistan/admin.html).

Se vuoi modificare i default nel codice, aggiorna `DEFAULT_SITE_DATA.events.items` dentro [js/site-data.js](/C:/dev/afghanistan/js/site-data.js).

### Contatti

I contatti si modificano preferibilmente da [admin.html](/C:/dev/afghanistan/admin.html). I valori di default sono in [js/site-data.js](/C:/dev/afghanistan/js/site-data.js).

Campi gestiti:

- email
- handle Instagram
- nome campagna
- testo privacy

### Form messaggio

Il markup del form è in [index.html](/C:/dev/afghanistan/index.html). Il form è predisposto per `Netlify Forms`.

Nel codice è presente il commento:

```html
<!-- TODO: configurare su Netlify la notifica email del form verso l'indirizzo desiderato -->
```

Per attivarlo su Netlify:

1. pubblica il sito su Netlify;
2. invia almeno una volta il form dal sito online, così Netlify rileva la form `contatto-campagna`;
3. in Netlify vai su `Forms`;
4. apri la form rilevata;
5. aggiungi una notifica email verso l'indirizzo desiderato.

### Donazioni

La sezione donazione è renderizzata in [index.html](/C:/dev/afghanistan/index.html), mentre importi e testi sono letti da [js/site-data.js](/C:/dev/afghanistan/js/site-data.js) e possono essere aggiornati da [admin.html](/C:/dev/afghanistan/admin.html).

Nel codice è presente il commento:

```html
<!-- TODO: integrare qui Stripe, PayPal o altro sistema di pagamento -->
```

Per integrare i pagamenti:

- sostituisci il pulsante `Dona ora` con il flusso Stripe o PayPal;
- usa i valori dei pulsanti `.donation-chip` come importi suggeriti;
- aggiorna l`handler JS del bottone in `js/main.js`.

### Immagini

Le immagini stanno in `assets/images/`.

- Hero principale: `assets/images/hero-afghan-woman.png`

Per sostituirla, copia un nuovo file nella stessa cartella e aggiorna il relativo `src` in [index.html](/C:/dev/afghanistan/index.html).

## Personalizzazione grafica

La grafica principale è definita in [css/style.css](/C:/dev/afghanistan/css/style.css).

Punti utili:

- variabili colore: inizio file (`:root`)
- header e navigazione: blocchi `.site-header`, `.site-nav`
- hero: blocchi `.hero-*`
- griglie sezioni e card: `.impact-grid`, `.event-card`, `.action-grid`
- form e footer: `.contact-*`, `.form-*`, `.site-footer`

## Pubblicazione rapida

### Netlify

1. Crea un nuovo sito da cartella o repository.
2. Imposta come cartella pubblica la root del progetto.
3. Nessun comando di build richiesto.

Se fai drag-and-drop, carica direttamente la cartella del progetto con `index.html` in root.

### Vercel

1. Importa il progetto.
2. Seleziona framework `Other` oppure lascia static site.
3. Nessun build command necessario.
4. Output directory non richiesta, perché `index.html` è già in root.

## Origine del design

Il sito prende ispirazione dai file Stitch:

- `stitch_voci_di_libert_afghana/istruzione._lavoro._libert._landing_page_2/code.html`
- `stitch_voci_di_libert_afghana/istruzione._lavoro._libert._versione_luminosa/code.html`

Entrambi gli HTML esportati risultano identici; è stata mantenuta la direzione editoriale, con palette nero-rosso-verde e toni sabbia, ma il codice è stato riscritto in una struttura statica più pulita e mantenibile.
