import React from 'react'
import {
    Row,
    Col,
    Container
} from 'reactstrap';

export default function CustomFooter() {
    return (
        <footer className='customFooter'>


            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#0099ff" fill-opacity="1" d="M0,288L48,288C96,288,192,288,288,256C384,224,480,160,576,122.7C672,85,768,75,864
                ,96C960,117,1056,171,1152,176C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,
                960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
            </svg>
            <div className="footerFiller d-flex justify-content-center align-items-center">
                <Container>
                    <Row>
                        <Col>
                            <div className='d-flex align-items-center justify-content-center socialBox'>
                                <i className="fab fa-linkedin-in fa-5x"></i>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-flex align-items-center justify-content-center socialBox'>
                                <i class="fab fa-github fa-5x"></i>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    )
}
