import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function About(props) {

    return (
        <div className='container mt-5'>
            <Jumbotron style={{borderRadius: "10px", borderStyle: "solid", borderWidth: "medium", borderColor: "#7BA098", boxShadow: "6px 11px 17px 2px rgba(0,0,0,0.47)", backgroundColor: "#F0E8DD"}} fluid >
                <Container style={{textAlign: "center"}}>
                    <h1>About Us</h1>
                    <p>
                        The problem of unsold clothes is vividly illustrated by recent H&M news. At the beginning of the year, the fashion giant reported sitting on a huge pile of unsold clothes — $4.3 billion worth of inventory. The company produces so many clothes that a power plant in a Swedish town Vasteras partly relies on burning its defective products to create energy. It incinerated 15 tons in 2017, though H&M claims those were clothes not safe to use. Meanwhile, luxury brand Burberry admitted burning products worth $37 million instead of selling it at a lower cost. This caused a scandal and the company had to change their policy.
                        Fashion is said to be the second dirtiest industry in the world. It is henpecked by energy-intensive processes, high water consumption and use of non-renewable resources. Thus, overproduction has a huge impact on the environment. Moreover, the more we produce, the more waste is accumulated.
                        <br></br>
                        <br></br>
                        Fashion Footprint was created to reduce the error in future trend predictions, by allowing customers to choose the trends and styles they want to see in stores for future seasons. This reduces over production by removing the need for brands to create an excess amount of styles that customers aren’t interested in purchasing. Our goal is to educate consumers on the effects of textile materials on the environment; as well as to educate consumers on how to extend the life of products they already own. Fashion footprint aspires to reduce as much waste as possible and to make consumers aware of the fact that they drive the fashion industry, thus having a large responsibility in how the fashion industry affects our environment
                    </p>
                </Container>
            </Jumbotron>
            <Jumbotron style={{borderRadius: "10px", borderStyle: "solid", borderWidth: "medium", borderColor: "#7BA098", boxShadow: "6px 11px 17px 2px rgba(0,0,0,0.47)",  backgroundColor: "#F0E8DD"}} fluid>
                <Container style={{textAlign: "center"}}>
                    <h1>Meet the Team!</h1>
                    <Row>

                        <Col xs={5} md={7}>
                            <Image src="https://images.squarespace-cdn.com/content/v1/5b50ebb7e749401857e16f2f/1560530145270-P86FODAN0DEP75WV44TT/ke17ZwdGBToddI8pDm48kCMOzc4GiK3dsNqiUCo6wrh7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmLLxGPZs9cXJqW7PQ94qJw_PXe0-aBO9Nk8dpGJ5ZKQqQP0CxanRMUAlhQx1QfmRy/Amine+Bensalem+-+Amine+Bensalem.JPG" width="150px" height="150px" roundedCircle />
                        </Col>


                        <Col xs={6} md={4}>
                            <Image src="https://images.squarespace-cdn.com/content/v1/5b50ebb7e749401857e16f2f/1560530285740-A2DHNKBEKMZ7IB8POAYL/ke17ZwdGBToddI8pDm48kGalivP0gwHmntCMYYZVzBh7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0plef_PmwB6-3GP4qDbCUv92Du-NGmLJS6rLFW6lohgQsEYPYfZxA8yfoVIIuDP8kQ/brianytaveras+-+Briany+Taveras.jpg" width="160px" height="150px"  roundedCircle />
                        </Col>
                    </Row>

                    <Row>
                    <Col xs={5} md={7}>
                        <div>
                            <h4>Amin</h4>
                            <p>Technical Lead</p>
                        </div>
                    </Col>

                    <Col xs={6} md={4}>
                        <div>
                            <h4>Briany</h4>
                            <p>Project Manager</p>
                        </div>
                    </Col>
                    </Row>

                    <Row>
                        <Col xs={5} md={7}>
                            <Image src="https://images.squarespace-cdn.com/content/v1/5b50ebb7e749401857e16f2f/1560530942056-VZY5K6CYC315H3CU9S0X/ke17ZwdGBToddI8pDm48kErutB0DQfKy7xVMt5yUScx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UWADxDi8vTpikZlym2K_V5YHZw9wSaZy_GIvFii2Jx41rGX9FoDs3WeWy9fjPO04vA/Chuck_OkonkwoAguolu+-+Chuck+aguolu.jpg" width="150px" height="150px" roundedCircle />
                        </Col>


                        <Col xs={6} md={4}>
                            <Image src="https://images.squarespace-cdn.com/content/v1/5b50ebb7e749401857e16f2f/1560532619099-B2IJX5S7UAC9OXRPOBJJ/ke17ZwdGBToddI8pDm48kHFnmntegnVXpN4y4ldn3ixZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxco7Gi2cI2YfBk8ZWdc_m6Xcr86dXh8TsiE3NyioNRZj9sD37Ved1vsRvl2h0UxBw/21106008_10155719062433750_5374603742919262310_n+-+Suzette+Islam.jpg" width="150px" height="160px" roundedCircle />
                        </Col>


                    </Row>

                    <Row>
                      <Col xs={5} md={7}>
                        <div>
                            <h4>Chuck</h4>
                            <p>PR Reviewer</p>
                        </div>
                        </Col>

                        <Col xs={6} md={4}>
                        <div>
                            <h4>Suzette</h4>
                            <p>UI/UX Designer</p>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </div>
    )
}