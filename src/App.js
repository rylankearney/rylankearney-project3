import './App.css';
import app from './firebase.js';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import React from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'
import Header from './Header.js';
import Rules from './Rules.js';
import Footer from './Footer.js';

function App() {


  const [ comments, setComments] = useState( [] );

  const [userInput, setUserInput] = useState('');


  useEffect( () => {
    const database = getDatabase(app);
    const dbRef = ref(database);

    onValue(dbRef, (resp) => {
      //console.log(resp.val());

      const data = resp.val()

      const updatedDatabaseInfo = [];
      for (let key in data) {
        //console.log(key)
        //console.log(data[key])
        updatedDatabaseInfo.push({key: key, name: data[key]});
      }
      //Passing that array INTO our setComments function to update our stateful variable

      setComments(updatedDatabaseInfo);
    })
  }, [])

  const handleInputChange = (e) =>{
    setUserInput(e.target.value)
    
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
  


  const database = getDatabase(app);
  const dbRef = ref(database);

  push(dbRef, userInput);

  setUserInput('');
  }

  const handleRemoveComment = (commentId) => {
    const database = getDatabase(app);
    const dbRef = ref(database, `/${commentId}`)

    remove(dbRef);
  }

      return (
        <>
        <Header />
        <div className="App wrapper">
            <Rules />
            <form action="submit">
              <label htmlFor="newComment">Spill the tea below</label>

              <textarea type="text" id="newComment" onChange={handleInputChange} value={userInput} />

              <button className="postButton" onClick={handleSubmit}>Post</button>
            </form>
            
            <ul id="displayedComments">
              {comments.map((comments) => {
                return (
              
              <li key={comments.key}>
                <p>{comments.name}</p>
                <button 
                className="closeButton"
                onClick={ () => handleRemoveComment(comments.key) }>
                  <FontAwesomeIcon icon={faX} />
                </button>
              </li>
              )

              })}
            </ul>
            <Footer />
        </div>
        </>
      );
    }


export default App;
