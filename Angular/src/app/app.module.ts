import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiagramComponent } from './diagram/diagram.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GeneratComponent } from './generat/generat.component';
import { TimediagramComponent } from './timediagram/timediagram.component';


const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    WelcomeComponent,
    GeneratComponent,
    TimediagramComponent,
  ],
  imports: [
    SocketIoModule.forRoot(config),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
