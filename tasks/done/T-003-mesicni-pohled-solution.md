# T-003-měsíční-pohled - Řešení

## Implementace

Přidal jsem přepínač pohledu mezi týdenním a měsíčním pohledem kalendáře.

### Změny v HTML
- Přidal jsem `<div class="view-switcher">` s tlačítky pro "Týden" a "Měsíc" do `.calendar__nav`.

### Změny v CSS
- Přidal jsem styly pro `.view-switcher`, `.view-switcher__button`, `.view-switcher__button--active`.
- Opravil jsem styly pro `.calendar__cell--empty` na `background-color: var(--bg);` pro lepší vizuální integraci.

### Změny v JS
- Přidal jsem proměnné `currentView` a `currentWeekStart`.
- Rozdělil jsem `renderCalendar` na `renderWeekly` a `renderMonthly`.
- `renderWeekly` zobrazuje 7 dnů týdne obsahujícího dnešní den.
- `renderMonthly` zobrazuje celý měsíc jako dříve.
- Přidal jsem funkci `setView` pro přepínání pohledu s persistencí v localStorage.
- Upravil jsem navigaci pro prev/next tak, aby fungovala pro týdny i měsíce.
- Přidal jsem event listeners pro přepínač pohledu.

## Funkčnost
- Výchozí pohled je týdenní.
- Přepínání mezi pohledy se ukládá do localStorage.
- Týdenní pohled zobrazuje aktuální týden (Po-Ne).
- Měsíční pohled zobrazuje celý měsíc v mřížce.
- Navigace funguje pro oba pohledy.