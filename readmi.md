## Method find()

Il metodo find restituisce TUTTI i documenti presenti in una collection.

## Method find() with query

Al metodo find() possiamo passare un oggetto contenente altre query
e.g AuthorModel.find({ age: 18 })

Oppure possiamo anche effettuare query all'interno di nested objects.

e.g. AuthorModel.find({ "author.name": valore })

## Method find() with operators

Al metodo find() possiamo anche passare operatori che consentono di effettuare query in appositi "range"

$gt = greater than
$lt = lower than
$gte = greater than or equal to
$lte = lower than or equal to
$regex = operatore al quale passare una regular expression.

e.g. AuthorModel.find({ age: { $gt: 18 } })

## Method find() with sorting and paginations

Al metodo find possiamo passare anche altri metodi (concatenandoli) per far si che il risultato sia in linea con quanto ci serve a frontend.

e.g. const posts = await PostsModel.find()
.sort({ createdAt: 1 }) // o -1
.limit(10)
.skip(10);

## Flusso blog

- Utente si registra tramite AuthorsModel
- Utente effettua il login (verificheremo lato FE che l'utente abbia diritto ad utilizzare le nostre api ricevendo un TOKEN)
- Il token viene salvato nel localStorage
- Il token viene letto e decodificato dal localStorage -> otteniamo i dati dell'utente loggato.
- Utente clicca sul pulsante CREA POST
- Viene aggiunto già l'id del creatore nel campo Author
