//MVP: to create an anonymous comment forum in which the comment data is stored in Firebase (completed, yay!)

//STRETCH: adding reaction buttons that users can click to interact with the posts (semi(?) completed(?). There is a like button, and when you click it the number of "likes" increases. Which is a good start! However, the data hasn't been pushed to Firebase, therefore, the counter resets every time the page is refreshed :( )


import './App.css';
import app from './firebase.js';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import React from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'
import Header from './Header.js';
import Rules from './Rules.js';
import Likes from './Likes.js';
import Laughing from './Laughing.js';
import SadFace from './SadFace.js';
import Banner from './Banner.js';
import Footer from './Footer.js';


function App() {

  // Setting up a stateful variable to hold our comments (an empty array to start) and user input.

  const [ comments, setComments] = useState( [] );

  const [userInput, setUserInput] = useState('');

//Setting up useEffect with a dependancy array to ensure that the database call only happens once, on component mount, and storing the call to the database inside

  useEffect( () => {
    //
    const database = getDatabase(app);
    const dbRef = ref(database, "comments");

    onValue(dbRef, (resp) => {
      
      //storing the results from the database call in the variable below (data)

      const data = resp.val();

      //Sample comments from Firebase were tested successfully with this loop (comments on the page currently were submitted from the page directly)

      const updatedDatabaseInfo = [];
      for (let key in data) {
        updatedDatabaseInfo.push({
          key: key, 
          name: data[key], 
          likes: data[key].counter
         });
      }
      //Passing the updateedDatabaseInfo array INTO our setComments function to update our stateful variable

      setComments(updatedDatabaseInfo);
      
    })
  }, [])

  //storing the input change and handle submit functions

  const handleInputChange = (e) =>{
    setUserInput(e.target.value)
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    
  //variable to show the kay/values in the Firebase object

  const commentObject = {
    comment: userInput,
    // likeCounter: 0,
    // laughCounter: 0, 
    // sadCounter: 0
  }
  
  const database = getDatabase(app);
  const dbRef = ref(database, "comments");
   
//conditional for an empty comment input 
  if (userInput) {
    push(dbRef, commentObject);
    setUserInput('');
    alert("Success!");
  } else {
    alert("Please write a comment") ;
  }

  setUserInput('');
}

//function to remove comments

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
        {/*as we can see, the handle input change has been created in the form to record the user's input*/}
              <textarea type="text" id="newComment" onChange={handleInputChange} value={userInput} required></textarea>

              <button className="postButton" onClick={handleSubmit}>Post</button>
            </form>

            {/*creating a map loop to ensure that the comments append to the page once the user has submitted via the comment box */}
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
                <div className="buttonFlex">
                  <Likes />
                  <Laughing />
                  <SadFace />
                </div>
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
