import React from 'react';
import axios from 'axios';
import '../../index.css';



class Wishlist extends React.Component {
	constructor(){
		super();
		this.state = {
			userBought: false
		}
	};

	handleClick = async () => {
	
		
		this.setState({userBought: !(this.state.userBought)});
	}



	render(){
		let button = this.state.userBought ? <a href="#" className="btn btn-danger red" onClick={this.handleClick}>Bought</a> : <a href="#" className="btn btn-primary" onClick={this.handleClick}>Would Buy</a>
	return (
		<div className="card col-sm-3 wishlist-card mx-3">
 			<img src={this.props.wishlist.default_pic} className="card-img-top " alt={this.props.wishlist.name} style={{height: '200px', objectFit: 'scale-down'}}/>
	  		<div className="card-body">
		    	<h5 className="card-title">{this.props.wishlist.name}</h5>
		    	<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
		    	{button}
	 		</div>
		</div>
	)
	}
}

export default Wishlist;