import React from 'react';
import axios from 'axios';
import '../../index.css';



const Wishlist = (props) => {
	return (
		<div className="card col-sm-3 wishlist-card mx-3">
 			<img src={props.wishlist.default_pic} className="card-img-top " alt={props.wishlist.name} style={{height: '200px', objectFit: 'scale-down'}}/>
	  		<div className="card-body">
		    	<h5 className="card-title">{props.wishlist.name}</h5>
		    	<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
		    	<a href="#" className="btn btn-primary">Buy this!</a>
	 		</div>
		</div>
	)
}

export default Wishlist;