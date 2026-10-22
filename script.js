// Elements selected with querySelector
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
const clearAllBtn = document.querySelector("#clear-all-btn");

// Notes stored as an array of objects
let notes = [];

// Render function: builds the list using createElement and textContent (never innerHTML for user text)
function render(notesToRender = notes) {
    notesList.replaceChildren();

    if (notesToRender.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "empty-message";
        emptyLi.textContent = "No notes to display.";
        notesList.appendChild(emptyLi);
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

        footerDiv.appendChild(deleteBtn);

        li.appendChild(headerDiv);
        li.appendChild(textP);
        li.appendChild(footerDiv);

        notesList.appendChild(li);
    });
}

// Add note form submission
noteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);
    render();

    noteInput.value = "";
    noteInput.focus();
});

// Initial render
render();
