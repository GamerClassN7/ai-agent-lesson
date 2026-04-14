---
name: colors
description: 'Barevná schémata pro webové projekty. Použij při výběru barev, vytváření nového CSS tématu nebo ladění existujících barevných proměnných. Obsahuje 3 schémata z UX výzkumu: 1) Důvěra a klid (modrá – finance, SaaS), 2) Energie a kreativita (fialová – startupy, tmavý mód), 3) Příroda a růst (zelená – wellness, ekologie).'
argument-hint: 'Název nebo číslo schématu (1, 2, 3), nebo "všechna"'
---

# Barevná schémata pro webové projekty

Tato schémata jsou navržena na základě UX výzkumu psychologie barev (Nielsen Norman Group, Smashing Magazine) s ohledem na přístupnost WCAG 2.1 AA (kontrast min. 4,5:1).

## Dostupná schémata

| # | Název | Nálada | Vhodné pro | Dominantní barva |
|---|-------|--------|------------|-----------------|
| **1** | Důvěra a klid | Profesionální, klidný | Finance, zdravotnictví, SaaS, B2B | 🔵 Modrá |
| **2** | Energie a kreativita | Dynamický, moderní | Kreativa, startupy, tmavý mód | 🟣 Fialová |
| **3** | Příroda a růst | Organický, svěží | Ekologie, wellness, vzdělávání | 🟢 Zelená |

---

## Schéma 1: Důvěra a klid

> Harmonie: Split-komplementární (modrá + zelená + jantar)

| Role | HEX | Použití |
|------|-----|---------|
| `--primary` | `#2563EB` | Navigace, tlačítka, hlavní interaktivní prvky |
| `--primary-dark` | `#1D4ED8` | Hover stavy, aktivní stavy |
| `--primary-light` | `#DBEAFE` | Pozadí focus, jemné zvýraznění |
| `--secondary` | `#10B981` | Ikony stavu, progress bary, úspěch |
| `--accent` | `#F59E0B` | CTA tlačítka, odznaky, zvýraznění |
| `--bg` | `#F8FAFC` | Pozadí stránky |
| `--surface` | `#FFFFFF` | Karty, modaly |
| `--text` | `#1E293B` | Tělo textu, nadpisy |
| `--text-muted` | `#64748B` | Popisky, meta informace |
| `--border` | `#E2E8F0` | Ohraničení prvků |

```css
:root {
  --primary: #2563EB;
  --primary-dark: #1D4ED8;
  --primary-light: #DBEAFE;
  --secondary: #10B981;
  --accent: #F59E0B;
  --bg: #F8FAFC;
  --bg-subtle: #F1F5F9;
  --surface: #FFFFFF;
  --text: #1E293B;
  --text-muted: #64748B;
  --border: #E2E8F0;
}
```

---

## Schéma 2: Energie a kreativita

> Harmonie: Triádová (fialová + oranžová + zlatá) na tmavém základě

| Role | HEX | Použití |
|------|-----|---------|
| `--primary` | `#7C3AED` | Brand elementy, hover stavy, aktivní stavy |
| `--primary-dark` | `#6D28D9` | Hover stavy |
| `--primary-light` | `#EDE9FE` | Jemné pozadí při focus |
| `--secondary` | `#F97316` | CTA tlačítka, důležitá zvýraznění |
| `--accent` | `#FBBF24` | Detaily, ikonky, dekorativní prvky |
| `--bg` | `#1C1917` | Tmavé pozadí (dark mode) |
| `--surface` | `#292524` | Karty, modaly, dropdown menu |
| `--text` | `#F5F5F4` | Tělo textu na tmavém pozadí |
| `--text-muted` | `#A8A29E` | Popisky, meta informace |
| `--border` | `#44403C` | Ohraničení prvků |

```css
[data-theme="2"] {
  --primary: #7C3AED;
  --primary-dark: #6D28D9;
  --primary-light: #EDE9FE;
  --secondary: #F97316;
  --accent: #FBBF24;
  --bg: #1C1917;
  --bg-subtle: #15120F;
  --surface: #292524;
  --text: #F5F5F4;
  --text-muted: #A8A29E;
  --border: #44403C;
}
```

---

## Schéma 3: Příroda a růst

> Harmonie: Analogická (zelená + modrá) s teplým akcentem (oranžová)

| Role | HEX | Použití |
|------|-----|---------|
| `--primary` | `#16A34A` | Hlavní navigace, primární tlačítka, brand identita |
| `--primary-dark` | `#15803D` | Hover stavy |
| `--primary-light` | `#DCFCE7` | Pozadí focus, jemné zvýraznění |
| `--secondary` | `#0EA5E9` | Doplňkové prvky, informační prvky, odkazy |
| `--accent` | `#FB923C` | CTA tlačítka, notifikace, zvýraznění akcí |
| `--bg` | `#F0FDF4` | Světlé pozadí s přírodním nádechem |
| `--surface` | `#FFFFFF` | Karty, modaly |
| `--text` | `#14532D` | Tělo textu navazující na green brand |
| `--text-muted` | `#4B7A5F` | Popisky, meta informace |
| `--border` | `#BBF7D0` | Ohraničení prvků |

```css
[data-theme="3"] {
  --primary: #16A34A;
  --primary-dark: #15803D;
  --primary-light: #DCFCE7;
  --secondary: #0EA5E9;
  --accent: #FB923C;
  --bg: #F0FDF4;
  --bg-subtle: #DCFCE7;
  --surface: #FFFFFF;
  --text: #14532D;
  --text-muted: #4B7A5F;
  --border: #BBF7D0;
}
```

---

## Pravidla pro použití barev

| Pravidlo | Popis |
|----------|-------|
| **60-30-10** | 60 % dominantní barva, 30 % sekundární, 10 % akcent |
| **Max. 3 barvy** | Méně barev = jasná vizuální hierarchie |
| **Kontrast WCAG AA** | Min. poměr kontrastu 4,5:1 pro text |
| **Konzistence** | Stejná barva vždy signalizuje stejnou funkci |

## Postup aplikace schématu

1. Zjisti kontext projektu (typ webu, cíloví uživatelé, nálada)
2. Nabídni uživateli výběr ze 3 schémat s krátkým popisem
3. Po výběru vygeneruj kompletní CSS proměnné dle tabulky výše
4. Integruj do stávajícího `style.css` jako `[data-theme="N"]` nebo `:root`
5. Ověř přístupnost – kontrast textu na pozadí min. 4,5:1

## Zdroje

- Podrobný výzkum: [docs/research/barvy-na-webu.md](../../../docs/research/barvy-na-webu.md)
- Ověření kontrastu: https://webaim.org/resources/contrastchecker/
