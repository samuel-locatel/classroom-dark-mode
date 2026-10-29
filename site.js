const projector = document.querySelector('.projector');
const demoSwitch = document.getElementById('demo-switch');
const pens = document.querySelectorAll('.marker-pen');
const tray = document.querySelector('.tray');

function setDark(on) {
  projector.dataset.theme = on ? 'dark' : 'light';
  demoSwitch.setAttribute('aria-checked', on ? 'true' : 'false');
}

demoSwitch.addEventListener('click', () => {
  setDark(demoSwitch.getAttribute('aria-checked') !== 'true');
});

for (const pen of pens) {
  pen.addEventListener('click', () => {
    projector.dataset.accent = pen.dataset.accent;
    tray.dataset.accent = pen.dataset.accent;
    for (const p of pens) p.setAttribute('aria-pressed', p === pen ? 'true' : 'false');
  });
}

// Flip the lights once on arrival so the visitor sees what the extension does.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) {
  setDark(true);
} else {
  setTimeout(() => {
    if (projector.dataset.theme === 'light') setDark(true);
  }, 1400);
}

const thumbs = document.querySelectorAll('.tray__thumbs button');
for (const thumb of thumbs) {
  thumb.addEventListener('click', () => {
    for (const t of thumbs) {
      const on = t === thumb;
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
      document.getElementById(t.dataset.screen).hidden = !on;
    }
  });
}
