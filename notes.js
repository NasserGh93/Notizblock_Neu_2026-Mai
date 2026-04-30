let notes = ['banana', 'rasen mähen'];
let trashNotes = [];

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function getNoteTemplate(indexNote) {
    return `<p>+ ${notes[indexNote]}</p> <button onclick="deleteNote(${indexNote})">X</button>`;
}

function addNote() {
    let noteInputRef = document.getElementById('note_input');
    let note_input = noteInputRef.value;

    notes.push(note_input);

    renderNotes();

    noteInputRef.value = "";
}

function deleteNote(indexNote) {
    trashNotes.push(notes[indexNote]);
    notes.splice(indexNote, 1);
    renderNotes();
    renderTrashNotes();
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}

function getTrashNoteTemplate(indexNote) {
    return `<p>+ ${trashNotes[indexNote]}</p>`;
}
