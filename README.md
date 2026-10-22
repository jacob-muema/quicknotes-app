# QuickNotes

A fast, lightweight, and modern note-taking single-page web application designed to help users capture, organize, and filter personal, work, and study notes seamlessly in their browser. Built from scratch with semantic HTML5, modern responsive CSS, and pure vanilla JavaScript, QuickNotes persists all notes across browser sessions without requiring an external database or backend server.

---

## Features

- **Categorized Notes:** Assign notes to **Personal**, **Work**, or **Study** categories, each visually identified by distinctive color-coded borders and badges.
- **Client-Side Form Validation:** Prevents submission of empty notes or notes exceeding 200 characters with user-friendly error messages in `#error-message`.
- **Dynamic Note Counting:** Displays real-time note tallies accurately accounting for zero (`"You have no notes yet."`), one (`"You have 1 note."`), and multiple (`"You have N notes."`) notes.
- **Live Search & Filtering:** Filter your notes instantly as you type in the search bar, with friendly feedback (`"No notes match your search."`) when no matching notes are found.
- **Data Persistence:** Automatically synchronizes notes with browser `localStorage` using `JSON.stringify` and `JSON.parse`, keeping data intact across browser reloads.
- **XSS-Safe DOM Rendering:** Built strictly using `document.createElement()` and `textContent` rather than `innerHTML` to ensure untrusted user input is rendered safely.
- **Responsive Card Design:** Clean card-based user interface using Flexbox layout and media queries that gracefully collapse into a single-column layout on mobile devices ($\le$ 600px).
- **Bonus Feature (Clear All):** Includes a "Clear all" button that confirms action with `confirm("Delete all notes?")` before safely resetting the list.

---

## How to Run Locally

You can run QuickNotes locally without any external build tools, bundlers, or package managers:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jacob-muema/quicknotes-app.git
   cd quicknotes-app
   ```

2. **Open in your browser:**
   - Double-click `index.html` to open it directly in any modern web browser (Chrome, Firefox, Safari, Edge).
   - Alternatively, serve the folder using Python's built-in HTTP server:
     ```bash
     python3 -m http.server 8000
     ```
     Then navigate to `http://localhost:8000` in your browser.

---

## What I Learned

1. **Defensive DOM Manipulation & Security:**
   Learned how to construct interactive user interfaces by programmatically creating elements (`document.createElement`) and setting text content (`textContent`) instead of relying on `innerHTML`, completely mitigating Cross-Site Scripting (XSS) risks when handling arbitrary user input.

2. **State Management & Local Storage Synchronization:**
   Gained hands-on experience treating an array of JavaScript objects as the single source of truth and synchronizing state changes to browser `localStorage` using serialization (`JSON.stringify` / `JSON.parse`).

3. **Responsive Mobile-First CSS & Accessible Forms:**
   Mastered semantic form construction using explicit `<label for="...">` associations, flexible form layouts via Flexbox, visual category differentiation through modifier classes, and adapting layouts for handheld screens via CSS media queries.
