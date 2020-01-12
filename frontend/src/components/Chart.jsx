import React from 'react';
import { Bar } from 'react-chartjs-2';


export default function Chart(){

    const data = {
        labels: ['Pomiar 1', 'Pomiar 2', 'Pomiar 3', 'Pomiar 4', 'Pomiar 5', 'Pomiar 6', 'Pomiar 7'],
        datasets: [
          {
            label: 'Wyniki pomiarów',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [10, 20, 30, 40, 50, 60, 70]
          }
        ]
      };

        return (
          <div>
            <h4>Measures bar</h4>
            <Bar
              data={data}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
        );
}
