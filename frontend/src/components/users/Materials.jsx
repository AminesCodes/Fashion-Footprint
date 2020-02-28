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
            // console.log(payload)
            let newPayload = payload.splice(0, payload.length - 1)
            console.log(newPayload)
            this.setState({
                materials: newPayload
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
        const { materials } = this.state
        console.log(this.state)
        let mappedMaterials = materials.map(el => {
            return (
                <Carousel.Item style={{ textAlign: "center" }} >
                    <img
                        className="d-block w-100"
                        // width="800px"
                        src={el.pic}
                        alt="First slide"
                        height="800px"
                    />
                    <Carousel.Caption>
                    <div class="jumbotron" style={{backgroundColor:"#DCDCDC", opacity: "0.9", borderRadius: "25px", textAlign:"center"}}>
                    <h3 style={{color:"black"}}>{el.name}</h3>
                    <p style={{margin: "5%", fontWeight:"bold", color:"black"}}>How to care: </p>
                    <p style={{margin: "5%", fontWeight:"bold", color:"black"}}>{el.care}</p>
                    <p style={{margin: "5%", fontWeight:"bold", color:"black"}}>How it affects the environment:</p>
                    <p style={{margin: "5%", fontWeight:"bold", color:"black"}}>{el.environmental_impact}</p>
                    </div>
                </Carousel.Caption>
                </Carousel.Item>
            )
        })

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