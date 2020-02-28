import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'

class UsersProductCardComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            description: '',
            image: []
        }
    }

    handleCardInfo = () =>{
        
    }
    handleVote = () =>{
        console.log('voted clicked')
    }

    handleIgnore = () =>{
        console.log('go to next item')
    }

    handleAddToWishlist = () =>{
        console.log('added to Wishlist')
    }


    


    render() {
       
        return (
            <div>

                <Card>
                    <button onClick = {this.handleVote}>Vote</button>
                    <Card.Img src = 'https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199879943/Ramen-Panda-tahiti-blue-light-t-shirt-teeturtle-full-21-1000x1000.jpg'></Card.Img>
                    <button onClick ={this.handleIgnore}>Ignore</button>
                    <button onClick={this.handleAddToWishlist}>Wishlist</button>
                </Card>



            </div>
        )

    }


}

export default UsersProductCardComponent