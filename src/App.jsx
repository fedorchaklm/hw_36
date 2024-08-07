import './App.css'
import { useEffect, useRef, useState } from 'react';
import NoteList from './components/NoteList/NoteList';
import NoteItem from './components/NoteItem/NoteItem';
import UserData from './components/UserData/UserData';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function handleSubmit(event) {
    event.preventDefault();
    if (inputRef.current.value !== '') {
      setNotes([...notes, inputRef.current.value]);
      inputRef.current.value = '';
    }
  }

  function handleDelete(index) {
    notes.splice(index, 1)
    setNotes([...notes]);
  }

  return (
    <div className="app">
      <UserData />
      <form onSubmit={handleSubmit}>
        <h2>Your notesList</h2>
        <input
          type="text"
          name="userNote"
          placeholder='Enter note'
          ref={inputRef}
        />
        <button type="submit">Add</button>
      </form>
      <NoteList>
        {notes.length === 0 ? <p className="notes-wrap">Нотаток немає</p> :
          notes.map((note, index) => <NoteItem note={note} key={index} onDelete={() => handleDelete(index)} />)}
      </NoteList>
    </div>
  )
}

export default App