import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { GeneratComponent } from './generat/generat.component';
import { DiagramComponent } from './diagram/diagram.component';
import { TimediagramComponent } from './timediagram/timediagram.component';
const routes: Routes = [

  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'generat',
    component: GeneratComponent,
  },
  {
    path: 'diagram',
    component: DiagramComponent,
  },
  {
    path: 'time',
    component: TimediagramComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
