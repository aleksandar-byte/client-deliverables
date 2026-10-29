export const OFFICE_TIME_ZONE = 'America/New_York';

const WEEKDAY_HOURS = Object.freeze({
  Monday: '9am–7pm',
  Tuesday: '8am–5pm',
  Wednesday: '8:30am–7pm',
  Thursday: '7am–5pm',
  Friday: '9:30am–2pm',
});
const officeDate = new Intl.DateTimeFormat('en-US', {
  timeZone: OFFICE_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: 'numeric',
  weekday: 'long',
});

// Published office schedule, not live availability or special holiday hours.
export function getOfficeHoursForDate(date = new Date()) {
  const parts = Object.fromEntries(officeDate.formatToParts(date).map(p => [p.type, p.value]));
  const saturdayOrdinal = Math.floor((Number(parts.day) - 1) / 7) + 1;
  const scheduledSaturday = parts.weekday === 'Saturday' && [1, 3].includes(saturdayOrdinal);
  return {
    dateKey: `${parts.year}-${parts.month.padStart(2, '0')}-${parts.day.padStart(2, '0')}`,
    weekday: parts.weekday,
    hours: WEEKDAY_HOURS[parts.weekday] ?? (scheduledSaturday ? '8:30am–12:30pm' : 'Closed'),
  };
}

if (typeof document !== 'undefined') {
  const disclosure = document.getElementById('hero-hours');
  const label = disclosure?.querySelector('[data-hours-label]');
  const value = disclosure?.querySelector('[data-hours-today]');
  const summary = disclosure?.querySelector('summary');
  if (disclosure && label && value && summary) {
    let dateKey;
    let timer;
    const updateAccessibleName = () => {
      summary.setAttribute('aria-label', `Today, ${value.textContent}. ${disclosure.open ? 'Hide' : 'Show'} all office hours`);
    };
    const refresh = () => {
      const today = getOfficeHoursForDate();
      if (today.dateKey === dateKey) return;
      dateKey = today.dateKey;
      label.textContent = 'Today';
      value.textContent = today.hours;
      updateAccessibleName();
    };
    const start = () => {
      refresh();
      if (timer === undefined) timer = window.setInterval(refresh, 60_000);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };
    disclosure.addEventListener('toggle', updateAccessibleName);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
    window.addEventListener('pageshow', start);
    window.addEventListener('pagehide', stop);
    start();
  }
}
