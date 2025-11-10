// UI helpers: date/time display and background color changer

// UI helpers: date/time display plus robust theme/bg persistence

// Use a small helper so we don't clobber other classes on <body>
function applyThemeClass(className) {
  // remove any existing theme-* or bg-theme-* classes
  const existing = Array.from(document.body.classList);
  existing.forEach(cls => {
    if (cls.startsWith('theme-') || cls.startsWith('bg-theme-')) {
      document.body.classList.remove(cls);
    }
  });
  if (className) document.body.classList.add(className);
}

document.addEventListener('DOMContentLoaded', function () {
  // Date/time
  const dt = document.getElementById('current-datetime');
  function updateDateTime() {
    if (!dt) return;
    const now = new Date();
    const opts = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    dt.textContent = now.toLocaleString(undefined, opts);
  }
  updateDateTime();
  setInterval(updateDateTime, 60 * 1000); // update every minute

  // Background color options (mapped to css-safe classes)
  const bgCount = 6; // bg-theme-0 .. bg-theme-5

  // Storage helpers
  const THEME_KEY = 'site-theme'; // values: theme-light / theme-dark
  const BGKEY = 'site-bg-index'; // numeric index for bg-theme-N

  function saveTheme(value) { localStorage.setItem(THEME_KEY, value); }
  function loadTheme() { return localStorage.getItem(THEME_KEY); }
  function saveBgIndex(i) { localStorage.setItem(BGKEY, String(i)); }
  function loadBgIndex() { const v = localStorage.getItem(BGKEY); return v === null ? null : parseInt(v, 10); }

  // Initialize theme and bg class from storage
  const savedTheme = loadTheme();
  if (savedTheme) applyThemeClass(savedTheme);
  const savedBg = loadBgIndex();
  if (typeof savedBg === 'number' && !Number.isNaN(savedBg)) applyThemeClass('bg-theme-' + (savedBg % bgCount));

  // Theme toggle removed per user request. We still honor stored theme if present (applied on load).

  // Background changer (cycles bg-theme-N classes), keeps theme classes intact
  const bgButton = document.getElementById('bg-change');
  if (bgButton) {
    let idx = loadBgIndex() || 0;
    bgButton.addEventListener('click', function () {
      idx = (idx + 1) % bgCount;
      // remove previous bg-theme-* classes then add the new one
      Array.from(document.body.classList).forEach(c => { if (c.startsWith('bg-theme-')) document.body.classList.remove(c); });
      document.body.classList.add('bg-theme-' + idx);
      saveBgIndex(idx);
    });
  }

  // Accessibility: allow quick reset via data-reset-theme
  const resetEl = document.querySelector('[data-reset-theme]');
  if (resetEl) resetEl.addEventListener('click', function () { localStorage.removeItem(THEME_KEY); localStorage.removeItem(BGKEY); location.reload(); });
});