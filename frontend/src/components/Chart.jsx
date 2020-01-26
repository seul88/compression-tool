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
          yAxisID: 'A',
          label: "Czas kompresji [s]",
          backgroundColor: 'rgba(52,230,170,0.5)',
          borderColor: 'rgba(99,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(102, 255, 51, 0.5)',
          hoverBorderColor: 'rgba(102, 255, 51, 0.5)',
          data:  compressionTimes
        },
        {
          yAxisID: 'B',
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
              <h4>Zestawienie czasów kompresji i rozmiarów plików skompresowanych</h4>
              <Bar
                data={compareMethodsTimes}
                width={1000}
                height={500}
                options={{
                  responsive: false, 
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [{
                      id: 'A',
                      type: 'linear',
                      position: 'left',
                      ticks : {
                        min : 0
                      }
                    }, {
                      id: 'B',
                      type: 'linear',
                      position: 'right',
                      ticks : {
                        min : 0
                      }  
                    }]
                  }
                }}
              />
            </div>
        
          </div>
        </Col>
      );
}