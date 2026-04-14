# HTML Instrukce

## Standardy pro HTML

### Klíčové pravidla
- **Vždy preferuj `<strong>` místo `<b>`** - `<strong>` je sámantické, `<b>` je pouze stylizace
- **Preferuj třídy (`.class`) místo ID identifikátorů** - ID používej pouze pro JavaScript funkčnost
- Jeden element = jedna třída (pokud není výjimka)

## Základní požadavky

### Struktura dokumentu
- Každý HTML soubor musí mít správnou osnovní strukturu s `<!DOCTYPE html>`
- Vždy definuj `<html>`, `<head>` a `<body>` elementy
- V `<head>` část vždy zahrň:
  - `<meta charset="UTF-8">` - pro správnou kódování
  - `<meta name="viewport" content="width=device-width, initial-scale=1">` - pro responzivitu
  - Relevantní `<title>` pro stránku

### Sémantika
- Používej sémantické HTML5 prvky: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Nepoužívej `<div>` pro vše - volby správné elementy na základě content
- Používej `<button>` pro interaktivní prvky, ne `<div>` nebo `<span>`
- Strukturuj obsah pomocí `<h1>` až `<h6>` v logickém pořadí
- Používej `<strong>` pro důležitý obsah, `<em>` pro zdůraznění (ne `<b>` a `<i>`)

### Dostupnost (A11y)
- Všechny obrázky (`<img>`) musí mít popis v atributu `alt`
- Používej `<label>` pro vstupní pole a propojuj je pomocí `for` atributu
- Zajisti kontrast textů a barev (WCAG)
- Používej ARIA atributy kde je to potřebné

### Formáty a konvence
- Indentuj kód konzistentně (2 nebo 4 mezery)
- Uzavírej všechny tagy
- Používej lowercase pro názvy tagů a atributů
- Používej dvojité uvozovky kolem atributů
- Jeden element na řádek (nebo seskupené inline prvky)

## Příklady dobré praxe

```html
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Stránka - AI Školení</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="header">
    <nav class="navigation">
      <ul class="nav-list">
        <li class="nav-item"><a href="/" class="nav-link">Domů</a></li>
        <li class="nav-item"><a href="/kurzy" class="nav-link">Kurzy</a></li>
      </ul>
    </nav>
  </header>

  <main class="main-content">
    <section class="section">
      <h1>Nadpis stránky</h1>
      <p>Obsah s <strong>důležitým textem</strong> a <em>zdůrazněným textem</em>.</p>
      <img src="image.jpg" alt="Popis obrázku" class="section-image">
    </section>
  </main>

  <footer class="footer" id="footer-main">
    <p>&copy; 2026 AI Školení. Všechna práva vyhrazena.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

## Co se zakazuje
- ❌ Používání `<b>` a `<i>` pro stylizaci - používej `<strong>` a `<em>` místo toho
- ❌ Inline CSS v HTML (`style` atribut)
- ❌ Zastaralé tagy: `<font>`, `<center>`, `<marquee>`
- ❌ Divů místo sémantických tagů
- ❌ Chybějící alt texty u obrázků
- ❌ ID atributy pro CSS styling - používej třídy (`.classname`)
- ❌ ID atributy na více elementech - ID musí být unikátní a používány jen pro JS
