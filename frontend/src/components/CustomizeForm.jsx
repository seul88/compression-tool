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
                    <option>mocna</option>
                    <option>średnia</option>
                    <option>słaba</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="fileFormat">
                <Form.Label>Format pliku</Form.Label>
                <Form.Control as="select" onChange={handle2}>
                    <option>Dowolny</option>
                    <option>Zip (.zip)</option>
                    <option>Gzip (.gz)</option>
                    <option>7z (.7z)</option>
                    <option>Xz (.xz)</option>
                </Form.Control>
            </Form.Group>
        </Form>
    )
}
