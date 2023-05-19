import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-timediagram',
  templateUrl: './timediagram.component.html',
  styleUrls: ['./timediagram.component.css']
})
export class TimediagramComponent implements OnInit {
  chart!: Chart;
  label: string[]= [];
  data: number[]= [];
  time: string[]= [];
  constructor(private http: HttpClient) {}

ngOnInit(){
 this.makechart();
this.sendDataToServer();
}



makechart(){
  const canvas = document.getElementById('myChart2') as HTMLCanvasElement; 
  if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {

   this.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
        datasets: [{
        label: '',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
}
  
}
removeALLData() {
  const a = this.chart.data.labels?.length??0;
  for (let i = 0; i < a; i++) {
   this.chart.data.labels?.pop();
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    this.chart.update();
  }
}


addData(chart: Chart, data:number,time:string) {
  chart.data.labels?.push(time);
  chart.data.datasets[0].data.push(data);
  chart.update();
}



sendDataToServer() {
    const url = 'http://localhost:4444/timediagram'; // Replace with your Node.js server URL
    const data = {
      korabban:"2023-05-01 00:00:00",
      kesobb: "2023-05-15 00:00:00"
    };
    
    this.http.post<any[]>(url, data)
      .subscribe(
        response => {
          console.log('Response:', response);
          this.removeALLData();
          this.chart.data.datasets[0].label = response[0].Komponens;

          for(const item of response)
          {
            console.log(item.Komponens);
            console.log(item.Adat);
            console.log(item.Felvet); 
            this.addData(this.chart,item.Adat,item.Felvet);
            this.label.push(item.Komponens);
            this.data.push(item.Adat);
            this.time.push(item.Felvet);
          }

        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
