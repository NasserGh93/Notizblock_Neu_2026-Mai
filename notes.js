// ===== DATEN LADEN =====
let notesTitle = JSON.parse(localStorage.getItem("notesTitle")) || ["Ba", "Aufgabe", "Garten"];
let notes = JSON.parse(localStorage.getItem("notes")) || ["banana", "Orange", "rasenmähen"];

let trashNotesTitle = JSON.parse(localStorage.getItem("trashNotesTitle")) || [];
let trashNotes = JSON.parse(localStorage.getItem("trashNotes")) || [];


// ===== SPEICHERN =====
function saveData() {
    localStorage.setItem("notesTitle", JSON.stringify(notesTitle));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("trashNotesTitle", JSON.stringify(trashNotesTitle));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}


// ===== RENDERN =====
function renderNotes() {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
        contentRef.innerHTML += getNoteTemplate(i);
    }

    renderTrashNotes();
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById("trash_content");
    trashContentRef.innerHTML = "";

    for (let i = 0; i < trashNotes.length; i++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(i);
    }
}

function moveAllToTrash() {
    if (notes.length === 0) return;

    if (confirm("Alle Notizen als erledigt markieren?")) {
        // Alle Notes in Trash verschieben
        trashNotes = trashNotes.concat(notes);
        trashNotesTitle = trashNotesTitle.concat(notesTitle);

        // Notes leeren
        notes = [];
        notesTitle = [];

        saveData();
        renderNotes();
    }
}

// ===== TEMPLATES =====
function getNoteTemplate(index) {
    return `
        <p>
            >>>
            <b
                id="note-title-${index}"
                class="editable"
                onclick="editNoteTitle(${index})"
                title="✏️ Titel direkt bearbeiten"
            >
                ${notesTitle[index]} ✏️
            </b>
            → ${notes[index]}
            <button onclick="noteToTrash(${index})">x</button>
        </p>
    `;
}

function restoreNote(index) {
    let restoredNote = trashNotes.splice(index, 1)[0];
    let restoredTitle = trashNotesTitle.splice(index, 1)[0];

    notes.push(restoredNote);
    notesTitle.push(restoredTitle);

    saveData();
    renderNotes();
}
function getTrashNoteTemplate(index) {
    return `
        <p>
            >>> <b>${trashNotesTitle[index]}</b> → ${trashNotes[index]}

            <button onclick="restoreNote(${index})">♻️</button>
            <button onclick="deleteTrashNote(${index})">x</button>
        </p>
    `;
}


// ===== NOTE HINZUFÜGEN =====
function addNote() {
    let inputRef = document.getElementById("note_input");
    let value = inputRef.value;

    if (value === "") return;

    notes.push(value);
    notesTitle.push("Titel");

    inputRef.value = "";

    saveData();
    renderNotes();
}


// ===== NOTE IN PAPIERKORB =====
function noteToTrash(index) {
    let deletedNote = notes.splice(index, 1)[0];
    let deletedTitle = notesTitle.splice(index, 1)[0];

    trashNotes.push(deletedNote);
    trashNotesTitle.push(deletedTitle);

    saveData();
    renderNotes();
}


// ===== EINZELNE TRASH NOTE LÖSCHEN =====
function deleteTrashNote(index) {
    trashNotes.splice(index, 1);
    trashNotesTitle.splice(index, 1);

    saveData();
    renderTrashNotes();
}


// ===== PAPIERKORB LEEREN =====
function clearTrash() {
    if (confirm("Willst du wirklich den Papierkorb leeren?")) {
        trashNotes = [];
        trashNotesTitle = [];

        saveData();
        renderTrashNotes();
    }
}


// ===== TITEL INLINE BEARBEITEN =====
function editNoteTitle(index) {
    let titleRef = document.getElementById(`note-title-${index}`);

    titleRef.contentEditable = true;
    titleRef.focus();

    titleRef.addEventListener("blur", function () {
        saveEditedTitle(index);
    }, { once: true });

    titleRef.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            titleRef.blur();
        }
    }, { once: true });
}


// ===== BEARBEITETEN TITEL SPEICHERN =====
function saveEditedTitle(index) {
    let titleRef = document.getElementById(`note-title-${index}`);

    let newTitle = titleRef.innerText.replace("✏️", "").trim();

    if (newTitle === "") {
        newTitle = "Ohne Titel";
    }

    notesTitle[index] = newTitle;

    saveData();
    renderNotes();
}

document.getElementById("note_input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // verhindert Zeilenumbruch
        addNote();
        document.getElementById("note_input").focus();
    }
});
