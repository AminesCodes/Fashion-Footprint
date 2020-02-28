import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function About(props) {

    return (
        <div className='container mt-5'>
            <Jumbotron fluid>
                <Container>
                    <h1>About Us</h1>
                    <p>
                        The problem of unsold clothes is vividly illustrated by recent H&M news. At the beginning of the year, the fashion giant reported sitting on a huge pile of unsold clothes — $4.3 billion worth of inventory. The company produces so many clothes that a power plant in a Swedish town Vasteras partly relies on burning its defective products to create energy. It incinerated 15 tons in 2017, though H&M claims those were clothes not safe to use. Meanwhile, luxury brand Burberry admitted burning products worth $37 million instead of selling it at a lower cost. This caused a scandal and the company had to change their policy.
                        Fashion is said to be the second dirtiest industry in the world. It is henpecked by energy-intensive processes, high water consumption and use of non-renewable resources. Thus, overproduction has a huge impact on the environment. Moreover, the more we produce, the more waste is accumulated. Here are some important facts:
    <br></br>
                        <br></br>
                        Fashion Footprint was created to reduce the error in future trend predictions, by allowing customers to choose the trends and styles they want to see in stores for future seasons. This reduces over production by removing the need for brands to create an excess amount of styles that customers aren’t interested in purchasing. Our goal is to educate consumers on the effects of textile materials on the environment; as well as to educate consumers on how to extend the life of products they already own. Fashion footprint aspires to reduce as much waste as possible and to make consumers aware of the fact that they drive the fashion industry, thus having a large responsibility in how the fashion industry affects our environment
                    </p>
                </Container>
            </Jumbotron>
            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <Image src="holder.js/171x180" rounded />
                    </Col>
                    <Col xs={6} md={4}>
                        <Image src="holder.js/171x180" roundedCircle />
                    </Col>
                    <Col xs={6} md={4}>
                        <Image src="holder.js/171x180" thumbnail />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}