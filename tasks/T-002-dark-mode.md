CALL-02: Dark mode
----
Implementuj přepínač dark/light modu na stránce.
---
Uživatel může přepínat mezi světlým a tmavým modem. Aktivní mód se ukládá do `localStorage` a aplikuje se při načtení stránky. Dark mode využívá barevné schéma Schéma 2 – Energie a kreativita z `T-001`.
---
## Požadavky

* Přepínač dark/light modu dostupný na stránce (v headeru)
* Výběr modu persistuje mezi návštěvami (localStorage)
* Výchozí mód je light

## Technické Požadavky

* CSS proměnné definovat v `:root` a přepsat v `[data-theme="dark"]` dle konvence v `style.css`
* Dark mode proměnné: `--color-background: #1C1917`, `--color-surface: #292524`, `--color-text: #F5F5F4`, `--color-text-muted: #A8A29E`, `--color-primary: #7C3AED`, `--color-secondary: #F97316`, `--color-accent: #FBBF24`
* Přepnutí modu přidává/mění atribut `data-theme="dark"` na elementu `<html>`; výchozí stav je bez atributu (light)
* Aktivní mód persistovat přes `localStorage` (klíč `colorTheme`, hodnoty `light` / `dark`)
* Při načtení stránky přečíst `localStorage` a aplikovat uložený mód; výchozí je `light`
* Přepínač implementovat jako `<button>` element ve vanilla JS (`src/script.js`) — žádné frameworky
* Přepínač umístit do `<header>` jako součást navigace
* BEM konvence pro CSS třídy: `.theme-toggle`, `.theme-toggle__button`, `.theme-toggle__button--active`
* Žádný inline CSS ani `!important`

## Akceptační Krytéria

* Stránka se načte s výchozím light modem nebo dříve uloženým modem z `localStorage`
* Kliknutím na přepínač se okamžitě změní všechny barvy na stránce (bez reload)
* Po reload stránky zůstane aktivní naposledy vybraný mód
* Přepínač vizuálně indikuje aktivní mód
* Funkčnost ověřena ve Chrome/Firefox bez JS frameworků
