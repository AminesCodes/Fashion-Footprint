import React from 'react';
import axios from 'axios';
import Wishlist from './Wishlist';
import Feedback from '../Feedback';


class WishlistContainer extends React.PureComponent {
	state = {
		wishListItems: [],
		networkErr: null
	}

	getWishList = async () => {
		try {
			const { data } = await axios.get(`/api/wishlist/${this.props.loggedUser.id}`);
			console.log(data.payload)
			this.setState({ wishListItems: data.payload });
		} catch (err) {
			this.setState({ networkErr: err });
		}
	}

	componentDidMount = () => {
		this.getWishList();
	}

	handleWish = async (wishlistId, vote) => {
		try {
			const requestBody = {};
			if (vote) {
				requestBody.vote = true;
			}
			await axios.patch(`/api/wishlist/vote/${wishlistId}`, requestBody);
			this.getWishList();
		} catch (err) {
			this.setState({ networkErr: err });
		}
	}

	deleteWish = async (id) => {
		try {
			await axios.delete(`/api/wishlist/${id}`);
			this.getWishList();
		} catch (err) {
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
