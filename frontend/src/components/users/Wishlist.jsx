import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVoteYea, faBan, faInfoCircle } from '@fortawesome/free-solid-svg-icons';



const Wishlist = (props) => {
	const button = props.wishlist.willing_to_buy
		? <button className='btn btn-light' onClick={() => props.handleWish(props.wishlist.wishlist_id)}>
			<span className='h6'>Un-vote</span></button>
		: <button className='btn btn-info' onClick={() => props.handleWish(props.wishlist.wishlist_id)}>
			<FontAwesomeIcon icon={faVoteYea} /><span className='h6'>Vote</span></button>

	const theText = props.wishlist.going_to_production 
		? <p className='text-success text-center font-weight-bolder'>In Production!</p> 
		: null;
	
	
	return (
		<div className='card col-sm-4 wishlist-card m-2'>
			<div className='text-right'>Coupon: <span className='text-success'>{props.wishlist.coupon}</span></div>
			<img src={props.wishlist.default_pic} className='card-img-top ' alt={props.wishlist.product_name} 
			 	style={{height: '200px', objectFit: 'scale-down'}}/>
			<OverlayTrigger
                placement='top'
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        <strong>{props.wishlist.brand_name}</strong>
                        <br />
                        <strong>{props.wishlist.product_name}</strong>
                        <br />
                        <span><strong>Material: </strong><em>{props.wishlist.material}</em></span>
                        <br />
                        <p><strong>Description: </strong>{props.wishlist.description}</p>
                    </Tooltip>
                }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
            </OverlayTrigger>

	  		<div className='card-body'>
		    	<h5 className='card-title'>{props.wishlist.brand_name}</h5>
		    	<div className='card-text'>
					<p>{props.wishlist.product_name}</p>
					<p className='text-danger text-center font-weight-bold'>
						Closing: {new Date(props.wishlist.closing_date).toLocaleDateString()}
					</p>
				</div>

		    	<div className='secondaryButtonsDiv wishlist-buttons'>
	          		{button}
	          		<button className='btn btn-dark' onClick={() => props.deleteWish(props.wishlist.wishlist_id)}>
					  <FontAwesomeIcon icon={faBan} />
						   Remove
						  </button>
          		</div>

		    	{theText}
	 		</div>
		</div>
	)
}

export default Wishlist;