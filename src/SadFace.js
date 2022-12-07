import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import React from 'react';

function SadFace() {
	//setting useState variables for the sad counter button
	const [sadCounter, setSadCounter] = useState(0);


	const handleSadness = () => {
		setSadCounter(sadCounter + 1)

	}
	



	return (
		<>
		<div className='likeButton'>
			<button onClick={handleSadness} className='reactionButton'>
			<FontAwesomeIcon icon={faFaceSadCry} />
			</button>
			<p>{sadCounter}</p>
		</div>
		
		</>
	)
	
	}



export default SadFace