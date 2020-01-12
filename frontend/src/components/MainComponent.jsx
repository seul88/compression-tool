import React from 'react'
import { Row, Container } from 'react-bootstrap';
import  Chart  from './Chart'
import  InfoComponent  from './InfoComponent'
import  LoadFile  from './LoadFile'
import  Table  from './Table'

export default function MainComponent() {
    return (
        <Container>
            <Row className="justify-content-center">
                <InfoComponent />
            </Row>
            <Row className="justify-content-center">
                <LoadFile />
            </Row>
            <Row className="justify-content-center">
                <Table />
            </Row>
            <Row className="justify-content-center">
                <Chart /> 
            </Row>
        </Container>
    )
}
