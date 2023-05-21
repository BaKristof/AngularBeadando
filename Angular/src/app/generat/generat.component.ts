import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generat',
  templateUrl: './generat.component.html',
  styleUrls: ['./generat.component.css']
})
export class GeneratComponent {
  genname: string ="";
  gennames: string[]=[]; 
  maxnumber: number= 100;
  minnumber: number =0;
  conure: number = 0;
  aktivak: string[]=["valami","valami2","valami3"];
  hibak:{ name: string, ertek: number, time: string}[]=[];
  
  valami: any;

  generatornames: number[] = [];
  selectedgenerator!: number;

  constructor(private http:HttpClient,private router: Router){}

  valami3(){
  clearInterval(this.selectedgenerator);

  this.sendDataToServer(this.gennames[this.generatornames.indexOf(parseInt(this.selectedgenerator.toString()))],10,3);
  
  this.gennames.splice(this.generatornames.indexOf(parseInt(this.selectedgenerator.toString())),1)

  this.generatornames.splice(this.generatornames.indexOf(parseInt(this.selectedgenerator.toString())),1);
}

  valami2(){
    const value: string = this.genname.toString();
    this.genname= '';
    this.gennames.push(value);

    this.activelog(value,0);

    const id = window.setInterval(() => {
      console.log(id);
      console.log(value)
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
    const url = 'http://localhost:4444/generat';
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
      const url ='http://localhost:4444/hibak';
      this.http.get(url)
      .subscribe(
        response => {
          console.log('Response:', response);
          for (const item of response as any){
            const foo = {name: item.Komponens, ertek: item.Adat, time: item.Időpillanat};
            this.hibak.push(foo);
          }
        },
        error => {
          console.error('Error:', error);
        }
      );
    }

    getdata2 (){
      const url ='http://localhost:4444/active';
      this.aktivak=[];
      this.http.get(url)
      .subscribe(
        response => {
          console.log('Response:', response);
          for (const item of response as any){
            this.aktivak.push(item.Komp);
          }
        },
        error => {
          console.error('Error:', error);
        }
      );
    }

    activelog(names:string,bools:number){
      const url ='http://localhost:4444/active';
      const data = {
        name: names,
        bool :bools
      };

      this.http.post(url,data)
      .subscribe(
        response => {
          console.log('Response:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
    }

    ngOnDestroy(){

      for (const i of this.gennames){
        this.activelog(i,1);
      }
      for (const item of this.generatornames){
        clearInterval(item);
      }
  
    }

    gotomediagram(){
  
      this.router.navigateByUrl('/diagram');
      }
      
      gototime(){
        
        this.router.navigateByUrl('/time');
        }




}
