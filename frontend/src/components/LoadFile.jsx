import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import { Col, Button } from 'react-bootstrap';
import  CustomizeForm  from './CustomizeForm'

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

const buttonClickHandler = (file) => {
  console.log(file)
  console.log(localStorage.getItem('compressionType'));
  console.log(localStorage.getItem('fileFormat'));
}


export default function LoadFile(props) {

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
            <Button variant="primary" type="submit"  onClick={() => buttonClickHandler(acceptedFiles)}>
                Analizuj plik
            </Button>
          </Col>
        </>
      );
    }
