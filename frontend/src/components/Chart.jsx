import React, {useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Col } from 'react-bootstrap';


export default function Chart(props){
  console.log(props.chartData)
  
let methods = new Array();
let compressionTimes = new Array();
let compressedSize = new Array();
let compareMethodsTimesDatasets = new Array();
 // const [methods, setMethods] = useState(new Array());
 // const [compressionTimes, setCompressionTimes] = useState(new Array());
 // const [compressedSize, setCompressedSize] = useState(new Array());

if (props.chartData){
      props.chartData.forEach((item) => {
        methods.push(item.metodaKompresji)
        compressionTimes.push(item.czasKompresji)
        compressedSize.push(item.rozmiarPlikuWyjsciowego)
      })
  }

  const compareMethodsTimes = {
      labels: methods,
      datasets: [
        {
          label: "Czas kompresji [ms]",
          backgroundColor: 'rgba(52,230,170,0.5)',
          borderColor: 'rgba(99,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(69,0,132,0.5)',
          hoverBorderColor: 'rgba(69,0,132,1)',
          data:  compressionTimes
        }
      ]
    }

    const compareMethodsSizes = {
      labels: methods,
      datasets: [
        {
          label: "Rozmiar skompresowanego pliku [B]",
          backgroundColor: 'rgba(27,70,175,0.5)',
          borderColor: 'rgba(99,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(69,0,132,0.5)',
          hoverBorderColor: 'rgba(69,0,132,1)',
          data: compressedSize
        }
      ]
    }


    const sizes = {
        labels: ['Plik 1', 'Plik 2', 'Plik 3', 'Plik 4'],
        datasets: [
          {
            label: 'Rozmiar pliku wejściowego [B]',
            backgroundColor: 'rgba(92,99,132,0.5)',
            borderColor: 'rgba(99,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(69,0,132,0.5)',
            hoverBorderColor: 'rgba(69,0,132,1)',
            data: [40321, 20938, 10372, 33728]
          },
          {
          label: 'Rozmiar pliku skompresowanego [B]',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.5)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [30202, 16202, 8202, 27202]
          }
        ]
      };

      const times = {
        labels: ['Plik 1', 'Plik 2', 'Plik 3', 'Plik 4'],
        datasets: [
          {
            label: 'Czas kompresji pliku wejściowego [ms]',
            backgroundColor: 'rgba(92,99,132,0.5)',
            borderColor: 'rgba(99,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(69,0,132,0.5)',
            hoverBorderColor: 'rgba(69,0,132,1)',
            data: [625, 231, 189, 598]
          }
        ]
      };


      return (
        <Col md={12}> 
          <div className="mt-1">
            
            <div className="mt-2">
              <h4>Zestawienie czasów kompresji w zależności od metody</h4>
              <Bar
                data={compareMethodsTimes}
                width={1000}
                height={500}
                options={{
                  responsive: false, 
                  maintainAspectRatio: false
                }}
              />
            </div>

            <div className="mt-2">
              <h4>Zestawienie rozmiaru plików skompresowanych w zależności od metody</h4>
              <Bar
                data={compareMethodsSizes}
                width={1000}
                height={500}
                options={{
                  responsive: false, 
                  maintainAspectRatio: false
                }}
              />
            </div>

            


          <div className="mt-2">
              <h4>Zestawienie rozmiaru pliku przed kompresją i po kompresji</h4>
              <Bar
                data={sizes}
                width={1000}
                height={500}
                options={{
                  responsive: false, 
                  maintainAspectRatio: false
                }}
              />
            </div>

            <div className="mt-2">
              <h4>Zestawienie czasów kompresji pliku</h4>
              <Bar
                data={times}
                width={1000}
                height={500}
                options={{
                  responsive: false, 
                  maintainAspectRatio: false
                }}
              />
            </div>
          </div>
        </Col>
      );
}
