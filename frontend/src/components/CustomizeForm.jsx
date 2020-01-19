import React from 'react'
import { Form } from 'react-bootstrap';

export default function CustomizeForm() {
    
    const handle1 = (event) => {
        localStorage.setItem('compressionType', event.target.value);
    }

    const handle2 = (event) => {
        localStorage.setItem('fileFormat', event.target.value);
    }

    return (
        <Form>
            <Form.Group controlId="compressionType">
                <Form.Label>Siła kompresji</Form.Label>
                <Form.Control as="select" onChange={handle1}>
                    <option>słaba</option>
                    <option>średnia</option>
                    <option>mocna</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="fileFormat">
                <Form.Label>Format pliku</Form.Label>
                <Form.Control as="select" onChange={handle2}>
                    <option>zip</option>
                    <option>tar.gz</option>
                    <option>7z</option>
                    <option>rar</option>
                </Form.Control>
            </Form.Group>
        </Form>
    )
}
