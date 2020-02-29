import React, { useState, useEffect} from 'react';
import axios from 'axios';

import Feedback from '../Feedback';

export default function ProductCard(props) {
	const [ votes, setVotes] = useState([]);
    const [ networkErr, setNetworkErr ] = useState(null);

	const getVotes = async () => {
		try {
			const { data } = await axios.get(`/api/votes/${props.product.id}`);
			setVotes(data.payload);
		} catch (err) {
			setNetworkErr(err);
		}
	}

	useEffect(() => {
		getVotes();
	}, [])

	const hideFeedbackDiv = () => {
		setNetworkErr(null);
	}

	if (networkErr) {
		return <Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/> 
	}

	return(
        <div className="card col-sm-3 wishlist-card m-3">
			<div className='d-flex justify-content-around'>
                <button className='btn btn-danger' onClick={() => props.handleDeleteProduct(props.product.id)} >Delete</button>
                <button className='btn btn-warning' onClick={() => props.handleUpdateProduct(props.product)}>Edit</button>
            </div>
 			<img src={props.product.default_pic} className="card-img-top " alt={props.product.name} style={{height: '200px', objectFit: 'scale-down'}}/>
	  		<div className="card-body">
		    	<h5 className="card-title">{props.product.name}</h5>
		    	<div className="card-text">
					<p>Closing: {new Date(props.product.closing_date).toLocaleString()}</p>
					<p>Actual Votes: {votes.length}</p>
				</div>
				{
					props.product.going_to_production
					?   <button 
							className='btn btn-danger w-100' 
							onClick={() => props.handleApprobation(props.product.id)}
							>Discard!
						</button>
					:	<button 
							className='btn btn-success w-100' 
							onClick={() => props.handleApprobation(props.product.id)}
							>Approve!
						</button>
				}
	 		</div>
		</div>
    )
}