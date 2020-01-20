import React, {useState} from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import  ResultTable  from './ResultTable'

export default function AllMeasures() {

    const [showTable, setShowTable] = useState(false);
    const [displayData, setDisplayData] = useState();

    const handleTableDisplay = () => {
        axios.get('http://localhost:8000/benchmark/all')
        .then(response => {
            var obj = JSON.parse(response.data)
            const tableData = []

                obj.forEach(item => {
                    tableData.push(
                        {
                          "metodaKompresji" : item.fields.metodaKompresji,
                          "czasKompresji" : item.fields.czasKompresji,
                          "rozmiarPlikuWejsciowego" : item.fields.rozmiarPlikuWejsciowego,
                          "rozmiarPlikuWyjsciowego" : item.fields.rozmiarPlikuWyjsciowego,
                          "stopienKompresji" : item.fields.stopienKompresji
                        }
                      )
                    })
                    setDisplayData(tableData)
                }
            )

        setShowTable(true)
    }

    return (
        <>
            {showTable &&
                <div className="mt-4">
                    <ResultTable values={displayData}/>
                </div>
            }
            {!showTable &&
                <div className="mt-4">
                    <Button onClick={handleTableDisplay}>Wyświetl tabelę z wszystkimi pomiarami</Button>
                </div>
            }
        </>
    )
}
