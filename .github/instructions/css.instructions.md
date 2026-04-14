# CSS Instrukce

## Základní požadavky

### Organizace a struktura
- Soubor `style.css` musí být vždy propojen v HTML `<head` na začátku příkazem: `<link rel="stylesheet" href="style.css">`
- Organizuj CSS v logických sekcích s komentáři (Proměnné, Reset, Typografie, Komponenty, Layout)
- Vždy uvádej resetovací CSS (`margin: 0`, `padding: 0`, `box-sizing: border-box`)
- Na začátku definuj CSS proměnné (vlastnosti s `--`)

### Selektory a specifičnost
- Pokud možno používej třídy (`.classname`), ne ID selektory (`#id`)
- Vyhni se vloženým selektorům (`.parent > .child > .sibling`)
- Maximální specifičnost pro běžné prvky: 2 třídy
- Psycí názvy tříd podle BEM metodiky: `.block__element--modifier`

### Vlastnosti a hodnoty
- Používej `rem` a `em` pro převeditelné jednotky, ne absolutní `px`
- Barvy definuj jako CSS proměnné nebo hex kódy
- Používej `flexbox` a `grid` pro layout, ne floaty
- Vždy definuj `box-sizing: border-box` na všechny elementy

### Formáty a konvence
- Indentuj kód (2 nebo 4 mezery)
- Používej lowercase pro selektory a vlastnosti
- Jeden selector na řádek pro čitelnost u mnoha selektorů
- Jeden vlastnost-hodnota pár na řádek
- Dvě prázdné řádky mezi sekcemi

## Příklady dobré praxe

```css
/* Proměnné */
:root {
  --primary-color: #3498db;
  --text-color: #333;
  --border-radius: 4px;
  --spacing: 1rem;
}

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Typografie */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-color);
}

/* Komponenty */
.button {
  padding: var(--spacing);
  background-color: var(--primary-color);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: darker(var(--primary-color));
}

.button--secondary {
  background-color: #ecf0f1;
  color: var(--text-color);
}

/* Layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing);
}

/* Responsivní design */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

## Mobile First přístup
- Začínej se styly pro mobilní zařízení
- Přidávej `@media` dotazy pro větší breakpoints
- Standardní breakpoints: 480px, 768px, 1024px, 1440px

## Co se zakazuje
- ❌ Vložené CSS v HTML (`<style>` tag)
- ❌ Inline CSS (`style` atribut)
- ❌ Starované jednotky (`pt`, `cm`)
- ❌ `!important` (pokud není absolutně nutné)
- ❌ CSS v JavaScriptu (vyjma specifických případů)
- ❌ Magic čísla bez komentářů

## Nástroje a validace
- Ověřuj CSS kód pomocí W3C validátoru
- Používej DevTools pro debugování stylů
- Testuj na více zařízeních a prohlížečích
