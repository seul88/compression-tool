import React, {useMemo, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { Row, Col, Button } from 'react-bootstrap';
import  CustomizeForm  from './CustomizeForm'
import  ResultTable  from './ResultTable'
import  Chart  from './Chart'

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

const buttonClickHandler = (file, setDisplayResults, setValues) => {
  console.log(file)
  console.log(localStorage.getItem('compressionType'));
  console.log(localStorage.getItem('fileFormat'));

  // axios - async call ... 



  setDisplayResults(true)
  setValues(1234)
}


export default function LoadFile(props) {

const [displayResults, setDisplayResults] = useState(false);
const [values, setValues] = useState();

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
            <Button variant="primary" type="submit"  onClick={() => {buttonClickHandler(acceptedFiles, setDisplayResults, setValues); }}>
                Analizuj plik
            </Button>
          </Col>
          {displayResults &&
          <div>
            <Row className="justify-content-center mt-2">
                  <ResultTable values={values}/>
              </Row>
              <Row className="justify-content-center">
                  <Chart values={values} /> 
            </Row>
          </div>
          }
        </>
      );
    }
