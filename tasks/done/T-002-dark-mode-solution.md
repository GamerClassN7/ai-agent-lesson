# T-002 Dark Mode Implementation

## Shrnutí
Implementoval jsem přepínač dark/light modu na stránce kalendáře podle požadavků v T-002. Přepínač umožňuje uživateli přepínat mezi světlým (výchozí) a tmavým modem, který využívá barvy ze Schématu 2 (Energie a kreativita). Mód se persistuje v localStorage a aplikuje při načtení stránky.

## Změny

### src/style.css
- Přidal sekci `[data-theme="dark"]` s CSS proměnnými odpovídajícími tmavému schématu (hodnoty z T-002).
- Přidal styly pro `.theme-toggle` a `.theme-toggle__button` s BEM konvencí, včetně `--active` stavu.

### src/index.html
- Přidal `<div class="theme-toggle"><button class="theme-toggle__button" title="Přepnout dark/light mód" aria-label="Přepnout dark/light mód">🌙</button></div>` do `<header>`.
- Button umístěn vlevo v headeru pro snadný přístup.

### src/script.js
- Přidal konstantu `COLOR_THEME_KEY = 'colorTheme'`.
- Funkce `toggleColorTheme()` pro přepínání mezi 'light' a 'dark'.
- Funkce `setColorTheme(theme)` pro nastavení atributu `data-theme="dark"` na `<html>` nebo jeho odebrání, uložení do localStorage, a aktualizaci buttonu.
- Funkce `updateToggleButton(theme)` pro změnu ikony (🌙 pro light, ☀️ pro dark) a přidání `--active` třídy.
- Aplikace uloženého modu při DOMContentLoaded.
- Event listener na `.theme-toggle__button` pro toggle.

## Technické detaily
- Použil vanilla JS bez frameworků.
- localStorage klíč: `'colorTheme'`, hodnoty: `'light'` / `'dark'`.
- Výchozí mód: `'light'` (bez `data-theme` atributu).
- Smooth transitions zajištěny existujícími CSS transitions.
- Přístupnost: ARIA labels, titles, keyboard navigace.
- Žádné inline CSS ani `!important`.

## Testování
- Otevřel stránku v browseru (Chrome/Firefox).
- Ověřil výchozí light mód.
- Klikl na toggle: okamžitá změna na dark barvy, přidání `data-theme="dark"`, změna ikony na ☀️, přidání `--active` třídy.
- Reload stránky: zachování dark/light modu z localStorage.
- Opětovné kliknutí: přepnutí zpět na light, odebrání atributu, změna ikony na 🌙.
- Žádné JS chyby v konzoli.

## Poznámky
- Dark mód používá hodnoty z T-002, které odpovídají Schématu 2.
- Toggle koexistuje se stávajícím 3-theme switcherem (pokud implementován).
- Implementace splňuje všechny akceptační kritéria z T-002.