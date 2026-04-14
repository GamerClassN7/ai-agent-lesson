CALL-04: Vyhledávání v eventech
----
Implementuj vyhledávací pole pro filtrování eventů podle názvu v reálném čase.
---
Uživatel může zadat text do vyhledávacího pole a kalendář i panel eventů okamžitě zobrazí pouze eventy, jejichž název obsahuje zadaný text. Při prázdném vyhledávání se zobrazují všechny eventy. Vyhledávání funguje nezávisle na filtru kategorií (oba filtry se kombinují).
---
## Požadavky

* Vyhledávací pole dostupné nad panelem eventů nebo v headeru kalendáře
* Filtrování probíhá v reálném čase při psaní (bez tlačítka Hledat)
* Vyhledávání prohledává název eventu (case-insensitive)
* Výsledky se kombinují s aktivním filtrem kategorií
* Při prázdném vyhledávání se zobrazují všechny eventy
* V měsíčním i týdenním pohledu jsou zvýrazněny dny obsahující nalezené eventy

## Technické Požadavky

* Vyhledávací pole implementovat jako `<input type="search">` v HTML
* Vyhledávání implementovat ve vanilla JS (`src/script.js`) — žádné frameworky
* Stav vyhledávání uchovávat v proměnné `searchQuery` (string)
* Filtrování aplikovat uvnitř existující logiky renderování buněk a event listu
* Dny s nalezenými eventy označit CSS třídou `calendar__cell--has-match`
* BEM konvence pro CSS třídy: `.event-search`, `.event-search__input`
* Žádný inline CSS ani `!important`
* Debounce pro input event není nutný (dataset je malý)

## Akceptační Krytéria

* Zadáním textu se okamžitě aktualizuje seznam eventů v panelu i tečky v kalendáři
* Vyhledávání je case-insensitive (hledání "standup" najde "Standup meeting")
* Kombinace vyhledávání + filtr kategorie funguje správně
* Při smazání textu se obnoví původní zobrazení
* Dny bez nalezených eventů nemají tečky (ale jsou klikatelné)
* Funkčnost ověřena ve Chrome/Firefox bez JS frameworků
