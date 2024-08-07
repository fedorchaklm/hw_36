import './UserData.css';
import { useEffect, useState } from 'react';

function UserData() {
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
    <p className="user-info">UserName: <b>{user.name}</b></p>
  );
}

export default UserData;
