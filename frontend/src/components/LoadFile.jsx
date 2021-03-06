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

const buttonClickHandler = () => {

  let bodyFormData = new FormData();
  bodyFormData.append('fileUpload', acceptedFiles[0]);
  
  axios({
      method: 'post',
      url: 'http://localhost:8000/benchmark/calculate/silaKompresji/' + localStorage.getItem('compressionType') + '/format/' + localStorage.getItem('fileFormat'),
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
    })
    .then(function (response) {
        console.log(response.data);
        var obj = JSON.parse(response.data)
        //console.log(obj[0].fields)
        
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

      setDisplayResults(true)
      setValues(tableData)
      setChartData(tableData)

    })
    .catch(function (response) {
        console.log(response);
    });


}

useEffect(() => {
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
    
        const files = acceptedFiles.map(file => (
            <li key={file.path}>
              {file.path} - {file.size} B
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
