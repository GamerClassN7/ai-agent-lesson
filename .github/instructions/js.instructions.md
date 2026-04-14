# JavaScript Instrukce

## Základní požadavky

### Přístup a frameworky
- Výhradně vanilla JS — žádné frameworky (React, Vue, Angular apod.)
- Žádné externí knihovny bez explicitního schválení
- ID atributy v HTML slouží výhradně jako JS hooky (např. `id="calendarDays"`) — nestylizuj přes ID

### Struktura a organizace
- Veškerý JS kód patří do souboru `script.js` (nebo pojmenovaných modulů)
- Nespouštěj logiku před načtením DOM — používej `DOMContentLoaded` nebo umísti `<script>` před `</body>`
- Skupinuj příbuzné funkce a odděluj sekce komentáři

### Proměnné a pojmenování
- Vždy deklaruj proměnné pomocí `const` nebo `let`, nikdy `var`
- `const` pro hodnoty, které se nemění; `let` pouze tam, kde je přiřazení nutné
- camelCase pro proměnné a funkce: `getUserName`, `totalPrice`
- PascalCase pro třídy/konstruktory: `UserProfile`
- UPPER_SNAKE_CASE pro konstanty: `MAX_ITEMS`

### Funkce
- Preferuj kratší, jednoznačné funkce (single responsibility)
- Pojmenuj funkce slovesem: `fetchData`, `renderList`, `handleClick`
- Arrow funkce pro callbacky; pojmenované funkce pro hlavní logiku

### DOM manipulace
- Vždy ověř existenci elementu před manipulací
- Preferuj `querySelector` / `querySelectorAll` před `getElementById` / `getElementsByClassName`
- Při hromadných změnách DOM používej `DocumentFragment` nebo sestav HTML string a nastav `innerHTML` najednou

### Události
- Přidávej event listenery přes `addEventListener`, nikdy inline `onclick` v HTML
- Odstraňuj event listenery tam, kde hrozí memory leak (dynamicky přidávané elementy)

### Chybové stavy
- Obaluj asynchronní operace do `try/catch`
- Loguj chyby do konzole: `console.error()`
- Nikdy nevypusť prázdný `catch` blok bez komentáře

## Příklady dobré praxe

```js
// Inicializace po načtení DOM
document.addEventListener('DOMContentLoaded', () => {
  initCalendar();
});

// Pojmenovaná funkce s jasným účelem
function renderItems(items) {
  const list = document.querySelector('#item-list');
  if (!list) return;

  const fragment = document.createDocumentFragment();
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    fragment.appendChild(li);
  });

  list.appendChild(fragment);
}

// Event listener — ne inline onclick
const btn = document.querySelector('#submit-btn');
btn?.addEventListener('click', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const value = document.querySelector('#input-field')?.value.trim();
  if (!value) return;
  processInput(value);
}
```

## Co se zakazuje
- ❌ `var` — používej `const` / `let`
- ❌ Inline event handlery v HTML (`onclick="..."`)
- ❌ JS frameworky a knihovny bez schválení
- ❌ Přímá manipulace stylů přes JS (`element.style.color = ...`) — místo toho přidávej/odebírej CSS třídy
- ❌ Globální proměnné bez nutnosti
- ❌ Prázdné `catch` bloky
