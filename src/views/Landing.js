import React from 'react';
import {
    Container,
    Row,
    Col
} from 'reactstrap';

//images 
import UNCW from '../Assets/img/UNCW.png';
import Headshot from '../Assets/img/Headshot.jpg';
import Resume from '../Assets/Resume.pdf';

export default function Landing() {
    return (
        <div>
            <div className="contentWrap">
                <Container>
                    <Row className="align-items-center pb-3">
                        <Col>
                            <h1 className="pt-3">About Me</h1>
                            <hr style={{ width: "80%" }}></hr>
                        </Col>
                    </Row>
                    <Row className="align-items-center pb-3">
                        <Col >
                            <img style={{ marginRight: "auto", marginLeft: "auto" }} className="d-sm-none mb-3" src={Headshot} alt='Headshot' width="200" height="200" />
                            <img style={{ marginRight: "auto", marginLeft: "auto" }} className="d-none d-sm-block mb-3" src={Headshot} alt='Headshot' width="250" height="250" />
                        </Col>
                        <Col>
                            <h1>Brendon Stahl</h1>
                            <h3>Full Stack Web Developer</h3>
                            <h3>Game Enthusiast</h3>
                            <h3>Adventurer</h3>
                        </Col>
                    </Row>
                    <Row className="align-items-center pb-3">
                        <Col>
                            <p className="mt-5 mb-5">
                                I am a recent graduate of the UNC Chapel Hill full stack boot camp program eager to use my newly aquired skills to break into the field.
                                Through this program, I became very familliar with the MERN stack and the agile development methodology. I have become very passionate about every step of the development process
                                and enjoy the endless learning possibilities that come with the title of web developer.
                        </p>
                        </Col>
                    </Row>
                    <Row className="align-items-center pb-5">
                        <Col>
                            <p className="mt-5 mb-5">
                                I have a bachelor's degree in psychology with a minor in statistics from the University of North Carolina Wilmington.
                                The perspective-taking skills I developed from my background in psychology align well with the user-focused principles of the agile methodology, and have aided me in create engaging front-end design.
                                The analytical skills from my background in math and statistics have made it much easier for me to create functional and succinct back-ends.
                        </p>
                        </Col>
                        <Col>
                            <img style={{ marginRight: "auto", marginLeft: "auto" }} src={UNCW} alt='UNCW Logo' width="150" height="170" className="d-sm-none" />
                            <img style={{ marginRight: "auto", marginLeft: "auto" }} src={UNCW} alt='UNCW Logo' width="300" height="340" className="d-none d-sm-block" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1>My Resume</h1>
                            <hr style={{ width: "80%" }}></hr>
                            <a className="btn btn-success mb-5" href={Resume} rel="noreferrer" target="_blank">PDF</a>
                        </Col>
                    </Row>

                </Container>
            </div>
        </div>
    );
};
