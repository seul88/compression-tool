import React, {useMemo, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { Row, Col, Button } from 'react-bootstrap';
import  CustomizeForm  from './CustomizeForm'
import  ResultTable  from './ResultTable'
import  Chart  from './Chart'
import axios from 'axios';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '100px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


export default function LoadFile(props) {

const [displayResults, setDisplayResults] = useState(false);
const [values, setValues] = useState();
const [chartData, setChartData] = useState(); 

const buttonClickHandler = (file) => {
  console.log(file)
  console.log(localStorage.getItem('compressionType'));
  console.log(localStorage.getItem('fileFormat'));
  
  // axios - async call with params: <file, compressionType, fileFormat>
  axios.get('https://swapi.co/api/people/1/')
  .then(response => {
      console.log(response.data)
      /*
        > get data for charts and table
        > save it to state with: setDisplayResults() and setValues()
      */

      // data mockups: 
      const tableData = 
        [
          {
            "metodaKompresji" : "A",
            "czasKompresji" : 10,
            "rozmiarPlikuWejsciowego" : 10,
            "rozmiarPlikuWyjsciowego" : 10,
            "stopienKompresji" : 10
          },
          {
            "metodaKompresji" : "B",
            "czasKompresji" : 10,
            "rozmiarPlikuWejsciowego" : 10,
            "rozmiarPlikuWyjsciowego" : 10,
            "stopienKompresji" : 10
          },
          {
            "metodaKompresji" : "C",
            "czasKompresji" : 10,
            "rozmiarPlikuWejsciowego" : 10,
            "rozmiarPlikuWyjsciowego" : 10,
            "stopienKompresji" : 10
          } 
        ];
      
      const chartData = [
        {
          "metodaKompresji" : "A",
          "czasKompresji" : 10,
          "rozmiarPlikuWejsciowego" : 10,
          "rozmiarPlikuWyjsciowego" : 10,
          "stopienKompresji" : 10
        },
        {
          "metodaKompresji" : "B",
          "czasKompresji" : 20,
          "rozmiarPlikuWejsciowego" : 20,
          "rozmiarPlikuWyjsciowego" : 20,
          "stopienKompresji" : 20
        },
        {
          "metodaKompresji" : "C",
          "czasKompresji" : 30,
          "rozmiarPlikuWejsciowego" : 30,
          "rozmiarPlikuWyjsciowego" : 30,
          "stopienKompresji" : 30
        },
        {
          "metodaKompresji" : "D",
          "czasKompresji" : 40,
          "rozmiarPlikuWejsciowego" : 40,
          "rozmiarPlikuWyjsciowego" : 40,
          "stopienKompresji" : 40
        },
        {
          "metodaKompresji" : "E",
          "czasKompresji" : 50,
          "rozmiarPlikuWejsciowego" : 50,
          "rozmiarPlikuWyjsciowego" : 50,
          "stopienKompresji" : 50
        }
      ]

      

      setDisplayResults(true)
      setValues(tableData)
      setChartData(chartData)
  })
}

useEffect(() => {
  //console.log(values)
}, [values])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles
      } = useDropzone();
    
      const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept,
      ]);
    
      console.log(acceptedFiles)

        const files = acceptedFiles.map(file => (
            <li key={file.path}>
              {file.path} - {file.size} bytes
            </li>
        ));

      return (
        <>
          <Col md={8}>
              <div className="container">
                  <div {...getRootProps({style})}>
                  <input {...getInputProps()} />
                  <p>Umieść tutaj plik przeznaczony do kompresji!</p>
                  {files}
                </div>
              </div>
          </Col>
          <Col md={4}>
            <CustomizeForm />
            <Button variant="primary" type="submit"  onClick={buttonClickHandler}>
                Analizuj plik
            </Button>
          </Col>
          {displayResults &&
          <div>
            <Row className="justify-content-center mt-2">
                  <ResultTable values={values}/>
              </Row>
              <Row className="justify-content-center">
                  <Chart chartData={chartData} /> 
            </Row>
          </div>
          }
        </>
      );
    }
