const CATEGORIES = {
  meeting:  { label: 'Schůzka',  color: '#f59e0b', icon: '🤝' },
  work:     { label: 'Práce',    color: '#3b82f6', icon: '💼' },
  training: { label: 'Školení',  color: '#8b5cf6', icon: '🎓' },
  personal: { label: 'Osobní',   color: '#10b981', icon: '👤' },
  golf:     { label: 'Golf',     color: '#84cc16', icon: '⛳' },
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
let currentView = localStorage.getItem('calendarView') || 'weekly';
let currentWeekStart = getMondayOfWeek(new Date());
let searchQuery = '';

const calendarDays = document.getElementById("calendarDays");
const monthTitle = document.getElementById("monthTitle");
const eventList = document.getElementById("eventList");
const categoryFilter = document.getElementById("categoryFilter");
const eventSearch = document.getElementById("eventSearch");
const searchResults = document.getElementById("searchResults");
const todayBtn = document.getElementById("todayBtn");

function pad(n) {
  return String(n).padStart(2, "0");
}

function dateKey(year, month, day) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function getMondayOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDay() === 0 ? -6 : 1 - d.getDay();
  d.setDate(d.getDate() + diff);
  return d;
}

function getFilteredEvents(key) {
  return (events[key] || []).filter(ev =>
    activeCategories.has(ev.category) &&
    (searchQuery === '' || ev.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
}

function selectDay(key) {
  selectedDateKey = key;
  renderCalendar();
  renderEvents(key);
}

function goToToday() {
  const today = new Date();
  currentYear = today.getFullYear();
  currentMonth = today.getMonth();
  currentWeekStart = getMondayOfWeek(today);
  selectedDateKey = dateKey(currentYear, currentMonth, today.getDate());
  renderCalendar();
  renderEvents(selectedDateKey);
}

function renderCategoryFilters() {
  categoryFilter.innerHTML = "";
  const ul = document.createElement("ul");
  ul.className = "category-filter__list";

  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const li = document.createElement("li");
    li.className = "category-filter__item";

    const label = document.createElement("label");
    label.className = "category-filter__label";
    label.htmlFor = `cat-${key}`;
    label.style.setProperty("--cat-color", cat.color);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "category-filter__checkbox";
    checkbox.id = `cat-${key}`;
    checkbox.checked = activeCategories.has(key);
    checkbox.addEventListener("change", () => toggleCategory(key));

    const icon = document.createElement("span");
    icon.className = "category-filter__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = cat.icon;

    const name = document.createElement("span");
    name.className = "category-filter__name";
    name.textContent = cat.label;

    const dot = document.createElement("span");
    dot.className = "category-filter__dot";

    label.appendChild(checkbox);
    label.appendChild(icon);
    label.appendChild(name);
    label.appendChild(dot);
    li.appendChild(label);
    ul.appendChild(li);
  });

  categoryFilter.appendChild(ul);
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
  if (currentView === 'weekly') {
    renderWeekly();
  } else {
    renderMonthly();
  }
}

function renderWeekly() {
  calendarDays.innerHTML = "";
  const days = [];
  const start = getMondayOfWeek(new Date(currentWeekStart));
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    days.push(day);
  }
  monthTitle.textContent = `Týden ${pad(days[0].getDate())}.${pad(days[0].getMonth()+1)} - ${pad(days[6].getDate())}.${pad(days[6].getMonth()+1)} ${days[0].getFullYear()}`;

  days.forEach(day => {
    const key = dateKey(day.getFullYear(), day.getMonth(), day.getDate());
    const cell = document.createElement("div");
    cell.className = "calendar__cell";

    const isToday =
      day.getFullYear() === new Date().getFullYear() &&
      day.getMonth() === new Date().getMonth() &&
      day.getDate() === new Date().getDate();

    if (isToday) cell.classList.add("calendar__cell--today");
    if (key === selectedDateKey) cell.classList.add("calendar__cell--selected");

    const number = document.createElement("span");
    number.className = "calendar__day-number";
    number.textContent = day.getDate();
    cell.appendChild(number);

    const visibleEvents = getFilteredEvents(key);
    if (visibleEvents.length > 0) {
      if (searchQuery !== '') cell.classList.add("calendar__cell--has-match");
      const dots = document.createElement("div");
      dots.className = "calendar__event-dots";
      
      visibleEvents.slice(0, 3).forEach(ev => {
        const tag = document.createElement("div");
        tag.className = "calendar__event-tag";
        tag.textContent = `${ev.time} ${ev.name}`;
        tag.style.setProperty("--tag-bg", CATEGORIES[ev.category].color + '33');
        tag.style.setProperty("--tag-color", CATEGORIES[ev.category].color);
        dots.appendChild(tag);
      });
      if (visibleEvents.length > 3) {
        const more = document.createElement("div");
        more.className = "calendar__event-tag";
        more.style.fontSize = "0.6rem";
        more.textContent = `+${visibleEvents.length - 3} další`;
        dots.appendChild(more);
      }
      cell.appendChild(dots);
    }

    cell.addEventListener("click", () => selectDay(key));
    calendarDays.appendChild(cell);
  });
}

