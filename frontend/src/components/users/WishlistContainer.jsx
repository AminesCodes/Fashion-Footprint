import React from 'react';
import axios from 'axios';
import Wishlist from './Wishlist';
import Feedback from '../Feedback';


class WishlistContainer extends React.Component {
	state = {
		wishListItems: [],
		networkErr: null
	}

	getWishList = async () => {
		try {
			const response = await axios.get(`/api/wishlist/${this.props.loggedUser.id}`);
			this.setState({ wishListItems: response.data.payload });
		} catch (err) {
			this.setState({ networkErr: err });
		}
	}

	componentDidMount = () => {
		this.getWishList();
	}

	handleWish = async (wishlistId) => {
		try {
			await axios.patch(`/api/wishlist/vote/${wishlistId}`);
			this.getWishList();
		} catch (err) {
			this.setState({ networkErr: err });
		}
	}

	deleteWish = async (id) => {
		try {
			await axios.delete(`/api/wishlist/${id}`);
			this.getWishList();
		} carch (err) {
			this.setState({ networkErr: err });
		}
		
	}

	hideFeedbackDiv = () => {
		this.setState({ networkErr: null });
	}

	render() {
		if (this.state.networkErr) {
			return <Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv}/> 
		}

		return (
		<div className = 'row'>
           {this.state.wishListItems.map((elem) => 
				<Wishlist 
					key={elem.wishlist_id}
					wishlist={elem}
					handleWish={this.handleWish}
					deleteWish={this.deleteWish}
				/>)
			}
        </div>);
	}
}

export default WishlistContainer;
