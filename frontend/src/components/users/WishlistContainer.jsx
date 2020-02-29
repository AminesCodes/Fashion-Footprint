import React from 'react';
import axios from 'axios';
import Wishlist from './Wishlist';
import Feedback from '../Feedback';


class WishlistContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			wishListItems: [],
			stopRefresh: true,
			networkErr: null
		}
	}

	getWishList = async () => {
		try {
			if(this.state.stopRefresh){

			const response = await axios.get(`/api/wishlist/${this.props.loggedUser.id}`);
			this.setState({ wishListItems: response.data.payload,
							stopRefresh: false });
			}
		} catch (err) {
			this.setState({ networkErr: err });
		}
	}

	componentDidMount = () => {
		this.getWishList();
	}
	componentDidUpdate = () => {
		this.getWishList();
	}

	handleWish = async (wishlistId) => {
		try {
			await axios.patch(`/api/wishlist/vote/${wishlistId}`);
			this.getWishList()
		} catch (err) {
			this.setState({ networkErr: err });
		}
	}

	deleteWish = async (id) => {
		let response = await axios.delete(`/api/wishlist/${id}`);
		this.setState({
			stopRefresh: true
		});
	}

	hideFeedbackDiv = () => {
		this.setState({ networkErr: null });
	}

	render() {
		if (this.state.networkErr) {
			return <Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv}/> 
		}

		return (
		<div className = 'row wishlist-row'>
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