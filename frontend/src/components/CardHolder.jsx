import React from 'react';
import axios from 'axios';


class CardHolder extends React.Component{
	constructor(){
		super();
		this.state = {
			products: ''
		};
	}

	componentDidMount = async () => {
		let response = await axios.get('http://localhost:3030/api/products/methodToGetSelectStuff');
		this.setState({
			products: response.data
		});
	}


	render(){
		let allCards = products.map((elem) => {
			// this is where the products taken from the product route will be turned into
			// product cards 
			return elem;
		});
		return(
			{allCards}	
		)
	}
}

export default CardHolder;