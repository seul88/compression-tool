import React from 'react'
import { Table, Col } from 'react-bootstrap';

export default function ResultTable() {
    return (
        <Col md={12}>
            <div className="mt-5">
                <h4>Wyniki pomiarów</h4>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Metoda kompresji</th>
                        <th>Czas kompresji [ms]</th>
                        <th>Rozmiar pliku wejściowego [B]</th>
                        <th>Rozmiar pliku wyjściowego [B]</th>
                        <th>Stopień kompresji [%]</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>A</td>
                        <td>100</td>
                        <td>100</td>
                        <td>80</td>
                        <td>80</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>B</td>
                        <td>150</td>
                        <td>200</td>
                        <td>140</td>
                        <td>70</td>
                    </tr>
                </tbody>
            </Table>
        </Col>
    )
}
