import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import React from 'react';

function Likes() {
	//setting useState variables for the like counter button
	const [likeCounter, setLikeCounter] = useState(0);


	const handleLike = () => {
		setLikeCounter(likeCounter + 1)

	}
	



	return (
		<>
		<div className='likeButton'>
			<button onClick={handleLike} className='reactionButton'>
			<FontAwesomeIcon icon={faHeart} />
			</button>
			<p>{likeCounter}</p>
		</div>
		
		</>
	)
	
	}



export default Likes