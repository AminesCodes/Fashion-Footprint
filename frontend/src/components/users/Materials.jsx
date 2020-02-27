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
                    {/* <Carousel>
                        <Carousel.Item>
                            <Card className="d-block w-100" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://memoryfoammattress.org/wp-content/uploads/2017/04/Cotton-An-Ancient-and-Modern-Fiber-1024x576.jpg" />
                                <Card.Body>
                                    <Card.Title>
                                        Cotton
                                    </Card.Title>
                                    <Card.Text >
                                        This is some information about cotton blah blah blah
                        </Card.Text>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>

                        <Carousel.Item>
                            <Card className="d-block w-100" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://cf.ltkcdn.net/fashion-history/images/std/212077-675x450-Polyester-fabric.jpg" />
                                <Card.Body>
                                    <Card.Title>Polyester</Card.Title>
                                    <Card.Text>
                                        This is some information about Polyester blah blah blah
                        </Card.Text>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>

                        <Carousel.Item>
                            <Card className="d-block w-100" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://sc02.alicdn.com/kf/HTB1C.p.mb_I8KJjy1Xaq6zsxpXas/pure-silk-fabric-100-natural-silk-satin.jpg_350x350.jpg" />
                                <Card.Body>
                                    <Card.Title>Silk</Card.Title>
                                    <Card.Text>
                                        This is some information about Silk blah blah blah
                        </Card.Text>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                    </Carousel> */}
                </div>
            )
        }
    }
}

export default Materials;