import './App.css';
import app from './firebase.js';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import React from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'
import Header from './Header.js';
import Rules from './Rules.js';
import Counter from './Counter.js';
import Footer from './Footer.js';

function App() {


  const [ comments, setComments] = useState( [] );

  const [userInput, setUserInput] = useState('');



  useEffect( () => {
    const database = getDatabase(app);
    const dbRef = ref(database, "comments");

    onValue(dbRef, (resp) => {
      //console.log(resp.val());

      const data = resp.val();


      const updatedDatabaseInfo = [];
      for (let key in data) {
        updatedDatabaseInfo.push({
          key: key, 
          name: data[key], 
         });
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

  
  const commentObject = {
    comment: userInput,
    counter: 0
  }

  const database = getDatabase(app);
   const dbRef = ref(database, "comments");

   

  if (userInput) {
    push(dbRef, commentObject);
    setUserInput('');
  } else {
    alert("Please write a comment") ;
  }

  setUserInput('');
  }

 

  const handleRemoveComment = (commentId) => {
    const database = getDatabase(app);
    const dbRef = ref(database, `comments/${commentId}`)

    remove(dbRef);
  }

      return (
        <>
        <Header />
        <div className="App wrapper">
            <Rules />
            <form action="submit">
              <label htmlFor="newComment">Spill the tea below</label>

              <textarea type="text" id="newComment" onChange={handleInputChange} value={userInput} required></textarea>

              <button className="postButton" onClick={handleSubmit}>Post</button>
            </form>

            
            <ul id="displayedComments">
              {comments.map((indComment) => {
                return (
              <li key={indComment.key}>
                <p>{indComment.name.comment}</p>
                <button 
                className="closeButton"
                onClick={ () => handleRemoveComment(indComment.key) }>
                  <FontAwesomeIcon icon={faX} />
                </button>
                <Counter />
              </li>
              )

              })}
            </ul>
            <Footer />
        </div>
        </>
      );
    }


export default App
