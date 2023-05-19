import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generat',
  templateUrl: './generat.component.html',
  styleUrls: ['./generat.component.css']
})
export class GeneratComponent {
  genname!: string
  gennames: string[]=[]; 
  maxnumber: number= 100;
  minnumber: number =0;
  aktivak: string[]=[];
  hibak:{ name: string, ertek: number, time: string}[]=[];
  
  valami: any;

  generatornames: number[] = [1];
  selectedgenerator!: number;

  constructor(private http:HttpClient){}


  valami3(){
  clearInterval(this.selectedgenerator);
  this.sendDataToServer(this.gennames[this.generatornames.indexOf(this.selectedgenerator)],10,3);
  
  this.gennames.splice(this.generatornames.indexOf(this.selectedgenerator),1)

  this.generatornames.splice(this.generatornames.indexOf(this.selectedgenerator),1);
  }


  valami2(){
    const value = this.genname;
    this.genname= '';
    this.gennames.push(value);
    const id = window.setInterval(() => {
      const szam = Math.floor(Math.random() * (100 - 1 + 1)) + 1 ;
      if(szam <this.maxnumber &&szam>this.minnumber ){

       this.sendDataToServer(value,szam,1);
      }
      else{
        this.sendDataToServer(value,szam,0);
      }
      this.valami =szam
      
    }, 1000);

    const name : number = id;
    this.generatornames.push(name);
  }

  sendDataToServer(names:string,szam:number,bools:number) {
    const url = 'http://localhost:4444/generat'; // Replace with your Node.js server URL
    const data = {
      name: names,
      ertek: szam,
      bool :bools
    };
    
    this.http.post(url, data)
      .subscribe(
        response => {
          console.log('Response:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
    }

    getdata (){
      const url ='http://localhost:4444/generate';
      this.http.get(url)
      .subscribe(
        response => {
          console.log('Response:', response);
          for (const item of response as any){
            this.hibak.push(item.Komponens,item.Adat,item.Időpillanat);
          }
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
    getdata2 (){
      const url ='http://localhost:4444/generatef';
      this.http.get(url)
      .subscribe(
        response => {
          console.log('Response:', response);
          for (const item of response as string){
            this.aktivak.push(item);
          }
        },
        error => {
          console.error('Error:', error);
        }
      );



    }

    ngOnDestroy(){

      for (const i of this.gennames){
      this.sendDataToServer(i,10,3);
      }
      for (const item of this.generatornames){
        clearInterval(item);
      }
  
    }
}