function renderMonthly() {
  calendarDays.innerHTML = "";
  monthTitle.textContent = `${MONTHS_CS[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();

  // Monday-first: shift Sunday (0) to position 6
  const startOffset = (firstDay === 0 ? 6 : firstDay - 1);

  // Previous month days
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  for (let i = startOffset - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const cell = document.createElement("div");
    cell.className = "calendar__cell calendar__cell--empty";
    
    const number = document.createElement("span");
    number.className = "calendar__day-number";
    number.style.opacity = "0.4";
    number.textContent = day;
    cell.appendChild(number);
    
    calendarDays.appendChild(cell);
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

    const visibleEvents = getFilteredEvents(key);
    if (visibleEvents.length > 0) {
      if (searchQuery !== '') cell.classList.add("calendar__cell--has-match");
      const dots = document.createElement("div");
      dots.className = "calendar__event-dots";
      
      visibleEvents.slice(0, 2).forEach(ev => {
        const tag = document.createElement("div");
        tag.className = "calendar__event-tag";
        tag.textContent = ev.name;
        tag.style.setProperty("--tag-bg", CATEGORIES[ev.category].color + '33');
        tag.style.setProperty("--tag-color", CATEGORIES[ev.category].color);
        dots.appendChild(tag);
      });
      if (visibleEvents.length > 2) {
        const more = document.createElement("div");
        more.className = "calendar__event-tag";
        more.style.fontSize = "0.6rem";
        more.textContent = `+${visibleEvents.length - 2} další`;
        dots.appendChild(more);
      }
      cell.appendChild(dots);
    }

    cell.addEventListener("click", () => selectDay(key));
    calendarDays.appendChild(cell);
  }

  const totalCells = startOffset + daysInMonth;
  const endOffset = (7 - (totalCells % 7)) % 7;
  for (let i = 1; i <= endOffset; i++) {
    const cell = document.createElement("div");
    cell.className = "calendar__cell calendar__cell--empty";
    
    const number = document.createElement("span");
    number.className = "calendar__day-number";
    number.style.opacity = "0.4";
    number.textContent = i;
    cell.appendChild(number);

    calendarDays.appendChild(cell);
  }
}

function setView(view) {
  currentView = view;
  localStorage.setItem('calendarView', view);
  document.querySelector('.calendar').dataset.view = view;
  renderCalendar();
  updateViewButtons();
}

function updateViewButtons() {
  document.querySelectorAll('.view-switcher__button').forEach(btn => {
    btn.classList.toggle('view-switcher__button--active', btn.dataset.view === currentView);
  });
}

function renderEvents(key) {
  eventList.innerHTML = "";
  const dayEvents = getFilteredEvents(key);
  
  const titleEl = document.getElementById("selectedDateTitle");
  if (key) {
    const d = new Date(key);
    titleEl.textContent = `Eventy – ${d.getDate()}. ${MONTHS_CS[d.getMonth()]}`;
  } else {
    titleEl.textContent = "Eventy";
  }

  if (dayEvents.length === 0) {
    const li = document.createElement("li");
    li.className = "event-panel__empty";
    const allCategoryEvents = (events[key] || []).filter(ev => activeCategories.has(ev.category));
    if (searchQuery !== '' && allCategoryEvents.length > 0) {
      li.textContent = "Žádné eventy neodpovídají hledání.";
    } else if (events[key] && events[key].some(ev => !activeCategories.has(ev.category))) {
      li.textContent = "Žádné eventy pro vybrané kategorie.";
    } else {
      li.textContent = "Žádné eventy pro tento den.";
    }
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
  if (currentView === 'weekly') {
    currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  } else {
    if (currentMonth === 0) { currentMonth = 11; currentYear--; }
    else currentMonth--;
  }
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  if (currentView === 'weekly') {
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  } else {
    if (currentMonth === 11) { currentMonth = 0; currentYear++; }
    else currentMonth++;
  }
  renderCalendar();
});

// === Přepínač pohledu ===
document.querySelectorAll('.view-switcher__button').forEach(btn => {
  btn.addEventListener('click', () => setView(btn.dataset.view));
});

// === Vyhledávání eventů ===
eventSearch.addEventListener("input", () => {
  searchQuery = eventSearch.value;
  renderCalendar();
  if (selectedDateKey) renderEvents(selectedDateKey);
  renderSearchDropdown();
});

function renderSearchDropdown() {
  if (searchQuery.length < 2) {
    searchResults.hidden = true;
    return;
  }

  const matches = [];
  Object.keys(events).forEach(date => {
    events[date].forEach(ev => {
      if (ev.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        matches.push({ ...ev, date });
      }
    });
  });

  if (matches.length === 0) {
    searchResults.innerHTML = '<div class="event-search__result-item"><span class="event-search__result-meta">Žádné výsledky</span></div>';
  } else {
    searchResults.innerHTML = "";
    matches.sort((a,b) => a.date.localeCompare(b.date)).slice(0, 5).forEach(match => {
      const item = document.createElement("div");
      item.className = "event-search__result-item";
      
      const d = new Date(match.date);
      const dateStr = `${d.getDate()}. ${MONTHS_CS[d.getMonth()]}`;
      
      item.innerHTML = `
        <span class="event-search__result-name">${match.name}</span>
        <span class="event-search__result-meta">${dateStr} • ${match.time} • ${CATEGORIES[match.category]?.label || ''}</span>
      `;
      
      item.addEventListener("click", () => {
        const [y, m, day] = match.date.split("-").map(Number);
        currentYear = y;
        currentMonth = m - 1;
        currentWeekStart = getMondayOfWeek(new Date(y, m - 1, day));
        selectedDateKey = match.date;
        searchQuery = "";
        eventSearch.value = "";
        searchResults.hidden = true;
        renderCalendar();
        renderEvents(match.date);
      });
      searchResults.appendChild(item);
    });
  }
  searchResults.hidden = false;
}

// Close dropdown on outside click
document.addEventListener("click", (e) => {
  if (!eventSearch.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.hidden = true;
  }
});

// Nastav výchozí pohled
document.querySelector('.calendar').dataset.view = currentView;
updateViewButtons();

renderCategoryFilters();
renderCalendar();

if (todayBtn) {
  todayBtn.addEventListener("click", goToToday);
}

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

// === Přepínač dark/light modu ===
const COLOR_THEME_KEY = 'colorTheme';

function toggleColorTheme() {
  const currentTheme = localStorage.getItem(COLOR_THEME_KEY) || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setColorTheme(newTheme);
}

function setColorTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-mode', 'dark');
  } else {
    document.documentElement.removeAttribute('data-mode');
  }
  localStorage.setItem(COLOR_THEME_KEY, theme);
  updateToggleButton(theme);
}

function updateToggleButton(theme) {
  const button = document.querySelector('.theme-toggle__button');
  if (button) {
    button.classList.toggle('theme-toggle__button--active', theme === 'dark');
    button.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Aplikuj uložený mód při načtení
const savedColorTheme = localStorage.getItem(COLOR_THEME_KEY) || 'light';
setColorTheme(savedColorTheme);

// Event listener pro toggle button
document.querySelector('.theme-toggle__button')?.addEventListener('click', toggleColorTheme);
