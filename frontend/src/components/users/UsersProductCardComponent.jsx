import React from 'react';
import {OverlayTrigger, Tooltip, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faVoteYea, faForward, faInfoCircle } from '@fortawesome/free-solid-svg-icons'



const UsersProductCardComponent = (props) => {
    return (
        <div className='productCard' style={{borderRadius: "10px", backgroundColor: "white"}}>
            <img className='productImg' src={props.product.default_pic} alt={props.product.name} />
            <OverlayTrigger
                placement='top'
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        <strong>{props.product.brand_name}</strong>
                        <br />
                        <strong>{props.product.name}</strong>
                        <br />
                        <span><strong>Material: </strong><em>{props.product.material}</em></span>
                        <br />
                        <p><strong>Description: </strong>{props.product.description}</p>
                    </Tooltip>
                }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
            </OverlayTrigger>
            <div className='secondaryButtonsDiv'>
                <button className="btn btn-info " onClick={() => props.handleVote(props.product.id)}>
                <FontAwesomeIcon icon={faVoteYea} />
                Vote
                </button>
                <span className='bold'>EXP: {new Date(props.product.closing_date).toLocaleDateString()}</span>
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