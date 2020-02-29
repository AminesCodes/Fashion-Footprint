import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


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
        <div className="card col-sm-3 wishlist-card m-3" style={{borderRadius: "10px"}}>
			<div className='d-flex justify-content-around'>
                <button className='btn btn-dark' onClick={() => props.handleDeleteProduct(props.product.id)} >
				<FontAwesomeIcon icon={faTrashAlt} />
				</button>
                <button className='btn btn-info' onClick={() => props.handleUpdateProduct(props.product)}>
				<FontAwesomeIcon icon={faEdit} />
				</button>
            </div>
 			<img src={props.product.default_pic} className="card-img-top " alt={props.product.name} style={{height: '200px', objectFit: 'scale-down'}}/>
	  		<div className="card-body">
		    	<h5 className="card-title">{props.product.name}</h5>
		    	<div className="card-text">
					<p><strong>Closing Date:</strong>
					<br></br>
					{new Date(props.product.closing_date).toLocaleString()}</p>
					<p><strong>Votes:</strong> {votes.length}</p>
				</div>
				{
					props.product.going_to_production
					?   <button 
							className='btn btn-light w-100' 
							style={{ borderColor: "#292b2c" }}
							onClick={() => props.handleApprobation(props.product.id)}>
							Discard
						</button>
					:	<button 
							className='btn btn-light w-100' 
							style={{ borderColor: "#5bc0de" }}
							onClick={() => props.handleApprobation(props.product.id)}>
							Approve
						</button>
				}
	 		</div>
		</div>
    )
}