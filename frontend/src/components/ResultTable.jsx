import React from 'react'
import { Table, Col } from 'react-bootstrap';

export default function ResultTable(props) {
console.log(props.values)

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
                    {props.values && 
                    props.values.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.metodaKompresji}</td>
                                <td>{item.czasKompresji}</td>
                                <td>{item.rozmiarPlikuWejsciowego}</td>
                                <td>{item.rozmiarPlikuWyjsciowego}</td>
                                <td>{item.stopienKompresji}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
        </Col>
    )
}
