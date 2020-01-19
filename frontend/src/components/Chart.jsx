import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Col } from 'react-bootstrap';


export default function Chart(props){
  
let methods = [];
let compressionTimes = [];
let compressedSize = [];

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

        
          </div>
        </Col>
      );
}
