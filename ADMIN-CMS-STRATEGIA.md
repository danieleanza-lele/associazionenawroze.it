No: per andare online non serve per forza un backend custom.

La soluzione più semplice ed economica, oggi `25 giugno 2026`, è:

`Sito statico + Decap CMS + GitHub repo + Netlify hosting/Identity`

Perché la consiglio:

- il sito resta statico, quindi semplice e veloce
- l’admin vive su `/admin`
- i contenuti vengono salvati nel repository Git, non in un database tuo
- non devi sviluppare un backend custom
- puoi invitare gli editor senza dargli accesso diretto al codice, usando Netlify Identity

In pratica:

1. il sito pubblico resta HTML/CSS/JS statico
2. aggiungiamo Decap CMS
3. Netlify gestisce login/admin
4. GitHub conserva contenuti e storico modifiche
5. ogni modifica pubblicata genera un nuovo deploy

Costo:

- Decap CMS è open source e gratuito: [https://decapcms.org/](https://decapcms.org/)
- Netlify ha piano `Free $0` e `Personal $9/mese`, con `Pro $20/mese` se serve crescere: [https://www.netlify.com/pricing/](https://www.netlify.com/pricing/)
- Netlify Identity risulta ancora supportato secondo aggiornamento del `19 febbraio 2026`: [https://www.netlify.com/blog/auth0-extension-identity-changes/](https://www.netlify.com/blog/auth0-extension-identity-changes/)
- CloudCannon è molto comodo ma parte da `55 USD/mese`, quindi non è la scelta più economica: [https://cloudcannon.com/pricing/](https://cloudcannon.com/pricing/)
- TinaCMS ha un piano free, ma per questo progetto statico semplice Decap è in genere più lineare; Tina free parte da `2 users`: [https://tina.io/pricing](https://tina.io/pricing)

Quindi la mia raccomandazione netta è:

- `MVP economico`: `Netlify + Decap CMS + GitHub`
- `nessun backend custom`
- `admin vero online`
- `costo iniziale: 0 €`, oppure `9 €/mese` se superi i limiti/ti serve un piano più tranquillo

Importante:

- questo non è “senza backend” in senso assoluto
- è “senza backend sviluppato da noi”
- l’autenticazione e il layer di gestione sono delegati a Netlify, mentre il contenuto sta su GitHub

Se vuoi, nel prossimo passo posso preparare direttamente il progetto per questa architettura:

- `/admin/index.html`
- `admin/config.yml`
- struttura contenuti per eventi, donazioni, contatti
- rimozione dell’attuale admin `localStorage` oppure mantenimento solo come fallback locale
