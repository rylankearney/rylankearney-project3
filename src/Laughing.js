import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFaceLaughSquint } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import React from 'react';

function Laughing() {
	//setting useState variables for the laugh counter button
	const [laughCounter, setLaughCounter] = useState(0);


	const handleLaugh = () => {
		setLaughCounter(laughCounter + 1)

	}
	



	return (
		<>
		<div className='likeButton'>
			<button onClick={handleLaugh} className='reactionButton'>
			<FontAwesomeIcon icon={faFaceLaughSquint} />
			</button>
			<p>{laughCounter}</p>
		</div>
		
		</>
	)
	
	}



export default Laughing