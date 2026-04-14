CALL-01: Přepínatelné barevné schéma
----
Implementuj přepínač barevných schémat na stránce.
---
Uživatel může přepínat mezi 3 schématy definovanými ve výzkumu `docs/research/barvy-na-webu.md`: **Důvěra a klid** (světlé/modré), **Energie a kreativita** (tmavé/fialové), **Příroda a růst** (světlé/zelené). Aktivní schéma se ukládá do `localStorage` a aplikuje se při načtení stránky.
---
## Požadavky

* Přepínač 3 barevných schémat dostupný na stránce
* Výběr schématu persistuje mezi návštěvami (localStorage)
* Výchozí schéma je Schéma 1 – Důvěra a klid

## Technické Požadavky

* CSS proměnné definovat v `:root` dle konvence v `style.css` (sekce `/* Proměnné */`)
* Každé schéma přepisuje sadu proměnných: `--color-primary`, `--color-primary-light`, `--color-secondary`, `--color-secondary-light`, `--color-accent`, `--color-background`, `--color-surface`, `--color-text`, `--color-text-muted`
* Schéma 1 – Důvěra a klid (výchozí):
  * `--color-primary: #2563EB`, `--color-secondary: #10B981`, `--color-accent: #F59E0B`
  * `--color-background: #F8FAFC`, `--color-text: #1E293B`
* Schéma 2 – Energie a kreativita (tmavý mód):
  * `--color-primary: #7C3AED`, `--color-secondary: #F97316`, `--color-accent: #FBBF24`
  * `--color-background: #1C1917`, `--color-text: #F5F5F4`
* Schéma 3 – Příroda a růst:
  * `--color-primary: #16A34A`, `--color-secondary: #0EA5E9`, `--color-accent: #FB923C`
  * `--color-background: #F0FDF4`, `--color-text: #14532D`
* Přepínač implementovat jako `<button>` elementy ve vanilla JS (`src/script.js`) — žádné frameworky
* Aktivní schéma persistovat přes `localStorage` (klíč `colorScheme`, hodnoty `schema-1` / `schema-2` / `schema-3`)
* Při načtení stránky přečíst `localStorage` a aplikovat uložené schéma; výchozí je `schema-1`
* Přepnutí schématu přidává/mění atribut `data-scheme="schema-X"` na elementu `<html>`
* CSS selektory pro schémata: `[data-scheme="schema-2"] { --color-primary: ...; }` atd.
* Přepínač umístit do `<header>` jako součást navigace
* Dodržet BEM konvenci pro CSS třídy: `.theme-switcher`, `.theme-switcher__button`, `.theme-switcher__button--active`
* Splnit kontrastní poměr WCAG 2.1 AA (min. 4,5:1) – všechna 3 schémata jsou navržena s tímto ohledem

## Akceptační Kritéria

* Stránka se načte s výchozím schématem (Schéma 1) nebo dříve uloženým schématem z `localStorage`
* Kliknutím na přepínač se okamžitě změní všechny barvy na stránce (bez reload)
* Po reload stránky zůstane aktivní naposledy vybrané schéma
* Přepínač vizuálně indikuje aktivní schéma (třída `--active`)
* Žádný inline CSS ani `!important` v implementaci
* Funkčnost ověřena ve Chrome/Firefox bez JS frameworků
