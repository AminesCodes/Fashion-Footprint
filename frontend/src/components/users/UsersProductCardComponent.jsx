import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import '../../index.css';



const UsersProductCardComponent = (props) => {
  

    const handleVote = async () =>{
        console.log('voted clicked')
       try{
        let response = await axios.post('/api/votes/addVote', {user_id: props.userId, product_id: props.product.product_id});
        }
        catch(err){
            console.dir(err);
        }
    }


   const handleIgnore = () =>{
        console.log('go to next item')
    }

  const handleAddToWishlist = async () => { 
        console.log('added to Wishlist')
        try {
            let response = await axios.post(`/api/wishlist/add/${props.product.product_id}`, {style_id: props.product.style_id, user_id: props.userId});
            console.log(response);
        }
        catch(err){
            console.dir(err);
        }
    } 
        return (

            <div className = 'productCard'>
                    <img className='productImg' src = {props.product.default_pic} alt={props.product.name}/>
                    <div className='secondaryButtonsDiv'>
                        <button className= "btn btn-success " onClick = {handleVote}>Vote</button>
                        <button  className="btn btn-danger " onClick ={handleIgnore}>Ignore</button>
                    </div>
                    <button  className='btn btn-warning' onClick={handleAddToWishlist}>Wishlist</button>
            </div>
        )


}

export default UsersProductCardComponent