import React from 'react';
import axios from 'axios';
import Wishlist from './Wishlist';


class WishlistContainer extends React.Component {
	constructor(){
		super();
		this.state = {
			wishListItems: []
		}
	}

	componentDidMount = async () => {
		let response = await axios.get(`/api/wishlist/${this.props.loggedUser.id}`);
		this.setState({
			wishListItems: response.data.payload
		});
	}



	render() {
		let allWishListItems = this.state.wishListItems.map((elem) => {
			return (<Wishlist wishlist={elem} />);
		});
		return (
		<div>
           {allWishListItems}
        </div>);
	}
}

export default WishlistContainer;