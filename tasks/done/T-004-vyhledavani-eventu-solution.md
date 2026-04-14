# T-004 Solution: Vyhledávání eventů

## Co bylo implementováno

### `src/index.html`
- Přidán `<input type="search">` s BEM třídami `.event-search` / `.event-search__input` a `id="eventSearch"` mezi filtr kategorií a seznam eventů.

### `src/script.js`
- `let searchQuery = ''` — stav vyhledávacího dotazu
- `const eventSearch = document.getElementById("eventSearch")` — DOM reference
- `getFilteredEvents(key)` — helper kombinující filtr kategorií + search (case-insensitive `includes`)
- `selectDay(key)` — funkce pro výběr dne (chyběla v předchozím kódu)
- `renderWeekly` / `renderMonthly` — přepnuty na `getFilteredEvents`; při aktivním dotazu přidávají `calendar__cell--has-match`
- `renderEvents` — nová zpráva "Žádné eventy neodpovídají hledání."
- Event listener na `input` → aktualizuje `searchQuery` a překresluje kalendář i panel

### `src/style.css`
- `.event-search` / `.event-search__input` — styly pro vyhledávací pole (focus ring, placeholder)
- `.calendar__cell--has-match` — outline primární barvou pro dny s nalezenými eventy
