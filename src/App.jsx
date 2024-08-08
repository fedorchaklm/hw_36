import './App.css'
import { useEffect, useRef, useState } from 'react';
import NoteList from './components/NoteList/NoteList';
import NoteItem from './components/NoteItem/NoteItem';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const inputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [messageError, setMessageError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setMessageError("Something went wrong")
        }
      }
      )
      .then((user) => setUser(user))
      .catch(() => setMessageError("Something went wrong"));
  }, []);

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

  if (messageError) {
    return (
      <p className="error-info">Error: {messageError} </p>
    );
  }

  if (!user) {
    return (
      <p className="loading-info">Loading...</p>
    );
  }

  return (
    <div className="app">
      <p className="user-info">UserName: <b>{user.name}</b></p>
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