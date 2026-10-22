// Elements selected with querySelector
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
const clearAllBtn = document.querySelector("#clear-all-btn");

const STORAGE_KEY = "quicknotes_data";

// Notes stored as an array of objects
let notes = [];

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotes() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            notes = JSON.parse(saved);
        } catch (error) {
            console.error("Error parsing saved notes:", error);
            notes = [];
        }
    }
}

// Update note count message
function updateCount(count = notes.length) {
    if (count === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (count === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${count} notes.`;
    }
}

// Delete a note by id
function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);
    saveNotes();
    applyFilterAndRender();
}

// Render function: builds the list using createElement and textContent (never innerHTML for user text)
function render(notesToRender = notes, isSearching = false) {
    notesList.replaceChildren();

    if (notesToRender.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "empty-message";
        emptyLi.textContent = isSearching
            ? "No notes match your search."
            : "No notes to display.";
        notesList.appendChild(emptyLi);
        updateCount(notes.length);
        return;
    }

    notesToRender.forEach((note) => {
        const li = document.createElement("li");
        li.className = `note-card category-${note.category.toLowerCase()}`;
        li.dataset.id = note.id;

        const headerDiv = document.createElement("div");
        headerDiv.className = "note-card-header";

        const categoryBadge = document.createElement("span");
        categoryBadge.className = "category-badge";
        categoryBadge.textContent = note.category;

        const dateSpan = document.createElement("span");
        dateSpan.className = "note-date";
        dateSpan.textContent = note.createdAt;

        headerDiv.appendChild(categoryBadge);
        headerDiv.appendChild(dateSpan);

        const textP = document.createElement("p");
        textP.className = "note-text";
        textP.textContent = note.text;

        const footerDiv = document.createElement("div");
        footerDiv.className = "note-card-footer";

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteNote(note.id);
        });

        footerDiv.appendChild(deleteBtn);

        li.appendChild(headerDiv);
        li.appendChild(textP);
        li.appendChild(footerDiv);

        notesList.appendChild(li);
    });

    updateCount(notes.length);
}

// Filter notes according to the search box
function applyFilterAndRender() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) {
        render(notes, false);
    } else {
        const filtered = notes.filter((note) =>
            note.text.toLowerCase().includes(searchTerm)
        );
        render(filtered, true);
    }
}

// Add note form submission with validation
noteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = noteInput.value.trim();

    // Validation
    if (text.length === 0) {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    // Clear error message on valid input
    errorMessage.textContent = "";

    const newNote = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);
    saveNotes();

    noteInput.value = "";
    applyFilterAndRender();
    noteInput.focus();
});

// Search input listener
searchInput.addEventListener("input", applyFilterAndRender);

// Bonus: Clear all notes with confirmation
if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
        if (notes.length === 0) {
            return;
        }
        if (confirm("Delete all notes?")) {
            notes = [];
            saveNotes();
            applyFilterAndRender();
        }
    });
}

// Load notes on initialization and render
loadNotes();
render();
