import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notesFile from "./../notes";

function App() {
  // State for handle changes
  const [inputText, setInputText] = useState({
    title: "",
    content: ""
  });

  // State for map/add/delete notes
  const [notes, setNotes] = useState(notesFile);

  // Handle changes
  function handleChange(event) {
    const newValue = event.target.value;
    const inputName = event.target.name;

    setInputText((prevValue) => {
      if (inputName === "title") {
        return {
          title: newValue,
          content: prevValue.content
        };
      } else if (inputName === "content") {
        return {
          title: prevValue.title,
          content: newValue
        };
      }
    });
  }

  // Map notes to Note objects
  function mapNotes(note) {
    var notesMapped = (
      <Note
        noteId={note.key}
        title={note.title}
        content={note.content}
        onDelete={deleteNote}
      />
    );
    // console.log(notesMapped);
    return notesMapped;
  }

  // Add notes
  function addNote() {
    setNotes((prevNotes) => {
      var keys = prevNotes.map((note) => note.key);
      var maxKey = Math.max.apply(null, keys);
      inputText["key"] = maxKey + 1;
      var newNotes = [...prevNotes, inputText];
      // console.log(typeof keys);
      // console.log(keys);
      // console.log(maxKey);
      // console.log(newNotes);
      return newNotes;
    });
    setInputText({
      title: "",
      content: ""
    });
  }

  // Delete notes
  function deleteNote(idToDelete) {
    setNotes((prevNotes) => {
      var newNotes = prevNotes.filter(
        (prevNotes) => prevNotes.key !== idToDelete
      );
      // console.log(prevNotes);
      // console.log(idToDelete);
      // console.log(newNotes);
      return newNotes;
    });
  }

  return (
    <hiv>
      <Header text="Keeper"></Header>
      <div className="addnote">
        <input
          name="title"
          placeholder="Title"
          type="text"
          value={inputText.title}
          onChange={handleChange}
          style={{ color: "orange" }}
        />
        <input
          name="content"
          placeholder="Take a note..."
          type="text"
          value={inputText.content}
          onChange={handleChange}
        />
        <button onClick={addNote}>Add note</button>
      </div>
      <div>{notes.map(mapNotes)}</div>
      <div>
        <Footer></Footer>
      </div>
    </hiv>
  );
}

export default App;
