let notesTitle = ['Ba', 'Aufgabe', 'Garten'];
let notes = ['banana', 'Orange', 'rasenmähen'];

let trashNotes = [];
let trashNotesTitle = [];

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
        contentRef.innerHTML += getNoteTemplate(i);
    }
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let i = 0; i < trashNotes.length; i++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(i);
    }
}

function getNoteTemplate(index) {
    return `
        <p>
            >>> <b>${notesTitle[index]}</b> → ${notes[index]}
            <button onclick="noteToTrash(${index})">x</button></p>`;
}

function getTrashNoteTemplate(index) {
    return `
        <p>
            >>> <b>${trashNotesTitle[index]}</b> → ${trashNotes[index]}
            <button onclick="deleteTrashNote(${index})">x</button>
        </p>
    `;
}

function addNote() {
    let inputRef = document.getElementById('note_input');
    let value = inputRef.value.trim();

    if (value === "") return;

    notes.push(value);
    notesTitle.push("Neuer Titel");

    inputRef.value = "";

    renderNotes();
}

function noteToTrash(index) {
    let deletedNote = notes.splice(index, 1)[0];
    let deletedTitle = notesTitle.splice(index, 1)[0];

    trashNotes.push(deletedNote);
    trashNotesTitle.push(deletedTitle);

    renderNotes();
    renderTrashNotes();
}

function deleteTrashNote(index) {
    trashNotes.splice(index, 1);
    trashNotesTitle.splice(index, 1);

    renderTrashNotes();
}
