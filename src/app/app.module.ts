import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { routing } from './app.routing';

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
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
