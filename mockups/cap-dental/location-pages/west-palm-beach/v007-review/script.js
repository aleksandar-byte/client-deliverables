const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.dataset.open=String(!open);});}

function calculateOfficeHours(config, now = new Date()) {
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const unavailable = () => ({ currentDay: 'Today', currentHours: 'Not confirmed', state: 'unavailable', status: 'Call office to confirm current hours' });
  let parts;
  try {
    parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: config.timeZone,
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(now).filter(part => part.type !== 'literal').map(part => [part.type, part.value]));
  } catch {
    return unavailable();
  }

  const calendar = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)));
  const minute = Number(parts.hour) * 60 + Number(parts.minute);
  const clock = value => `${Math.floor(value / 60) % 12 || 12}:${String(value % 60).padStart(2, '0')} ${value >= 720 ? 'PM' : 'AM'}`;
  const parse = raw => {
    if (typeof raw !== 'string' || !raw.trim()) return null;
    if (/^closed$/i.test(raw.trim())) return [];
    const ranges = [];
    for (const chunk of raw.split(/[,;]/).map(value => value.trim())) {
      const match = chunk.match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/);
      if (!match) return null;
      const start = Number(match[1]) * 60 + Number(match[2]);
      const end = Number(match[3]) * 60 + Number(match[4]);
      if (Number(match[1]) > 23 || Number(match[2]) > 59 || Number(match[3]) > 24 || Number(match[4]) > 59 || start >= end || end > 1440) return null;
      ranges.push([start, end]);
    }
    return ranges;
  };
  const ruleFor = date => config.weekly[names[date.getUTCDay()].toLowerCase()];
  const today = parse(ruleFor(calendar));
  if (today === null) return unavailable();

  const currentHours = today.length ? today.map(([start, end]) => `${clock(start)}–${clock(end)}`).join(', ') : 'Closed';
  const active = today.find(([start, end]) => minute >= start && minute < end);
  if (active) return { currentDay: parts.weekday, currentHours, state: 'open', status: `Open now · Closes at ${clock(active[1])}` };

  for (let offset = 0; offset <= 7; offset += 1) {
    const date = new Date(calendar);
    date.setUTCDate(date.getUTCDate() + offset);
    const ranges = parse(ruleFor(date));
    if (ranges === null) return unavailable();
    const next = ranges.find(([start]) => offset > 0 || start > minute);
    if (!next) continue;
    const day = offset === 0 ? 'today' : names[date.getUTCDay()];
    return { currentDay: parts.weekday, currentHours, state: 'closed', status: `Opens ${day} at ${clock(next[0])}` };
  }

  return unavailable();
}

function updateOfficeHours() {
  const details = document.querySelector('[data-office-hours]');
  const configNode = document.querySelector('#office-hours-config');
  if (!details || !configNode) return;
  let config;
  try { config = JSON.parse(configNode.textContent); } catch { return; }
  const state = calculateOfficeHours(config);
  details.dataset.hoursState = state.state;
  details.querySelector('[data-hours-current-day]').textContent = state.currentDay;
  details.querySelector('[data-hours-current-hours]').textContent = state.currentHours;
  details.querySelector('[data-hours-status]').textContent = state.status;
  details.querySelectorAll('[data-hours-day]').forEach(row => row.classList.toggle('is-today', row.dataset.hoursDay === state.currentDay));
}

const officeHours = document.querySelector('[data-office-hours]');
if (officeHours) {
  updateOfficeHours();
  setInterval(updateOfficeHours, 30000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateOfficeHours(); });
}
