import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'

class UsersProductCardComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            description: '',
            image: ''
        }
    }

    handleProductData = async() =>{
        let getProductsQuery = `/`
        let productData  = await axios.get(getProductsQuery)

    }

    render() {
        return (
            <div>
                <h1>users card comp</h1>
                <Card>
                    <Card.Img src = 'https://12ax7web.s3.amazonaws.com/accounts/1/products/1986199879943/Ramen-Panda-tahiti-blue-light-t-shirt-teeturtle-full-21-1000x1000.jpg'></Card.Img>
                    
                </Card>



            </div>
        )

    }


}

export default UsersProductCardComponent