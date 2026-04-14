# Klíčové instrukce

## Projekt

Výukový projekt (`ai-agent-lesson`) pro AI školení. Zdrojový kód je čistý HTML/CSS/JS bez build systému či frameworků.

### Architektura

- `src/` — produkční kód: `index.html`, `style.css`, `script.js`
- `.github/instructions/` — detailní instrukce pro HTML, CSS a JS (čti je před editací)
- `docs/`, `tasks/`, `tests/`, `tools/` — prázdné adresáře pro budoucí obsah

Projekt nemá package.json, build pipeline ani testovací framework. Stránky se otevírají přímo v prohlížeči.

## Jazyková nastavení a komunikace

- komunikace probíhá v českém jazyce (cs-cz)
- zdrojový kód je psán výhradně v anglickém jazyce (en-us)
- komentáře v kódu jsou česky

## Kód (HTML, CSS, JS)

- Respektuj formátování definované v `.editorconfig`, pokud existuje
- CSS styly piš výhradně do CSS souborů, nikdy nepoužívej inline CSS v HTML
- Uchovávej všechny CSS styly v jednom souboru `style.css`

Detailní pravidla pro jednotlivé jazyky jsou v `.github/instructions/`.


## Task Management
* úkoly v projektu jsou uložny v /tasks
* pokud dokončíš implementaci úkolu, přesuň ho do /tasks/done
* implementaci napiš stručné poznámky a ulož je jako komplementární soubor do úkolu v /tasks/done, například T-001-prepinatelne-barevne-schema-solution.md