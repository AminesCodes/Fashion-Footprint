import React from 'react';

export default function ProductCard(props) {
// id: 3
// brand_id: 3
// type_id: 1
// name: "n"
// default_pic: "/images/products/1582767464023-580b585b2edbce24c47b290c.png"
// description: "d"
// closing_date: "2020-05-05T04:00:00.000Z"
// textile_id: null
// going_to_production: false

    return(
        <div className="card col-sm-3 wishlist-card mx-3">
 			<img src={props.product.default_pic} className="card-img-top " alt={props.product.name} style={{height: '200px', objectFit: 'scale-down'}}/>
	  		<div className="card-body">
		    	<h5 className="card-title">title here {props.product.name}</h5>
		    	<p className="card-text">text here</p>
	 		</div>
		</div>
    )
}