import React from 'react';

const UsersProductCardComponent = (props) => {
    return (
        <div className = 'productCard'>
                <img className='productImg' src = {props.product.default_pic} alt={props.product.name}/>
                <div className='secondaryButtonsDiv'>
                    <button className= "btn btn-success " onClick = {() => props.handleVote(props.product.id)}>Vote</button>
                    <button  className="btn btn-danger " onClick ={props.handleIgnore}>Ignore</button>
                </div>
                <button  className='btn btn-warning' onClick={() => props.handleAddToWishlist(props.product.id)}>Wishlist</button>
        </div>
    )
}

export default UsersProductCardComponent