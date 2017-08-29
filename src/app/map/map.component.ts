import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 43.8136;
  lng: number = -120.6027;
  type: string = 'terrain';
  zoom: number = 7;


  constructor() { }

  ngOnInit() {
  }

}
