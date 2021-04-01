import React from 'react'
import {
    Container,
    Row,
    Col
} from 'reactstrap';

export default function ContactMe() {
    return (
        <div>
            <div className="contentWrap">
                <Container>
                    <Row className="align-items-center pb-3">
                        <Col>
                            <h1 className="pt-3">Contact Me</h1>
                            <hr style={{ width: "80%" }}></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3 className="my-3"><a href="mailto:brendonstahl97@gmail.com" rel='noreferrer' target="_blank">brendonstahl97@gmail.com</a></h3>
                            <h3 className="my-3">(828)962-1701</h3>
                            <h4 className="my-3"><a href='https://www.linkedin.com/in/brendon-stahl-9a518a176/' rel='noreferrer' target="_blank">LinkedIn</a></h4>
                            <h4 className="my-3"><a href='https://github.com/brendonstahl97' rel='noreferrer' target="_blank">Github</a></h4>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
