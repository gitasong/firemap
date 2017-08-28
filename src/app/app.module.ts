import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD3-uLsBok9DwY4Y_jEZFVShjrFAh5lcHc'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
