import React from 'react';
import axios from 'axios';



const Wishlist = (props) => {
	return (
		<div class="card col-md-6 ">
 			<img src={props.wishlist.default_pic} class="card-img-top" alt="..."/>
	  		<div class="card-body">
		    	<h5 class="card-title">{props.wishlist.name}</h5>
		    	<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
		    	<a href="#" class="btn btn-primary">Buy this!</a>
	 		</div>
		</div>
	)
}

export default Wishlist;