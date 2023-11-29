import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';


export default function Home() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [color, setColor] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);

          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate('/');
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      title: title,
      body: body,
      color: color,
      createdDate: new Date().toISOString(),
      uidd: uidd,
    });

    setTodos([
      ...todos,
      { title: title, body: body, color: color, createdDate: new Date().toISOString(), uidd: uidd },
    ]);

    setTitle('');
    setBody('');
    setColor('');
  };

  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTitle(todo.title);
    setBody(todo.body);
    setColor(todo.color);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      title: title,
      body: body,
      color: color,
      tempUidd: tempUidd,
    });
  
    // Update the todos array with the modified todo
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.uidd === tempUidd
          ? {
              ...todo,
              title: title,
              body: body,
              color: color,
            }
          : todo
      )
    );
  
    setIsEdit(false);
    setTempUidd('');
    setTitle('');
    setBody('');
    setColor('');
  };
  

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    console.log('test', uid);

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.uidd !== uid));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your notes here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="">Select Color</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="purple">Purple</option>
        <option value="orange">Orange</option>
      </select>

      {todos.map((todo) => (
        <div key={todo.uidd} style={{ backgroundColor: todo.color}}>
          <h1>{todo.title}</h1>
          <p>{todo.body}</p>
          <p>Color: {todo.color}</p>
          <p>Created Date: {new Date(todo.createdDate).toLocaleString()}</p>
          <button onClick={() => handleUpdate(todo)}>Update</button>
          <button onClick={() => handleDelete(todo.uidd)}>Delete</button>
        </div>
      ))}

      {isEdit ? (
        <div>
          <button onClick={handleEditConfirm}>Confirm</button>
        </div>
      ) : (
        <div>
          <button onClick={writeToDatabase}>Add</button>
        </div>
      )}

      <button onClick={handleSignOut}>Sign Out</button>
      
    </div>
  );
}
