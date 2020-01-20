import React, {useEffect} from 'react'
import { Row, Container } from 'react-bootstrap';
import  InfoComponent  from './InfoComponent'
import  LoadFile  from './LoadFile'
import  AllMeasures  from './AllMeasures'

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
            <Row className="justify-content-center"> 
                <AllMeasures />
            </Row>
        </Container>
    )
}
