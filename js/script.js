// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu after tapping a link
primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
// Focus timer
const timerDisplay = document.getElementById('timerDisplay');
const timerNote = document.getElementById('timerNote');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const SESSION_SECONDS = 25 * 60;
let secondsLeft = SESSION_SECONDS;
let timerId = null;

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const secs = (totalSeconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(secondsLeft);
}

function tick() {
  secondsLeft -= 1;
  updateDisplay();

  if (secondsLeft <= 0) {
    clearInterval(timerId);
    timerId = null;
    timerNote.textContent = 'Session complete — take a short break.';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

startBtn.addEventListener('click', () => {
  if (timerId) return;
  timerId = setInterval(tick, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  timerNote.textContent = 'Stay with it — you\u2019ve got this.';
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  timerNote.textContent = 'Paused. Resume whenever you\u2019re ready.';
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  secondsLeft = SESSION_SECONDS;
  updateDisplay();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  timerNote.textContent = '25 minutes of focused work.';
});