import React, {useState} from "react";
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
    return (
        <Note
            noteId={note.key}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
        />
    );
  }

  // Add notes
  function addNote() {
    if (inputText.title.length === 0 || inputText.content.length === 0)
      alert("Please put in title and note content")
    else {
      setNotes((prevNotes) => {
        const keys = prevNotes.map((note) => note.key);
        const maxKey = Math.max.apply(null, keys);
        inputText["key"] = maxKey + 1;
        return [...prevNotes, inputText];
      });
      setInputText({
        title: "",
        content: ""
      });
    }
  }

  // Delete notes
  function deleteNote(idToDelete) {
    setNotes((prevNotes) => {
      return prevNotes.filter(
          (prevNotes) => prevNotes.key !== idToDelete
      );
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
          required
        />
        <input
          name="content"
          placeholder="Take a note..."
          type="text"
          value={inputText.content}
          onChange={handleChange}
          required
        />
        <br></br>
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
