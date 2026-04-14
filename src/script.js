const events = {
  "2026-04-01": [{ time: "09:00", name: "Standup meeting" }],
  "2026-04-07": [{ time: "10:00", name: "Code review" }, { time: "14:00", name: "Sprint plánování" }],
  "2026-04-14": [{ time: "11:00", name: "AI Školení – lekce 1" }, { time: "16:00", name: "Demo prezentace" }],
  "2026-04-16": [{ time: "09:30", name: "1:1 s manažerem" }],
  "2026-04-21": [{ time: "13:00", name: "Workshop: GitHub Copilot" }],
  "2026-04-25": [{ time: "10:00", name: "Retrospektiva" }, { time: "15:00", name: "Release planning" }],
  "2026-05-05": [{ time: "09:00", name: "Kickoff nového projektu" }],
  "2026-05-12": [{ time: "14:00", name: "Design review" }],
  "2026-05-20": [{ time: "11:00", name: "AI Školení – lekce 2" }],
};

const MONTHS_CS = ["Leden","Únor","Březen","Duben","Květen","Červen",
                   "Červenec","Srpen","Září","Říjen","Listopad","Prosinec"];

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let selectedDateKey = null;

const calendarDays = document.getElementById("calendarDays");
const monthTitle = document.getElementById("monthTitle");
const eventList = document.getElementById("eventList");

function pad(n) {
  return String(n).padStart(2, "0");
}

function dateKey(year, month, day) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
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

    if (events[key]) {
      const dots = document.createElement("div");
      dots.className = "calendar__event-dots";
      events[key].forEach(() => {
        const dot = document.createElement("span");
        dot.className = "calendar__event-dot";
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
  const dayEvents = events[key];

  if (!dayEvents || dayEvents.length === 0) {
    const li = document.createElement("li");
    li.className = "event-panel__empty";
    li.textContent = "Žádné eventy pro tento den.";
    eventList.appendChild(li);
    return;
  }

  dayEvents.forEach(ev => {
    const li = document.createElement("li");
    li.className = "event-panel__item";

    const time = document.createElement("span");
    time.className = "event-panel__item-time";
    time.textContent = ev.time;

    const name = document.createElement("strong");
    name.className = "event-panel__item-name";
    name.textContent = ev.name;

    li.appendChild(time);
    li.appendChild(name);
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

renderCalendar();
