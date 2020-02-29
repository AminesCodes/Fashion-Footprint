import React from 'react';

const Wishlist = (props) => {
	const button = props.wishlist.willing_to_buy
		? <button className="btn btn-success " onClick={() => props.handleWish(props.wishlist.wishlist_id)}>Bought!</button>
		: <button className="btn btn-primary" onClick={() => props.handleWish(props.wishlist.wishlist_id)}>Would Buy</button>;

	const theText = props.wishlist.going_to_production 
		? <p className='going_to_production_true'>In Production!</p> 
		: null;
	
	
	return (
		<div className="card col-sm-3 wishlist-card m-3">
 			<img src={props.wishlist.default_pic} className="card-img-top " alt={props.wishlist.name} style={{height: '200px', objectFit: 'scale-down'}}/>
	  		<div className="card-body">
		    	<h5 className="card-title">{props.wishlist.name}</h5>
		    	<p className="card-text">{props.wishlist.description}</p>

		    	<div className='secondaryButtonsDiv'>
	          		{button}
	          		<button className='btn btn-danger' onClick={() => props.deleteWish(props.wishlist.wishlist_id)}>Delete</button>
          		</div>

		    	{theText}
	 		</div>
		</div>
	)
}

export default Wishlist;