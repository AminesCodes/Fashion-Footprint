import React, { PureComponent } from 'react';
import axios from 'axios';
import Feedback from '../Feedback';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel';


class Materials extends PureComponent {
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
                <Carousel.Item style={{ textAlign: "center", overflow: 'auto'}} >
                    <img
                        // className="d-block mx-auto"
                        className="d-block w-100"
                        src={el.pic}
                        alt="First slide"
                        style={{ height: "90vh", width: "80vw", objectFit: 'cover'}}
                    />
                    <Carousel.Caption>
                        <div className='' style={{ backgroundColor: "#DCDCDC", opacity: "0.8", borderRadius: "25px", height: '80%'}}>
                            <div className='overflow-auto'>
                                <h3 style={{ color: "black" }}>{el.name}</h3>
                                <p className='text-dark font-weight-bold'>How to care: </p>
                                <p className='text-dark'>{el.care}</p>
                                <p className='text-dark font-weight-bold'>How it affects the environment:</p>
                                <p className='text-dark'>{el.environmental_impact}</p>
                            </div>
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
