import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import  Chart  from './Chart'
import  InfoComponent  from './InfoComponent'
import  LoadFile  from './LoadFile'
import  ResultTable  from './ResultTable'
import  CustomizeForm  from './CustomizeForm'

export default function MainComponent() {
    return (
        <Container>
            <Row className="justify-content-left">
                <InfoComponent />
            </Row>
            <Row className="justify-content-center">
                <Col md={8}>
                    <LoadFile />
                </Col>
                <Col md={4}>
                    <CustomizeForm />
                </Col>
            </Row>
            <Row className="justify-content-center mt-2">
                <ResultTable />
            </Row>
            <Row className="justify-content-center">
                <Chart /> 
            </Row>
        </Container>
    )
}
