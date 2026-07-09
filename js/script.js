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
// Focus timer
const timerDisplay = document.getElementById('timerDisplay');
const timerNote = document.getElementById('timerNote');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesInput = document.getElementById('minutesInput');

let secondsLeft = 25 * 60;
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
    minutesInput.disabled = false;
  }
}

startBtn.addEventListener('click', () => {
  if (timerId) return;

  // Only read the input value if we're starting fresh (not resuming a pause)
  if (secondsLeft === Number(minutesInput.value) * 60 || secondsLeft === 25 * 60) {
    const mins = Math.min(Math.max(Number(minutesInput.value) || 25, 1), 180);
    minutesInput.value = mins;
    secondsLeft = mins * 60;
    updateDisplay();
  }

  timerId = setInterval(tick, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  minutesInput.disabled = true;
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
  const mins = Math.min(Math.max(Number(minutesInput.value) || 25, 1), 180);
  secondsLeft = mins * 60;
  updateDisplay();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  minutesInput.disabled = false;
  timerNote.textContent = `${mins} minutes of focused work.`;
});
// Task list
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

function refreshEmptyState() {
  const hasTasks = taskList.querySelectorAll('li:not(.empty-state)').length > 0;
  emptyState.style.display = hasTasks ? 'none' : 'block';
}

function addTask(text) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.setAttribute('aria-label', `Mark "${text}" as done`);

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = text;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.setAttribute('aria-label', `Remove "${text}"`);
  removeBtn.textContent = '\u00d7';

  checkbox.addEventListener('change', () => {
    span.classList.toggle('done', checkbox.checked);
  });

  removeBtn.addEventListener('click', () => {
    li.remove();
    refreshEmptyState();
  });

  li.append(checkbox, span, removeBtn);
  taskList.appendChild(li);
  refreshEmptyState();
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = taskInput.value.trim();
  if (!value) return;
  addTask(value);
  taskInput.value = '';
  taskInput.focus();
});
// Flashcards / sticky notes
const cardForm = document.getElementById('cardForm');
const cardFront = document.getElementById('cardFront');
const cardBack = document.getElementById('cardBack');
const cardGrid = document.getElementById('cardGrid');
const cardEmptyState = document.getElementById('cardEmptyState');

function refreshCardEmptyState() {
  const hasCards = cardGrid.querySelectorAll('.sticky-note').length > 0;
  cardEmptyState.style.display = hasCards ? 'none' : 'block';
}

function addCard(frontText, backText) {
  const note = document.createElement('div');
  note.className = 'sticky-note';

  const inner = document.createElement('div');
  inner.className = 'note-inner';

  const front = document.createElement('div');
  front.className = 'note-face note-front';
  front.innerHTML = `<span class="note-tag">Front</span><span class="note-text"></span>`;
  front.querySelector('.note-text').textContent = frontText;

  const removeBtn = document.createElement('button');
  removeBtn.className = 'note-remove';
  removeBtn.textContent = '\u00d7';
  removeBtn.setAttribute('aria-label', 'Remove card');
  removeBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    note.remove();
    refreshCardEmptyState();
  });
  front.appendChild(removeBtn);

  inner.appendChild(front);

  if (backText) {
    const back = document.createElement('div');
    back.className = 'note-face note-back';
    back.innerHTML = `<span class="note-tag">Back</span><span class="note-text"></span>`;
    back.querySelector('.note-text').textContent = backText;
    inner.appendChild(back);

    note.addEventListener('click', () => {
      note.classList.toggle('flipped');
    });
  }

  note.appendChild(inner);
  cardGrid.appendChild(note);
  refreshCardEmptyState();
}

cardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const front = cardFront.value.trim();
  const back = cardBack.value.trim();
  if (!front) return;

  addCard(front, back);
  cardFront.value = '';
  cardBack.value = '';
  cardFront.focus();
});