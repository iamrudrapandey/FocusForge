## FocusForge
Project 1 — Responsive Frontend Interface
DecodeLabs Full Stack Development Internship

A single-page study companion built with pure **HTML5, CSS3, and vanilla JavaScript** — no frameworks, as required by the project brief.

## Live Demo
(https://iamrudrapandey.github.io/FocusForge/)

## Features

- **Focus Timer** — custom-duration countdown (1–180 minutes) with start/pause/reset
- **Task List** — add, check off, and remove daily study tasks
- **Study Playlists** — embedded Spotify playlists for background focus music
- **Flashcards / Sticky Notes** — add quick notes, or give them a back side to flip into a flashcard
- **Fully responsive** — mobile-first layout, breakpoints at 768px (tablet) and 1024px (desktop)

## Built With

- Semantic HTML5 (`header`, `nav`, `main`, `article`, `aside`, `footer`)
- CSS3 — Grid for page layout, Flexbox for components, `clamp()` for fluid typography
- Vanilla JavaScript — DOM manipulation, event handling, `setInterval` timer state
- Google Fonts (Montserrat + Roboto)
- Spotify embed player

## Accessibility

- Keyboard-focus-visible states on all interactive elements
- `aria-expanded`, `aria-controls`, `aria-label` on nav toggle and dynamic controls
- `prefers-reduced-motion` respected
- Semantic landmarks for screen reader navigation

 ## Run Locally

Just open `index.html` in a browser, or use a live server:

```bash
npx serve .
```

Or use the **Live Server** extension in VS Code.

 Project Structure
focusforge/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
## Author

Rudra Pandey (GEC Bharuch'27)
https://github.com/iamrudrapandey