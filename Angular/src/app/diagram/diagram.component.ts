import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})



export class DiagramComponent implements OnInit { 
  constructor(private socket:Socket){}

  label! : string[] ;
  datas! : number[] ;
  chart!: Chart;

  ngOnInit(): void {
    this.socket.fromEvent<any>('message').subscribe((message) => {
      this.removeALLData();
    message.forEach((dataObj:any) => {
      const name = dataObj.Komponens+" "+dataObj.Felvet;
      const data = dataObj.Adat;
      this.label= [];
      this.datas = [];
      this.label.push(name);
      this.datas.push(data);
      console.log(this.label);
      console.log(this.datas);
      this.addData(this.chart, name, data);
    });    
    });
    const canvas = document.getElementById('myChart') as HTMLCanvasElement; 
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {

     this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['valami' ,'valami2'],
          datasets: [{
          label: '',
          data: [30, 10],
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


addData(chart: Chart, label: any, data:number) {
  chart.data.labels?.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}


}
