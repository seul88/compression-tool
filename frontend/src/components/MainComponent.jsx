import React, {useEffect} from 'react'
import { Row, Container } from 'react-bootstrap';
import  Chart  from './Chart'
import  InfoComponent  from './InfoComponent'
import  LoadFile  from './LoadFile'
import  ResultTable  from './ResultTable'

export default function MainComponent() {

    useEffect(() => {
        localStorage.setItem('compressionType', "słaba");
        localStorage.setItem('fileFormat', "zip");
      }, []);

    return (
        <Container>
            <Row className="justify-content-left">
                <InfoComponent />
            </Row>
            <Row className="justify-content-center">
                <LoadFile />
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
