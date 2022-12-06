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
import Banner from './Banner.js';
import Footer from './Footer.js';


function App() {

  // Setting up a stateful variable to hold our comments (an empty array to start).

  const [ comments, setComments] = useState( [] );

  const [userInput, setUserInput] = useState('');

  //const [counter, setCounter] = useState(0);



  useEffect( () => {
    const database = getDatabase(app);
    const dbRef = ref(database, "comments");

    onValue(dbRef, (resp) => {
      

      const data = resp.val();


      const updatedDatabaseInfo = [];
      for (let key in data) {
        updatedDatabaseInfo.push({
          key: key, 
          name: data[key], 
          likes: data[key].counter
         });
      }
      //Passing that array INTO our setComments function to update our stateful variable

      setComments(updatedDatabaseInfo);
      //console.log(updatedDatabaseInfo.likes);

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

   
//conditional for an empty comment input
  if (userInput) {
    push(dbRef, commentObject);
    setUserInput('');
  } else {
    alert("Please write a comment") ;
  }

  setUserInput('');
  }

  // push(dbRef, data[key].counter)
  // setCounter()
 

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
            <Banner />
            <Footer />
        </div>
        </>
      );
    }


export default App
