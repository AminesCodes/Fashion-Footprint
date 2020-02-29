import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVoteYea } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'



const Wishlist = (props) => {
	const button = props.wishlist.willing_to_buy
		? <button className="btn btn-info " onClick={() => props.handleWish(props.wishlist.wishlist_id)}>
			<FontAwesomeIcon icon={faVoteYea} />
			Vote
			</button>
		: <button className="btn btn-info" onClick={() => props.handleWish(props.wishlist.wishlist_id)}>Would Buy</button>;

	const theText = props.wishlist.going_to_production 
		? <p className='going_to_production_true'>In Production!</p> 
		: null;
	
	
	return (
		<div className="card col-sm-3 wishlist-card m-3" style={{borderRadius: "10px"}}>
 			<img src={props.wishlist.default_pic} className="card-img-top " alt={props.wishlist.name} style={{height: '200px', objectFit: 'scale-down'}}/>
	  		<div className="card-body">
		    	<h5 className="card-title">{props.wishlist.name}</h5>
		    	<p className="card-text">{props.wishlist.description}</p>

		    	<div className='secondaryButtonsDiv'>
	          		{button}
	          		<button className='btn btn-dark' onClick={() => props.deleteWish(props.wishlist.wishlist_id)}>
					  <FontAwesomeIcon icon={faBan} />
						   Remove
						  </button>
          		</div>

		    	{theText}
	 		</div>
		</div>
	)
}

export default Wishlist;