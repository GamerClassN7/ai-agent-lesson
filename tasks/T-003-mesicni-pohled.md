CALL-03: Přepnutí do měsíčního pohledu
----
Implementuj přepínač mezi týdenním a měsíčním pohledem kalendáře.
---
Uživatel může přepínat mezi týdenním a měsíčním pohledem. Měsíční pohled zobrazí mřížku celého aktuálního měsíce (7 sloupců × ~5 řádků). Aktivní pohled se ukládá do `localStorage` a aplikuje se při načtení stránky.
---
## Požadavky

* Přepínač týdenní/měsíční pohled dostupný na stránce
* Měsíční pohled zobrazí celý aktuální měsíc v mřížce
* Výběr pohledu persistuje mezi návštěvami (localStorage)
* Výchozí pohled je týdenní

## Technické Požadavky

* Přepínač implementovat jako `<button>` elementy ve vanilla JS (`src/script.js`) — žádné frameworky
* Měsíční pohled: mřížka 7 sloupců (Po–Ne) × potřebný počet řádků pro celý měsíc
* Přepnutí pohledu přidává/mění atribut `data-view="monthly"` / `data-view="weekly"` na hlavním kontejneru kalendáře
* Aktivní pohled persistovat přes `localStorage` (klíč `calendarView`, hodnoty `weekly` / `monthly`)
* Při načtení stránky přečíst `localStorage` a zobrazit uložený pohled; výchozí je `weekly`
* BEM konvence pro CSS třídy: `.view-switcher`, `.view-switcher__button`, `.view-switcher__button--active`
* Rozložení měsíčního pohledu pomocí CSS Grid
* Žádný inline CSS ani `!important`

## Akceptační Krytéria

* Stránka se načte s výchozím týdenním pohledem nebo dříve uloženým pohledem z `localStorage`
* Kliknutím na přepínač se okamžitě přepne pohled (bez reload)
* Měsíční pohled zobrazí správně všechny dny aktuálního měsíce v mřížce
* Po reload stránky zůstane aktivní naposledy vybraný pohled
* Přepínač vizuálně indikuje aktivní pohled (třída `--active`)
* Funkčnost ověřena ve Chrome/Firefox bez JS frameworků
