import React, { Component } from 'react';
import axios from 'axios';
import Feedback from '../Feedback';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel';


class Materials extends Component {
    constructor() {
        super()
        this.state = {
            materials: [],
            networkErr: null
        }
    }

    componentDidMount = async () => {
        const url = `/api/materials/all`
        try {
            const { data: { payload } } = await axios.get(url);
            console.log(payload)
            this.setState({
                materials: payload
            })
        } catch (err) {
            this.setState({
                networkErr: err
            })
        }
    }


    hideFeedbackDiv = () => {
        this.setState({
            networkErr: null
        })
    }

    render() {
        const {materials} = this.state
        console.log(this.state)
        let mappedMaterials = materials.map(el => {return (
            <Carousel.Item>
            <Card className="d-block w-100" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={el.pic} />
                <Card.Body>
                    <Card.Title>
                        {el.name}
                    </Card.Title>
                    <Card.Text >
                        Care: {el.care}
                        Affects on Environment: {el.environmental_impact}
                  </Card.Text>
                </Card.Body>
            </Card>
        </Carousel.Item>
        )})

        if (this.state.networkErr) {
            return <Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv} />
        } else {
            return (
                <div>
                    <Carousel>
                        {mappedMaterials}
                    </Carousel>
                </div>
            )
        }
    }
}

export default Materials;