import React from 'react'
import { Form, Button } from 'react-bootstrap';

export default function CustomizeForm() {
    return (
        <Form>
                <Form.Group controlId="compressionType">
                    <Form.Label>Siła kompresji</Form.Label>
                    <Form.Control as="select">
                        <option>słaba</option>
                        <option>średnia</option>
                        <option>mocna</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="fileFormat">
                    <Form.Label>Format pliku</Form.Label>
                    <Form.Control as="select">
                        <option>zip</option>
                        <option>tar.gz</option>
                        <option>7z</option>
                        <option>rar</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Analizuj plik
                </Button>
        </Form>
    )
}
