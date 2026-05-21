# Scrigno digitale di compleanno — versione WOW

Sito statico mobile-first, pronto per GitHub Pages, pensato come regalo emozionale da Sergio alla sua migliore amica.

Questa versione procede a capitoli: ogni sezione è una busta da aprire, non una pagina lunga da scorrere.

## PIN demo

Il PIN predefinito è:

```txt
1234
```

## Come provarlo subito

Apri `index.html` nel browser.

Il sito funziona anche senza foto: al posto delle immagini compaiono placeholder eleganti.

## Come pubblicarlo su GitHub Pages

1. Crea un repository su GitHub.
2. Carica questi file e cartelle nella root del repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - `assets/img/`
   - `assets/audio/`
3. Vai su **Settings → Pages**.
4. In **Build and deployment**, seleziona **Deploy from a branch**.
5. Seleziona branch `main` e folder `/root`.
6. Salva.

Dopo qualche istante GitHub mostrerà il link pubblico del sito.

## Come cambiare nome

Apri `script.js` e modifica:

```js
friendName: "amica mia",
senderName: "Sergio",
birthdayText: "La mulți ani",
```

Esempio:

```js
friendName: "Ana",
senderName: "Sergio",
birthdayText: "La mulți ani",
```

## Come cambiare PIN

Apri `index.html` nel browser, poi apri la console sviluppatore.

Scrivi:

```js
generatePinHash("NUOVO_PIN").then(console.log)
```

Copia l’hash generato e incollalo in `script.js` qui:

```js
pinHash: "INCOLLA_QUI_L_HASH",
```

Nota: su GitHub Pages non è vera sicurezza. Il codice del sito è visibile a chi sa usare gli strumenti sviluppatore. Il PIN serve come effetto scenico.

## Come aggiungere foto

Inserisci fino a 6 foto in:

```txt
assets/img/
```

con questi nomi:

```txt
foto1.jpg
foto2.jpg
foto3.jpg
foto4.jpg
foto5.jpg
foto6.jpg
```

Puoi cambiare le didascalie in `script.js`, dentro `CONFIG.photos`.

## Come aggiungere una canzone vera

Inserisci il file audio qui:

```txt
assets/audio/canzone.mp3
```

Il sito proverà a usare quel file quando premi il pulsante musica.

Per usare un nome diverso, cambia in `script.js`:

```js
musicSrc: "assets/audio/canzone.mp3",
```

## Easter egg inclusi

- 5 click sulla stellina del footer.
- Click sul cuore nascosto nella lettera dei giorni difficili.
- Digitare `amica` sulla tastiera.
- Digitare `sergio` sulla tastiera.
- Doppio click sul bottone musica.
- Doppio click sul nastro del certificato.
- 5 click sul generatore di motivazioni.

## Struttura

```txt
index.html
style.css
script.js
assets/
  img/
  audio/
```
