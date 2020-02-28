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
		let response = await axios.patch(`/api/wishlist/vote/${this.props.wishlist.wishlist_id}`);
		console.log(response);
		this.setState({userBought: !(this.state.userBought)});

	}



	render(){
	let button = this.state.userBought ? <a href="#" className="btn btn-danger red" onClick={this.handleClick}>Bought</a> : <a href="#" className="btn btn-primary" onClick={this.handleClick}>Would Buy</a>
	let theText = this.props.wishlist.going_to_production ? <p className='going_to_production_true'>In Production!</p> : null;
	return (
		<div className="card col-sm-3 wishlist-card mx-3">
 			<img src={this.props.wishlist.default_pic} className="card-img-top " alt={this.props.wishlist.name} style={{height: '200px', objectFit: 'scale-down'}}/>
	  		<div className="card-body">
		    	<h5 className="card-title">{this.props.wishlist.name}</h5>
		    	<p className="card-text">{this.props.wishlist.description}</p>
          		{button}
		    	{theText}
	 		</div>
		</div>
	)
	}
}

export default Wishlist;