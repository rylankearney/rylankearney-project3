import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
// import app from './firebase.js'
// import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import React from 'react';

function Counter() {
	//setting useState variables for the like counter button
	const [counter, setCounter] = useState(0);


	const handleLike = () => {
		setCounter(counter + 1)

	}



	return (
		<>
		<div className='likeButton'>
			<button onClick={handleLike} className='heartButton'>
			<FontAwesomeIcon icon={faHeart} />
			</button>
			<p>{counter}</p>
		</div>
		
		</>
	)
	
	}



export default Counter