const CATEGORIES = {
  meeting:  { label: 'Schůzka',  color: '#f59e0b' },
  work:     { label: 'Práce',    color: '#3b82f6' },
  training: { label: 'Školení',  color: '#8b5cf6' },
  personal: { label: 'Osobní',   color: '#10b981' },
};

const events = {
  "2026-04-01": [{ time: "09:00", name: "Standup meeting", category: "meeting" }],
  "2026-04-07": [
    { time: "10:00", name: "Code review", category: "work" },
    { time: "14:00", name: "Sprint plánování", category: "meeting" },
  ],
  "2026-04-14": [
    { time: "11:00", name: "AI Školení – lekce 1", category: "training" },
    { time: "16:00", name: "Demo prezentace", category: "work" },
  ],
  "2026-04-16": [{ time: "09:30", name: "1:1 s manažerem", category: "meeting" }],
  "2026-04-21": [{ time: "13:00", name: "Workshop: GitHub Copilot", category: "training" }],
  "2026-04-25": [
    { time: "10:00", name: "Retrospektiva", category: "meeting" },
    { time: "15:00", name: "Release planning", category: "work" },
  ],
  "2026-05-05": [{ time: "09:00", name: "Kickoff nového projektu", category: "work" }],
  "2026-05-12": [{ time: "14:00", name: "Design review", category: "work" }],
  "2026-05-20": [{ time: "11:00", name: "AI Školení – lekce 2", category: "training" }],
};

const MONTHS_CS = ["Leden","Únor","Březen","Duben","Květen","Červen",
                   "Červenec","Srpen","Září","Říjen","Listopad","Prosinec"];

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let selectedDateKey = null;
let activeCategories = new Set(Object.keys(CATEGORIES));

const calendarDays = document.getElementById("calendarDays");
const monthTitle = document.getElementById("monthTitle");
const eventList = document.getElementById("eventList");
const categoryFilter = document.getElementById("categoryFilter");

function pad(n) {
  return String(n).padStart(2, "0");
}

function dateKey(year, month, day) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function renderCategoryFilters() {
  categoryFilter.innerHTML = "";
  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const btn = document.createElement("button");
    const isActive = activeCategories.has(key);
    btn.className = "category-filter__btn" + (isActive ? " category-filter__btn--active" : "");
    btn.setAttribute("aria-pressed", isActive);
    btn.style.setProperty("--cat-color", cat.color);

    const dot = document.createElement("span");
    dot.className = "category-filter__dot";
    btn.appendChild(dot);
    btn.appendChild(document.createTextNode(cat.label));
    btn.addEventListener("click", () => toggleCategory(key));
    categoryFilter.appendChild(btn);
  });
}

function toggleCategory(key) {
  if (activeCategories.has(key)) {
    activeCategories.delete(key);
  } else {
    activeCategories.add(key);
  }
  renderCategoryFilters();
  renderCalendar();
  if (selectedDateKey) renderEvents(selectedDateKey);
}

function renderCalendar() {
  calendarDays.innerHTML = "";
  monthTitle.textContent = `${MONTHS_CS[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();

  // Monday-first: shift Sunday (0) to position 6
  const startOffset = (firstDay === 0 ? 6 : firstDay - 1);

  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar__cell calendar__cell--empty";
    calendarDays.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const key = dateKey(currentYear, currentMonth, day);
    const cell = document.createElement("div");
    cell.className = "calendar__cell";

    const isToday =
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth &&
      today.getDate() === day;

    if (isToday) cell.classList.add("calendar__cell--today");
    if (key === selectedDateKey) cell.classList.add("calendar__cell--selected");

    const number = document.createElement("span");
    number.className = "calendar__day-number";
    number.textContent = day;
    cell.appendChild(number);

    const visibleEvents = (events[key] || []).filter(ev => activeCategories.has(ev.category));
    if (visibleEvents.length > 0) {
      const dots = document.createElement("div");
      dots.className = "calendar__event-dots";
      visibleEvents.forEach(ev => {
        const dot = document.createElement("span");
        dot.className = "calendar__event-dot";
        dot.style.setProperty("--dot-color", CATEGORIES[ev.category].color);
        dots.appendChild(dot);
      });
      cell.appendChild(dots);
    }

    cell.addEventListener("click", () => selectDay(key));
    calendarDays.appendChild(cell);
  }

  const totalCells = startOffset + daysInMonth;
  const endOffset = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < endOffset; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar__cell calendar__cell--empty";
    calendarDays.appendChild(empty);
  }
}

function selectDay(key) {
  selectedDateKey = key;
  renderCalendar();
  renderEvents(key);
}

function renderEvents(key) {
  eventList.innerHTML = "";
  const dayEvents = (events[key] || []).filter(ev => activeCategories.has(ev.category));

  if (dayEvents.length === 0) {
    const li = document.createElement("li");
    li.className = "event-panel__empty";
    const hasHiddenEvents = events[key] && events[key].some(ev => !activeCategories.has(ev.category));
    li.textContent = hasHiddenEvents
      ? "Žádné eventy pro vybrané kategorie."
      : "Žádné eventy pro tento den.";
    eventList.appendChild(li);
    return;
  }

  dayEvents.forEach(ev => {
    const li = document.createElement("li");
    li.className = "event-panel__item";
    li.style.setProperty("--item-color", CATEGORIES[ev.category].color);

    const time = document.createElement("span");
    time.className = "event-panel__item-time";
    time.textContent = ev.time;

    const name = document.createElement("strong");
    name.className = "event-panel__item-name";
    name.textContent = ev.name;

    const badge = document.createElement("span");
    badge.className = "event-panel__item-badge";
    badge.textContent = CATEGORIES[ev.category].label;
    badge.style.setProperty("--badge-color", CATEGORIES[ev.category].color);

    li.appendChild(time);
    li.appendChild(name);
    li.appendChild(badge);
    eventList.appendChild(li);
  });
}

document.getElementById("prevMonth").addEventListener("click", () => {
  if (currentMonth === 0) { currentMonth = 11; currentYear--; }
  else currentMonth--;
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  if (currentMonth === 11) { currentMonth = 0; currentYear++; }
  else currentMonth++;
  renderCalendar();
});

renderCategoryFilters();
renderCalendar();

// === Přepínač schémat ===
const THEME_KEY = 'calendar-theme';

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  document.querySelectorAll('.theme-switcher__btn').forEach(btn => {
    btn.classList.toggle('theme-switcher__btn--active', btn.dataset.theme === String(theme));
  });
}

document.querySelectorAll('.theme-switcher__btn').forEach(btn => {
  btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});

setTheme(localStorage.getItem(THEME_KEY) || '1');
