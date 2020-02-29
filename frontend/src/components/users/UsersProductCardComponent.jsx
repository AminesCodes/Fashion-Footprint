import React from 'react';

const UsersProductCardComponent = (props) => {
    return (
        <div className = 'productCard'>
                <img className='productImg' src = {props.product.default_pic} alt={props.product.name}/>
                <div className='secondaryButtonsDiv'>
                    <button className= "btn btn-info " onClick = {() => props.handleVote(props.product.id)}>Vote</button>
                    <button  className="btn btn-dark " onClick ={props.handleIgnore}>Ignore</button>
                </div>
                <button  className='btn btn-light' style={{borderColor: "#5bc0de"}} onClick={() => props.handleAddToWishlist(props.product.id)}>Wishlist</button>
        </div>
    )
}

export default UsersProductCardComponent