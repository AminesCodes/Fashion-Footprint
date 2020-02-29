import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faVoteYea } from '@fortawesome/free-solid-svg-icons'
import { faForward } from '@fortawesome/free-solid-svg-icons'


const UsersProductCardComponent = (props) => {
    return (
        <div className='productCard' style={{borderRadius: "10px", backgroundColor: "white"}}>
            <img className='productImg' src={props.product.default_pic} alt={props.product.name} />
            <div className='secondaryButtonsDiv'>
                <button className="btn btn-info " onClick={() => props.handleVote(props.product.id)}>
                <FontAwesomeIcon icon={faVoteYea} />
                Vote
                </button>
                <button className="btn btn-dark " onClick={props.handleIgnore}>
                Ignore
                <FontAwesomeIcon icon={faForward} />
                </button>
            </div>
                <button className='btn btn-light' style={{ borderColor: "#5bc0de" }} onClick={() => props.handleAddToWishlist(props.product.id)}>
                <FontAwesomeIcon icon={faStar} />
                 Wishlist
                </button>
        </div>
    )
}

export default UsersProductCardComponent